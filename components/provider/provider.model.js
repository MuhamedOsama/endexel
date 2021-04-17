const { Schema, model } = require("mongoose");

const providerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  account: { type: Schema.Types.ObjectId, ref: 'account' },
  providerType: {
    type: String,
    require: true
  },
  universityProfile: {
    type: Schema.Types.ObjectId,
    ref: "universityProfile",
    unique: true,
  },
  governmentProfile: {
    type: Schema.Types.ObjectId,
    ref: "governmentProfile",
    unique: true,
  },
});

const Providers = model("provider", providerSchema);

module.exports = Providers;
