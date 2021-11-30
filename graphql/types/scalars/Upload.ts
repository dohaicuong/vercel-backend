import { scalarType } from 'nexus'
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { join } from 'path'

export type FileUploadPromise = Promise<FileUpload>

export type Media = string

export const Upload = scalarType({
  name: GraphQLUpload.name,
  asNexusMethod: 'upload',
  description: GraphQLUpload.description,
  serialize: GraphQLUpload.serialize,
  parseValue: GraphQLUpload.parseValue,
  parseLiteral: GraphQLUpload.parseLiteral,
  sourceType: {
    module: join(__dirname, 'Upload.ts'), 
    export: 'FileUploadPromise'
  }
})

export const Media = scalarType({
  name: 'Media',
  asNexusMethod: 'media',
  sourceType: {
    module: join(__dirname, 'Upload.ts'),
    export: 'Media',
  },
  serialize: value => {
    return `${process.env.MEDIA_PATH}/${value}`
  }
})
