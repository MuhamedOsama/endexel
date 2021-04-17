const { Schema, model, Types } = require('mongoose')

const trackSchema = new Schema({
    nameAr: {
        type: String,
        required: true
    },
    nameEn: {
        type: String,
        required: true
    },
    briefDescriptionAr: {
        type: String,
        required: true
    },
    briefDescriptionEn: {
        type: String,
        required: true
    },
    detailedDescriptionAr: {
        type: String,
        required: true
    },
    detailedDescriptionEn: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    courses: [{
        courseOrder: {
            type: Number,
            required: true
        },
        course: {
            type: Types.ObjectId,
            required: true
        }
    }]
}, {
    timestamps: true
})

const Track = model('tracks', trackSchema)

module.exports = Track