import mongoose from 'mongoose'

const FeedbackSchema = mongoose.Schema({
  title: String,
  content: String,
  link: String,
  createdAt: Date,
  createdBy: String,
})

const Feedback = mongoose.model('Feedback', FeedbackSchema)
export default Feedback
