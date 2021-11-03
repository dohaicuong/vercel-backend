import { VercelRequest, VercelResponse } from '@vercel/node'
import { server } from '../graphql/server'

export default async (req: VercelRequest, res: VercelResponse) => {
  await server.ready()
  server.server.emit('request', req, res)
}
