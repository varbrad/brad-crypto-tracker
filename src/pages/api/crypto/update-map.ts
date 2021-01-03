import { getCMCMap } from '../../../services/coinmarketcap'
import { firebaseAdmin } from '../../../services/firebase/server'
import { ApiHandler } from '../../../utils/api'

const UpdateMapApi: ApiHandler = async (req, res) => {
  // Get the map data
  const data = await getCMCMap()

  const col = firebaseAdmin.firestore().collection('currencies')

  data.forEach((data) => {
    col.doc(String(data.id)).set(data)
  })

  res.json(true)
}

export default UpdateMapApi
