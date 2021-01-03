import { NextApiHandler } from 'next'

const HealthApi: NextApiHandler = (req, res) => {
  res.status(200).json({ ok: true, time: new Date().toISOString() })
}

export default HealthApi
