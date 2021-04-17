const { Schema, model } = require('mongoose')

const ageRangeSchema = new Schema({
    nameAr: {
        type: String,
        required: true,
        trim: true
    },
    nameEn: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

const AgeRange = model('agerange', ageRangeSchema)

module.exports = AgeRange