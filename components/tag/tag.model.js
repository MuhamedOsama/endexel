const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const tagsSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
        unique: true
      }
    ]
   // descriptionEn: {
   //    type: String,
   //    required: true,
   //    validate: (v) => /([^\u0621-\u064A\u0660-\u0669]+[a-zA-Z0-9]*$)/i.test(v),
   //    trim: true,
   // },
   // descriptionAr: {
   //    type: String,
   //    required: true,
   //    validate: (v) => /([^a-z]+[\u0621-\u064A\u0660-\u0669]*$)/i.test(v),
   //    trim: true,
   // },
},{
   timestamps: true
});

const Tag = model('tag', tagsSchema);

module.exports = Tag;