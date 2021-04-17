const { Schema, model, Types } = require('mongoose');

const wishlistType = ['Private', 'Public', 'Sharable']

const wishlistResourseType = ['Video', 'Website', 'Course', 'Book', 'Document'] 

const wishlistSchema = new Schema({
    Learner: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    WishListType: {
        type: String,
        enum: wishlistType
    },
    metaHeadline: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    creationDate: {
        type: Number,
        required: true,
        default: Date.now()
    },
    WishListResourseType: {
        type: String,
        enum: wishlistResourseType,
    }
})

//

const Wishlist = model('wishlist', wishlistSchema)

module.exports = Wishlist