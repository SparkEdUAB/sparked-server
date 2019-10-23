const UPLOAD_DIR = '/Users/olivierjm/sparked-server'
const { createWriteStream, unlink } = require('fs')

export const resourceResolver = {
  Query: {
    // get all files and other file related queries
    getFiles() {
      return 'files'
    },
  },
  Mutation: {
    // todo => properly stream the file to GridFS
    // todo =>  get user id and append it to the file object
    async singleUpload(root, { file }) {
      console.log(file)

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
      return _file
    },
  },
}
