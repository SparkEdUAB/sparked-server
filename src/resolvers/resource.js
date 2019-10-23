const UPLOAD_DIR = '/Users/olivierjm/sparked-server'
import { Resource } from '../models/resource'
const { createWriteStream, unlink } = require('fs')

export const resourceResolver = {
  Query: {
    // get all files and other file related queries
    getFiles() {
      return Resource.find({})
    },
  },
  Mutation: {
    // todo => properly stream the file to GridFS
    // todo =>  get user id and append it to the file object
    async singleUpload(root, { file }) {
      const { createReadStream, filename, mimetype, encoding } = await file
      // console.log(await filename)
      const stream = createReadStream()
      // const id = shortid.generate()
      const path = `${UPLOAD_DIR}/${34}-${filename}`
      const _file = { filename, mimetype, path }

      // Store the file in the filesystem.
      await new Promise((resolve, reject) => {
        stream
          .on('error', error => {
            unlink(path, () => {
              reject(error)
            })
          })
          .pipe(createWriteStream(path))
          .on('error', reject)
          .on('finish', resolve)
      })
      const resource = new Resource()
      resource.filename = filename
      resource.path = path
      resource.createdAt = new Date()
      // resource.createdBy = user._id

      return resource.save()
    },
  },
}
