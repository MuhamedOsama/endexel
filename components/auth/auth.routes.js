const express = require("express");
const passport = require("passport");
const JwtTokenService = require("../../services/JwtTokenService");
const router = express.Router();
const AppError = require("./../../utils/appError");
const {
  validateToken,
  resendMail,
  resetPassword,
  sendResetPassword,
} = require("../account/account.controller");
const { findProviderByAccountId } = require("../provider/provider.service");
const { findSeekerByAccountId } = require("../seeker/seeker.service");
router.post("/signupSeeker", async (req, res, next) => {
  passport.authenticate("signupSeeker", async (err, user, info) => {
    try {
      if (err || !user) {
        const errorMessages = [];
        for (const e in err.errors) {
          errorMessages.push(err.errors[e].properties.message);
        }
        const error = new AppError(
          errorMessages.join(","),
          "400",
          errorMessages.join(",")
        );
        return next(error);
      }

      const result = JwtTokenService.generateToken(user);
      const profile = await findSeekerByAccountId(user._id);
      return res.json({
        status: "success",
        data: {
          ...result,
          profile,
        },
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/signupProvider", async (req, res, next) => {
  passport.authenticate("signupProvider", async (err, user, info) => {
    try {
      if (err || !user) {
        const errorMessages = [];
        for (const e in err.errors) {
          errorMessages.push(err.errors[e].properties.message);
        }
        const error = new AppError(
          errorMessages.join(","),
          "400",
          errorMessages.join(",")
        );
        return next(error);
      }
      const result = JwtTokenService.generateToken(user);
      const profile = await findProviderByAccountId(user._id);
      return res.json({
        status: "success",
        data: {
          ...result,
          profile,
        },
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user) {
      //AUTH FAILED, USER NAME OR PASSWORD INCORRECT
      const error = new AppError(info.message, "400", info.message);
      return next(error);
    }
    req.login(user, { session: false }, async (error) => {
      if (error) return next(error);
      const result = JwtTokenService.generateToken(user);
      let profile;
      if (user.accountType == "provider") {
        profile = await findProviderByAccountId(user._id);
      } else if (user.accountType == "seeker") {
        profile = await findSeekerByAccountId(user._id);
      }

      return res.json({
        status: "success",
        data: {
          ...result,
          profile,
        },
      });
    });
  })(req, res, next);
});
// router.get("/auth/google", async (req, res, next) => {
//   passport.authenticate(
//     "google",
//     { session: false, scope: ["email"] },
//     async (err, user, info) => {
      
//       if (err) {
//         console.log(err);
//       }
//     }
//   )(req, res, next);
// });
router.get(
  "/auth/google",
  passport.authenticate("google", { session: false, scope: ["email"] })
);


router.get(
  "/auth/googleRedirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    //REACT CLIENT URL, Auth Page to capture jwt and client id
    const CLIENT_URL = "http://localhost:3000/Authorize" 
    const result = JwtTokenService.generateToken(req.user);
    res.redirect(`${CLIENT_URL}?token=${result.accessToken}&clientId=${result.account._id}`);
  }
);
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { session: false, scope: ["email"] })
);
router.get(
  "/auth/facebookRedirect",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const result = JwtTokenService.generateToken(req.user);
    return res.json({
      status: "success",
      data: {
        ...result,
      },
    });
  }
);

router.get("/account/confirm", validateToken);

router.get("/account/resend", resendMail);

router.post("/account/forgotPassword", sendResetPassword);

router.post("/account/reset", resetPassword);

module.exports = router;
