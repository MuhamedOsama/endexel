const Account = require('./account.model');
const Mail = require('../../services/mail/mail'); // mail service
const crypto = require('crypto');
const { compare } = require('bcryptjs');
const {
   createSeeker,
   findSeekerByAccountId,
} = require('../seeker/seeker.service');
const {
   createProvider,
   findProviderByAccountId,
} = require('../provider/provider.service');
const { sign, decode } = require('jsonwebtoken');
const { SECRET_KEYS } = require('../../config/mail');
const findAccountByGoogleId = async (Id) => {
   const account = await Account.findOne({ googleId: Id });
   if (!account) {
      return null;
   } else {
      return account;
   }
};
const findAccountByFacebookId = async (Id) => {
   const account = await Account.findOne({ facebookId: Id });
   if (!account) {
      return null;
   } else {
      return account;
   }
};
const createGoogleOauthAccount = async (googleId, email) => {
   const newAccount = await Account.create({
      googleId,
      email,
      firstName: 'default first name',
      lastName: 'default last name',
      isThirdPartyAccount: true,
   });

   return newAccount;
};

const createFacebookOauthAccount = async (facebookId) => {
   const newAccount = await Account.create({
      facebookId: facebookId,
      email: 'qweqwe@waewae.cadwqe',
      firstName: 'weqwewqeq',
      lastName: 'weqwewqeq',
      isThirdPartyAccount: true,
   });

   return newAccount;
};
const findAccountByEmail = async (email) => {
   const account = await Account.findOne({ email: email });
   return account;
};

const createSeekerAccount = async (
   hostname,
   firstName,
   lastName,
   email,
   password
) => {
   const accountSession = await Account.startSession();
   try {
      // const token = crypto.randomBytes(60).toString("hex").slice(0, 60);
      const token = sign({}, SECRET_KEYS.seeker.verification, {
         expiresIn: 2 * 60 * 60, // 2 hrs in seconds
      });
      accountSession.startTransaction();
      const account = await Account.create(
         [
            {
               email,
               password,
               token,
               accountType: 'seeker',
               roles: ['seeker'],
            },
         ],
         { session: accountSession }
      );

      await accountSession.commitTransaction();
      const seeker = await createSeeker(
         firstName,
         lastName,
         account[0]._id
      );
      accountSession.endSession();
      await Mail.sendEmail(hostname, account[0]._id, email, token);

      return account[0];
   } catch (err) {
      await accountSession.abortTransaction();
      accountSession.endSession();
      throw err;
   }
};
const createProviderAccount = async (hostname, name, email, password) => {
   const accountSession = await Account.startSession();
   try {
      // const token = crypto.randomBytes(60).toString("hex").slice(0, 60);
      const token = sign({}, SECRET_KEYS.provider.verification, {
         expiresIn: 2 * 60 * 60, // 2 hrs in seconds
      });

      accountSession.startTransaction();
      const account = await Account.create(
         [
            {
               email,
               password,
               token,
               accountType: 'provider',
               roles: ['provider'],
            },
         ],
         { session: accountSession }
      );

      await accountSession.commitTransaction();
      console.log('ACCOUNT ID ', account);
      const provider = await createProvider(name, account[0]._id);
      accountSession.endSession();
      await Mail.sendEmail(hostname, account._id, email, name, token);

      return account[0];
   } catch (err) {
      await accountSession.abortTransaction();
      accountSession.endSession();
      throw err;
   }
};

const resendEmail = async (hostname, email) => {
   const account = await Account.findOne({ email }).exec();
   // const token = crypto.randomBytes(60).toString("hex").slice(0, 60);
   const token = sign({}, SECRET_KEYS.seeker.verification, {
      // expiresIn: 60 * 30 // 30 mins in seconds
      expiresIn: 2 * 60 * 60, // 2 hrs in seconds
   });
   if (!account) return 'Not found';
   account.token = token;
   await account.save();
   await Mail.sendEmail(hostname, account._id, email, token);
   return true;
};

const validateToken = async (id, token) => {
   const account = await Account.findOne({ _id: id }).exec();
   if (!account) return 'Invalid account Id';
   if (String(account.token).trim() != String(token).trim())
      return 'Invalid account token';
   if (account.verified) return 'Invalid link';
   // checks whetehr time in token is expired or not ...note that time expire in token after 30 mins
   const decodedToken = decode(token);
   if (Math.floor(Date.now() / 1000) >= decodedToken.exp)
      return 'token expired';
   account.verified = true;
   account.token = null;
   account.save();
   return true;
};

const sendPasswordReset = async (hostname, email) => {
   const account = await Account.findOne({ email }).exec();
   if (!account) return 'Invalid account Id';
   // const passwordToken = crypto.randomBytes(60).toString("hex").slice(0, 60);
   const passwordToken = sign(
      { email: account.email },
      SECRET_KEYS.seeker.passwordReset,
      {
         expiresIn: 2 * 60 * 60,
      }
   );

   account.passwordToken = passwordToken;
   await account.save();
   await Mail.resetPassword(hostname, account._id, email, passwordToken);
   return true;
};

// change localhost to whatever website or host in email
const resetPassword = async (id, token, newPassword) => {
   var account = await Account.findOne({ _id: id }).exec();
   if (!account) return 'Invalid account Id';
   if (String(account.passwordToken).trim() != String(token).trim())
      return 'Invalid account token';

   // checks whether token expired or not
   const decodedToken = decode(token);
   if (Math.floor(Date.now() / 1000) >= decodedToken.exp)
      return 'token expired';
   if (await compare(newPassword, account.password))
      return 'new password and old password cannot be same';
   account.password = newPassword;
   await account.save();
   return true;
};

const updatePassword = async (token, currentPassword, newPassword) => {
   const decodedToken = decode(token);
   var account = await Account.findOne({ _id: decodedToken._id });
   if (!(await compare(currentPassword, account.password)))
      return 'invalid current password';
   if (currentPassword == newPassword)
      return 'you already entered current password as new password';

   account.password = newPassword;
   await account.save();
   return true;
};

const updateEmail = async (
   token,
   currentEmail,
   newEmail,
   currentPassword
) => {
   const decodedToken = decode(token);
   var account = await Account.findOne({ _id: decodedToken._id });
   if (!(await compare(currentPassword, account.password)))
      return 'invalid current password';
   if (currentEmail == newEmail) return 'Please provide another mail';
   // logic here may change
   account.email = newEmail;
   account.verified = false;
   await account.save();
   return true;
};

const getAccountByEmail = async (email, accountType) => {
   const account = await Account.findOne({ email }).exec();
   var profile;
   if (accountType == 'seeker')
      profile = await findSeekerByAccountId(account._id);
   else profile = await findProviderByAccountId(account._id);
   return {
      _id: account._id,
      email: account.email,
      accountType: account.accountType,
      roles: account.roles,
      verified: account.verified,
      profile,
   };
};

module.exports = {
   findAccountByGoogleId,
   createGoogleOauthAccount,
   findAccountByEmail,
   findAccountByFacebookId,
   createFacebookOauthAccount,
   validateToken,
   resendEmail,
   resetPassword,
   sendPasswordReset,
   createSeekerAccount,
   createProviderAccount,
   updatePassword,
   updateEmail,
   getAccountByEmail,
};
