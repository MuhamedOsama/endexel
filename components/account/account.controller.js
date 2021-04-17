const {
   validateToken,
   resendEmail,
   sendPasswordReset,
   resetPassword,
   updatePassword,
   updateEmail,
   getAccountByEmail,
} = require('./account.service');

const catchAsync = require('../../utils/catchAsync');
const { decode } = require('jsonwebtoken');

module.exports = {
   validateToken: catchAsync(async (req, res, next) => {
      const { token, id } = req.query;
      const result = await validateToken(id, token);
      return res.json({
         status: 'seccess',
         data: result,
      });
   }),

   resendMail: catchAsync(async (req, res, next) => {
      const token = req.headers['authorization'];
      const decodedToken = decode(token);
      console.log(req.headers['authorization']);
      const result = await resendEmail(req.hostname, decodedToken.email);
      return res.json({
         status: 'success',
         data: result,
      });
   }),
   sendResetPassword: catchAsync(async (req, res, next) => {
      const { email } = req.body;
      const hostname = 'localhost:3000';
      const result = await sendPasswordReset(hostname, email);
      return res.json({
         status: 'success',
         data: result,
      });
   }),
   resetPassword: catchAsync(async (req, res, next) => {
      const { token } = req.query;
      const decodedToken = decode(token);
      const user = await getAccountByEmail(decodedToken.email);
      const result = await resetPassword(
         user._id,
         token,
         req.body.password
      );
      return res.json({
         status: 'success',
         data: result,
      });
   }),
   updatePassword: catchAsync(async (req, res, next) => {
      const { currentPassword, newPassword } = req.body;
      const token = req.headers.authorization;
      const result = await updatePassword(
         token,
         currentPassword,
         newPassword
      );

      return res.json({
         status: 'success',
         data: result,
      });
   }),
   updateEmail: catchAsync(async (req, res, next) => {
      const { currentPassword, currentEmail, newEmail } = req.body;
      const token = req.headers.authorization;
      const result = await updateEmail(
         token,
         currentEmail,
         newEmail,
         currentPassword
      );
      return res.json({
         status: 'success',
         data: result,
      });
   }),
   getAccountData: catchAsync(async (req, res, next) => {
      const token = req.headers.authorization;
      const decodedToken = decode(token);
      const user = await getAccountByEmail(decodedToken.email);
      const result = {
         _id: user._id,
         email: user.email,
         accountType: user.accountType,
         roles: user.roles,
         verified: user.verified,
      };
      return res.json({
         status: 'success',
         data: result,
      });
   }),
};
