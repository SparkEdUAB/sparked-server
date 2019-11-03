import mongoose from 'mongoose'

const notificationSchema = mongoose.Schema({
  userId: String,
  unitId: {
    type: String,
    optional: true,
  },
  topicId: {
    type: String,
    optional: true,
  },
  fileId: {
    type: String,
    optional: true,
  },
  title: String,
  category: String,
  createdAt: Date,
  read: Boolean,
})

const Notification = mongoose.model('Notification', notificationSchema)
export default Notification
