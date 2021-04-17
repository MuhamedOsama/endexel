const mongoose = require("mongoose")

const Schema = mongoose.Schema

const categorySchema = new Schema({
    nameEn: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nameAr: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    icon: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    disabled: {
        type: Boolean,
        required: true,
        default: false
    }
}
,{
    timestamps: true
})

const Category = mongoose.model("Category",categorySchema)

module.exports= Category

