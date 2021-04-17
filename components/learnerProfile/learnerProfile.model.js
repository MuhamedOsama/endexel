const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const learnerProfileSchema = new Schema({
  interests: {
    type: [String],
    require: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  seeker: {
    type: Schema.Types.ObjectId,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    ref: "seeker",
    unique: true,
    require: true
  }
}, { timestamps: true });

learnerProfileSchema.plugin(uniqueValidator, { message: `{PATH} is already linked with this profile.` });

const LearnerProfile = model("learnerProfile", learnerProfileSchema);

module.exports = LearnerProfile;
