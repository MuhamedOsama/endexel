const router = require("express").Router()

const { activateAgeRange, ageRangesLookup, createAgeRange, deactivateAgeRange, deleteAgeRange, getAgeRange, getAllAgeRanges, updateAgeRange } = require('./ageRange.controller')

router.post("/api/ageRanges", createAgeRange)
router.put("/api/ageRanges/:id", updateAgeRange)
router.delete('/api/ageRanges/:id', deleteAgeRange)
router.get("/api/ageRanges/", getAllAgeRanges)
router.get("/api/ageRangeslookup", ageRangesLookup)
router.get("/api/ageRanges/:id", getAgeRange)
router.post("/api/ageRanges/:id/activate", activateAgeRange)
router.post("/api/ageRanges/:id/deactivate", deactivateAgeRange)

module.exports = router