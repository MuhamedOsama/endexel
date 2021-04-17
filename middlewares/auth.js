const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const {
   findAccountByGoogleId,
   createGoogleOauthAccount,
   findAccountByEmail,
   findAccountByFacebookId,
   createFacebookOauthAccount,
   createSeekerAccount,
   createProviderAccount
} = require('../components/account/account.service');
const keys = require('../config/keys');
passport.serializeUser(function (user, done) {
   done(null, user);
});

passport.deserializeUser(function (user, done) {
   done(null, user);
});

passport.use(
   'signupSeeker',
   new localStrategy(
      {
         usernameField: 'email',
         passwordField: 'password',
         passReqToCallback: true

      },
      async (req, email, password, done) => {
         try {
            const user =  await createSeekerAccount(req.hostname,req.body.firstName,req.body.lastName, email, password)
            console.log("EXCEPTION BEEN HIT")
            return done(null, user);
         } catch (error) {
            return done(error);
         }
      }
    )
);
passport.use(
   'signupProvider',
   new localStrategy(
      {
         usernameField: 'email',
         passwordField: 'password',
         passReqToCallback: true

      },
      async (req, email, password, done) => {
         try {
            const user =  await createProviderAccount(req.hostname, req.body.name, email, password)
            return done(null, user);
         } catch (error) {
            // console.log(error)
            return done(error);
         }
      }
    )
);

passport.use(
   'login',
   new localStrategy(
      {
         usernameField: 'email',
         passwordField: 'password',
      },
      async (email, password, done) => {
         try {
            const user = await findAccountByEmail(email);
            if (!user) {
               return done(null, false, { message: 'Wrong Email.' });
            }
            const isUserPasswordValid = await user.isValidPassword(
               password,
               user.password
            );
            if (!isUserPasswordValid) {
               return done(null, false, { message: 'Wrong Password.' });
            }
            return done(null, user, { message: 'Welcome Back!' });
         } catch (error) {
            console.log(error);
            return done(error);
         }
      }
   )
);

passport.use(
   new GoogleStrategy(
      {
         // MUST BE REPLACE WITH KEYS THAT READ FROM ENV VARIABLES AFTER FLOW WORKS AS PLANNED
         clientID: keys.google.id,
         clientSecret: keys.google.secret,
         passReqToCallback: true,
         callbackURL: `/auth/googleRedirect`,
      },
      //ACCESS & REFRESH TOKENS BELONG TO GOOGLE TO RETRIEVE MORE INFO ABOUT THE USER
      //AND WE DON'T NEED THEM NOW
      async function (req,accessToken, refreshToken, profile, done) {
         const userData = profile._json;
         console.log("REDIRECTING")
         console.log(req.query)
         const user = await findAccountByGoogleId(userData.sub);
         try{
            if (!user) {
               const newUser = await createGoogleOauthAccount(
                  userData.sub,
                  userData.email,
                  userData.firstName,
                  userData.lastName
               );
               return done(null, newUser);
            } else {
               return done(null, user);
            }
         }catch(error){
            done(error)
         }
         
      }
   )
);

passport.use(
   new FacebookStrategy(
      {
         clientID: keys.facebook.id,
         clientSecret: keys.facebook.secret,
         callbackURL: '/auth/facebookRedirect',
         profileFields: [
            'id',
            'emails',
            'name',
            'gender',
            'profileUrl',
            'link',
            'photos',
            'displayName',
         ],
      },
      async function (accessToken, refreshToken, profile, done) {
         console.log(profile, 'USER');

         const userData = profile._json;
         const user = await findAccountByFacebookId(userData.id);
         if (!user) {
            const newUser = await createFacebookOauthAccount(userData.id);
            //console.log("NO USER", newUser)
            return done(null, newUser);
         } else {
            //console.log("USER FOUND", user)
            return done(null, user);
         }
      }
   )
);

passport.use(
   new JWTstrategy(
      {
         // MUST BE REPLACE WITH KEYS THAT READ FROM ENV VARIABLES AFTER FLOW WORKS AS PLANNED
         secretOrKey: keys.jwtSecretKey,
         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      function (token, done) {
         try {
            return done(null, token.email);
         } catch (error) {
            return done(error);
         }
      }
   )
);
