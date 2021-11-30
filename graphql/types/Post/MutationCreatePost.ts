import { extendType, inputObjectType, nonNull, objectType } from 'nexus'
import { Post } from 'nexus-prisma'
import fs from 'fs'
import stream from 'stream'

export const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition: t => {
    t.nonNull.string('title')
    t.nonNull.string('body')
    t.upload('logo')
  }
})

export const PostCreatePayload = objectType({
  name: 'PostCreatePayload',
  definition: t => {
    t.nonNull.field('post', { type: Post.$name })
  }
})

export const PostCreateMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.nonNull.field('postCreate', {
      args: { input: nonNull('PostCreateInput') },
      type: nonNull('PostCreatePayload'),
      resolve: async (_, { input: { logo, ...input } }, { prisma, fileService }) => {
        const logoPath = logo ? await fileService.writeFile(logo) : undefined

        const newPost = await prisma.post.create({
          data: {
            ...input,
            logo: logoPath
          }
        })
        return { post: newPost }
      }
    })
  }
})
