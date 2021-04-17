const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const mentorProfileSchema = new Schema({
  fields: {
    type: [String],
    require: true,
  },
  seeker: {
    type: Schema.Types.ObjectId,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    ref: "seeker",
    unique: true,
    require: true
  }
},{timestamps:true});

mentorProfileSchema.plugin(uniqueValidator, { message: `{PATH} is already linked with this profile.` });

const MentorProfile = model("mentorProfile", mentorProfileSchema);

module.exports = MentorProfile;
