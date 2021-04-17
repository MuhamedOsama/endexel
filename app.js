const express = require('express')

require('dotenv').config()
const path = require('path')
const bodyParser = require('body-parser')

const AppError = require('./utils/appError') 
const cors = require('cors')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
require('./middlewares/auth');
const passport = require("passport");
// test
// section
// add component routes
// begin

const courseRoutes = require('./components/course/course.routes')
const authRoutes = require('./components/auth/auth.routes')
const categoryRoutes = require("./components/category/category.routes")
const tagRoutes = require("./components/tag/tag.routes")
const accountRoutes = require('./components/account/account.routes')
const internalProviderRoutes = require("./components/internalProvider/internalProvider.routes")
const trackRoutes = require('./components/track/track.routes')
const ageRangeRoutes = require('./components/ageRange/ageRange.routes')
const targetAudience = require('./components/targetAudience/targetAudience.routes')



const errorHandler = require('./handler/errorHandler')
require('./db')



const app = express()
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next();
});
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended : true }))
app.use( bodyParser.json())
app.use(express.json())
app.use(courseRoutes)
app.use(categoryRoutes)
app.use(authRoutes)
app.use(tagRoutes)
app.use(accountRoutes)
app.use(internalProviderRoutes)
app.use(trackRoutes)
app.use(ageRangeRoutes)
app.use(targetAudience)


//app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.all( '*', (req, _, next) => {
  next(new AppError(`can not find route ${req.originalUrl} in this server`, 404))
})

app.use(errorHandler)

if(process.env.NODE_ENV === 'production'){
  app.use('/statics', express.static(path.join(__dirname, 'statics')))
  app.get('*', (req, res)=>{
      res.sendFile(path.resolve(__dirname, 'statics', 'index.html'));
    });
}

module.exports = app