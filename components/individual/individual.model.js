const User = require('../user/user')
const { Schema, model } = require('mongoose')
const ExternalProvider = require('../externalProvider/externalProvider.model')

const IndividualSchema = new Schema({}, { collection: 'users', timestamps: true })

ExternalProvider.discriminator('individual', IndividualSchema)
const Individual = model('individual')
module.exports = Individual