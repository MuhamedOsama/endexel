const router = require('express').Router()
const { updatePassword, updateEmail, getAccountData } = require('./account.controller')

router.post('/account/updatePassword', updatePassword)
router.post('/account/updateEmail', updateEmail)
router.get('/account', getAccountData)

module.exports = router