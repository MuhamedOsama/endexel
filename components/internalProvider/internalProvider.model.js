const { model, Schema } = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const internalProviderSchema = new Schema(
  {
    nameEn: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 70,
      trim: true,
    },
    nameAr: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 70,
      trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descriptionAr: {
      required: true,
      type: String,
    },
    descriptionEn: {
      required: true,
      type: String,
    },
    logo: {
      type: String,
    },
    website: {
        type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
    published : {
      type: Boolean,
      require: true,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

internalProviderSchema.plugin(mongooseUniqueValidator)

const InternalProviders = model("internalProviders", internalProviderSchema);

module.exports = InternalProviders;
