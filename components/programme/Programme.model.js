const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const programmeSchema = new Schema({
   nameAr: {
      type: String,
      required: true,
      trim: true,
   },
   nameEn: {
      type: String,
      required: true,
      trim: true,
   },
   descriptionEn: {
      type: String,
      required: true,
      trim: true,
   },
   descriptionAr: {
      type: String,
      required: true,
      trim: true,
   },
   courses: [
      {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'course',
      },
   ],
});
const Programme = model('programme', programmeSchema);

module.exports = Programme;
