const { Schema, model } = require('mongoose')

const targetAudienceSchema = new Schema({
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

const TargetAudience = model('targetaudience', targetAudienceSchema)

module.exports = TargetAudience