const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const seekerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  // profile: {type: Schema.Types.ObjectId, ref: 'profile',require: false, unique: true},
  account: { type: Schema.Types.ObjectId, ref: "account", unique: true },
  isApprovedMentor: {
    type: Boolean,
    require: true,
    default: false,
  },
  seekerType:{
    type: String,
    require: true
  },
  learnerProfile: {
    type: Schema.Types.ObjectId,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    ref: "learnerProfile",
    unique: true,
  },
  mentorProfile: {
    type: Schema.Types.ObjectId,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    ref: "mentorProfile",
    unique: true,
  },
});
seekerSchema.plugin(uniqueValidator, { message: `{PATH} is already linked with this account.` });
const Seeker = model("seeker", seekerSchema);

module.exports = Seeker;
