const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");
const { hash, compare, genSaltSync, genSalt } = require("bcryptjs");
const accountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uniqueCaseInsensitive: true,
      validate: {
        validator: (data) => {
          return validator.default.isEmail(data);
        },
        message: (props) => `${props.value} is not a valid mail id `,
      },
    },
    password: {
      type: String,
      required: function () {
        return !this.isThirdPartyAccount;
      },
      trim: true,
      minlength: 5,
    },
    salt: {
      type: String,
      require: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    linkedInId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    googleId: {
      type: String,
    },
    accessToken: {
      type: String,
      required: false,
    },
    isThirdPartyAccount: {
      type: Boolean,
      required: false,
      default: false,
    },
    token: {
      type: String,
    },
    passwordToken: {
      type: String,
    },
    accountType: {
      type: String,
      enum: ["seeker", "provider"],
      default: "seeker",
      required: true,
    },
    roles: {
      type: [String],
      required: true
    },
    salt: {
      type: String,
      required: true,
      default: '0'
    }
  },
  { timestamps: true }
);
accountSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const isValid = await compare(password, user.password);
  return isValid;
};

accountSchema.pre('save', async function (next) {
  var user = this;
  try {
    if (user.isModified('password')) {
      const salt = await genSalt(15)
      const password = await hash(user.password, salt);
      user.password = password;
      user.salt = salt
      user.passwordToken = null
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});


accountSchema.methods.isValidToken = async function (token) {
  const user = this;
  const isValid = await compare(token, user.token);
  // console.log(isValid)
  return isValid;
};
accountSchema.plugin(uniqueValidator, { message: `It looks like you've already got an account associated with this email. Log in instead or reset your password if you've forgotten it` });

const Account = model("account", accountSchema);

module.exports = Account;
