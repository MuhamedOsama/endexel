const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const governmentProfileSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
      // will look at the `onModel` property to find the right model.
      ref: "provider",
      unique: true,
      require: true,
    },
  },
  { timestamps: true }
);

governmentProfileSchema.plugin(uniqueValidator,{ message: `{PATH} is already linked with this profile.` });

const GovernmentProfile = model("governmentProfile", governmentProfileSchema);

module.exports = GovernmentProfile;
