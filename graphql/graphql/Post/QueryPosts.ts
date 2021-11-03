import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay'
import { extendType } from 'nexus'
import { Post } from 'nexus-prisma'

export const QueryPosts = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.connectionField('posts', {
      type: Post.$name,
      resolve: async (_, { after, first }, { prisma }) => {
        const offset = after ? cursorToOffset(after) + 1 : 0
        if(isNaN(offset)) throw new Error('cursor is invalid')

        const [totalCount, items] = await Promise.all([
          prisma.post.count(),
          prisma.post.findMany({
            take: first,
            skip: offset,
          })
        ])

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        )
      }
    })
  }
})
