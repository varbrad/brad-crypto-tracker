import { getCMCMap } from '../../../services/coinmarketcap'
import { firebaseAdmin } from '../../../services/firebase/server'
import { ApiHandler } from '../../../utils/api'
import BigNumber from 'bignumber.js'

interface Holding {
  currency?: unknown | undefined
  quantity: BigNumber
}

const HoldingsApi: ApiHandler = async (req, res) => {
  const col = firebaseAdmin.firestore().collection('transactions')
  const docs = await col.get()

  const vs: Record<string, Holding> = {}

  docs.forEach((row) => {
    const data = row.data()
    if (!data || (data.action !== 'BUY' && data.action !== 'SELL')) return

    const buy = data.action === 'BUY'

    const cur =
      vs[data.currency] ||
      (vs[data.currency] = {
        quantity: new BigNumber(0),
      })

    cur.quantity = buy
      ? cur.quantity.plus(data.quantity)
      : cur.quantity.minus(data.quantity)
  })

  // Get all the keys and assign to the objects
  const currencyKeys = Object.keys(vs)
  const currencies = firebaseAdmin.firestore().collection('currencies')
  const promises = currencyKeys.map(async (key) => {
    const snapshot = await currencies.where('symbol', '==', key).limit(1).get()
    if (snapshot.empty) return
    const data = snapshot.docs[0].data()
    vs[key].currency = data
  })

  await Promise.all(promises)

  res.json(Object.values(vs))
}

export default HoldingsApi
