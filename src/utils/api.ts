import { NextApiHandler, NextApiResponse } from 'next'

const API_NOT_FOUND = {
  status: 404,
  error: 'Not found',
} as const

export type ApiNotFound = typeof API_NOT_FOUND

export type ApiHandler<T = any> = NextApiHandler<T | ApiNotFound>

export const returnApiNotFound = (res: NextApiResponse<ApiNotFound>) => {
  return res.status(404).json(API_NOT_FOUND)
}
