import qs from 'query-string'
import { coinmarketcapConfig } from '../config/coinmarketcap'

interface Currency {
  id: number | string
  name: string
  symbol: string
  slug: string
  is_active: number
  rank: number
}

const apiRoute = (route: string, queryParams?: Record<string, any>) => {
  let str = `${coinmarketcapConfig.apiEndpoint}/${route}`
  if (queryParams) {
    str += '?' + qs.stringify(queryParams, { arrayFormat: 'comma' })
  }
  return str
}

export const getQuotesLatest = async (id: number | number[]): Promise<void> => {
  const response = await fetch(
    apiRoute('v1/cryptocurrency/quotes/latest', { id, convert: 'GBP' })
  )
  return await response.json()
}

export const getCMCMap = async (): Promise<Currency[]> => {
  const response = await fetch(
    apiRoute('v1/cryptocurrency/map', { sort: 'cmc_rank', limit: 100 })
  )
  const data = await response.json()
  return data.data
}
