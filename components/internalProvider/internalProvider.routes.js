const router = require('express').Router()

const { getInternalProviders,getParticularInternalProvider, createInternalProvider,updateInternalProvider} = require('../internalProvider/internalProvider.controller')
router.get('/api/internalProviders', getInternalProviders)
router.get('/api/internalProviders/:id', getParticularInternalProvider)
router.post('/api/internalProviders', createInternalProvider)
router.put('/api/internalProviders/:id', updateInternalProvider)


module.exports = router