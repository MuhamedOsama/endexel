const router = require('express').Router()
const {
    createTrack,
    getParticularTrack,
    getTracks,
    markTrackPublished,
    markTrackUnpublished,
    updateTrack
} = require('./track.controller')
router.post('/api/tracks', createTrack)
router.get('/api/tracks/:id', getParticularTrack)
router.patch('/api/track/:id', updateTrack)
router.get('/api/tracks', getTracks)
router.post('/api/tracks/:id/publish', markTrackPublished)
router.post('/api/tracks/:id/unpublish', markTrackUnpublished)


module.exports = router