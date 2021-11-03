import { extendType, objectType } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('body')
  }
})

export const PostsQuery = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (_, __, { prisma }) => {
        return prisma.post.findMany()
      }
    })
  }
})
