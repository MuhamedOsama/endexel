const { Schema, model, Mongoose } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const coursesSchema = new Schema(
  {
    courseLanguage: {
      type: String,
      require: true,
      enum: ["ar", "en"],
    },
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
    requirementsAr: {
      type: String,
      required: true,
      trim: true,
    },
    requirementsEn: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "internalProvider",
      require: true,
    },
    syllabus: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      require: false,
      ref: "cateogry",
    },
    targetAudience: {
      type: String,
      require: false,
    },
    targetAgeRange: {
      type: String,
      require: false,
    },
    providerUrl: {
      type: String,
      require: false,
    },
    referenceNumber: {
      type: String,
      unique: true
    },
    published: {
      type: Boolean,
      require: true,
      default: true,
    },
    tags: 
      {
        type: [String],
        unique: true
      }
    
  },
  { timestamps: true }
);

coursesSchema.plugin(uniqueValidator);
const Courses = model("course", coursesSchema);

module.exports = Courses;
