import { objectType } from 'nexus'

export const ModelPost = objectType({
  name: 'Post',
  definition: t => {
    t.implements('Node')
    t.nonNull.string('title')
    t.nonNull.string('body')
    t.media('logo')
  }
})
