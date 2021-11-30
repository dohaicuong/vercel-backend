import Fastify from 'fastify'
export const server = Fastify()

import mercuriusUpload from 'mercurius-upload'
server.register(mercuriusUpload)

import mercurius from 'mercurius'
import { schema } from './schema'
import { context } from './context'
server.register(mercurius, {
  schema,
  graphiql: true,
  context,
})

import fastifyStatic from 'fastify-static'
import path from 'path'
import fs from 'fs'
// create media folder to upload if not existed
const mediaFolderPath = path.join(__dirname, '..', 'media')
if (!fs.existsSync(mediaFolderPath)) fs.mkdirSync(mediaFolderPath)

server.register(fastifyStatic, {
  root: mediaFolderPath,
  decorateReply: false,
  prefix: '/media',
  list: true,
})

import cors from 'fastify-cors'
server.register(cors)