import { getQuotesLatest } from '../../../services/coinmarketcap'
import { ApiHandler, returnApiNotFound } from '../../../utils/api'

interface CryptoResponse {
  currency: string
  value: number
}

const CryptoApi: ApiHandler<any> = async (req, res) => {
  if (req.method != 'GET') {
    return returnApiNotFound(res)
  }
  const ids = req.query.ids
  if (!ids || typeof ids !== 'string') {
    return returnApiNotFound(res)
  }

  const data = await getQuotesLatest(ids.split(',').map(Number))

  res.status(200).json(data)
}

export default CryptoApi
