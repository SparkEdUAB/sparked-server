import { createWriteStream, unlink, readdir, unlinkSync } from 'fs'
import shortid from 'shortid'
import { Resource } from '../models/resource'
import Mongoose from 'mongoose'

const filePath = 'public/uploads/'
export const resourceResolver = {
  Query: {
    // get all files and other file related queries
    getFiles() {
      return Resource.find({})
    },
    getResourcesByTopicId(root, args, context) {
      return Resource.find({ topicId: args.topicId })
    },
  },
  Mutation: {
    // todo => properly stream the file to GridFS
    // todo =>  get user id and append it to the file object
    async multipleUpload(root, args, { user }) {
      await Promise.all(
        args.files.map(async file => {
          const { createReadStream, filename, mimetype, encoding } = await file
          const id = Mongoose.Types.ObjectId()
          const stream = createReadStream()
          // const _id = shortid.generate()
          const path = `${filePath}${id}-${filename}`
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
          resource._id = id
          resource.filename = filename
          resource.path = path
          resource.createdAt = new Date()
          resource.createdBy = user._id
          resource.topicId = args.topicId

          return resource.save()
        })
      )
    },
    deleteResources(root, { ids }, { user }) {
      if (!user) {
        throw new AuthenticationError(
          'you must be logged in to delete a course'
        )
      }
      ids.map(id => {
        Resource.findOne({ _id: id }).then(x => {
          unlinkSync(x.path)
        })
      })
      Resource.deleteMany({ _id: { $in: ids } })
        .then(() => {})
        .catch(err => console.log(err))
    },
  },
}
