const { Schema, model, Types } = require('mongoose');

const courseProviderReviewSchema = new Schema({
    rate: {
        type: Number,
        required: true
    },
    Learner: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
    },
    course: {
        type: Types.ObjectId,
        ref: 'course',
        required: true
    },
    provider: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    }
})
const CourseProviderReview = model('courseProviderReview', courseProviderReviewSchema)

module.exports = CourseProviderReview