const router = require("express").Router()

const { activateTargetAudience, targetAudiencesLookup, createTargetAudience, deactivateTargetAudience, deleteTargetAudience, getTargetAudience, getAllTargetAudiences, updateTargetAudience } = require('./targetAudience.controller')

router.post("/api/targetAudiences", createTargetAudience)
router.put("/api/targetAudiences/:id", updateTargetAudience)
router.delete('/api/targetAudiences/:id', deleteTargetAudience)
router.get("/api/targetAudiences/", getAllTargetAudiences)
router.get("/api/targetAudienceslookup", targetAudiencesLookup)
router.get("/api/targetAudiences/:id", getTargetAudience)
router.post("/api/targetAudiences/:id/activate", activateTargetAudience)
router.post("/api/targetAudiences/:id/deactivate", deactivateTargetAudience)

module.exports = router