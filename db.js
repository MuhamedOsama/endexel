// const { connect } = require('mongoose')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// mongoose options
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0
};

const dbConnectionURL = {
     'LOCALURL': ` ${process.env.MONGO_URI_PREFIX}://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?${process.env.MONGO_URI_OPTIONS}`
    //  'LOCALURL': ` mongodb://localhost/endexel`

};
console.log(dbConnectionURL)
mongoose.connect(dbConnectionURL.LOCALURL, options);
// this fixes some of mongoose warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
/**
 * to avoid other warnings
 * Replace update() with updateOne(), updateMany(), or replaceOne()
 * Replace remove() with deleteOne() or deleteMany().
 * Replace count() with countDocuments(), unless you want to count how many documents are in the whole collection (no filter). In the latter case, use estimatedDocumentCount().
 * --------------------------------------------------------------------------------------------------------------------------------------
 * NOTE FOR WARNINGS :
 * (node:5056) DeprecationWarning: Listening to events on the Db class has been deprecated and will be removed in the next major version.
 * (node:13752) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
 * although safe warnings
 * solution is either to downgrade to 5.11.15 or to wait for update that will fix it,
 * --------------------------------------------------------------------------------------------------------------------------------------
 */
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));
db.once('open', () => {
    // we're connected !
    console.log('Mongodb Connection Successful');
});