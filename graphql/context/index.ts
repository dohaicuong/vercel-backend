import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '@prisma/client'
import * as fileService from './fileService'

export type Context = {
  prisma: PrismaClient
  fileService: typeof fileService
}

const prisma = new PrismaClient()
export const context = async (request: FastifyRequest, reply: FastifyReply): Promise<Context> => {
  return {
    prisma,
    fileService
  }
}