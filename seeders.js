var seeder = require('mongoose-seed');
var faker = require('faker');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB via Mongoose
const dbConnectionURL = {
   'LOCALURL': ` ${process.env.MONGO_URI_PREFIX}://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?${process.env.MONGO_URI_OPTIONS}`
};
console.log(dbConnectionURL.LOCALURL)
seeder.connect(dbConnectionURL.LOCALURL, function () {
   // Load Mongoose models

   seeder.loadModels([
      './components/learner/learner.model.js',
      './components/mentor/mentor.model.js',
      './components/internalProvider/internalProvider.model.js',
      './components/corporate/corporate.model.js',
      './components/individual/individual.model.js'
   ]);

   // Clear specified collections
   seeder.clearModels(
      [
         'learner',
         'mentor',
         'internalProvider',
         'corporate',
         'individual'
      ],
      function () {
         // seeder.clearModels(['learner'], function() {

         // Callback to populate DB once collections have been cleared
         seeder.populateModels(data, function () {
            seeder.disconnect();
         });
      }
   );
});

// Data array containing seed data - documents organized by Model
var data = [
   {
      model: 'learner',
      'documents': [
         {
            nameAr: 'احمد اشرف دياب',
            nameEn: 'ahmed ashraf diab',
            password: 'test pass test',
            imageURL: 'test image',
            DOB: new Date(1998, 05, 17),
            email: "test1@test.com"
         }
      ]
   },
   {
      model: 'mentor',
      'documents': [
         {
            nameAr: 'احمد اشرف دياب',
            nameEn: 'ahmed ashraf diab',
            password: 'test pass test',
            imageURL: 'test image',
            DOB: new Date(1998, 05, 17),
            email: "test2@test.com"

         }
      ]
   },
   {
      model: 'internalProvider',
      'documents': [
         {
            nameAr: 'احمد اشرف دياب',
            nameEn: 'ahmed ashraf diab',
            descriptionAr: "تيست تيست",
            descriptionEn: 'test desc',
            email: "test3@test.com",
            password: 'test pass test',
            Logo: 'test image',
            website: 'website test'
         }
      ]
   }, {
      model: 'corporate',
      'documents': [
         {
            nameAr: 'احمد اشرف دياب',
            nameEn: 'ahmed ashraf diab',
            password: 'test pass test',
            imageURL: 'test image',
            DOB: new Date(1998, 05, 17),
            email: "test4@test.com"

         }
      ]
   },
   {
      model: 'individual',
      'documents': [
         {
            nameAr: 'احمد اشرف دياب',
            nameEn: 'ahmed ashraf diab',
            password: 'test pass test',
            imageURL: 'test image',
            DOB: new Date(1998, 05, 17),
            email: "test5@test.com"

         }
      ]
   }
]