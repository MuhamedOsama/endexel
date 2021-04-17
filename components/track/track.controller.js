const {
    createTrack,
    getTracks,
    publishTrack,
    unpublishTrack,
    updateTrack,
    getTrackById
} = require('./track.service')

const catchAsync = require('../../utils/catchAsync')

module.exports = {
    createTrack: catchAsync(async (req, res, next) => {
        const track = await createTrack(req.body)
        return res.json({
            status: "success",
            data: track
        })
    }),
    updateTrack: catchAsync(async (req, res, next) => {
        const track = await updateTrack(req.params.id, req.body)
        return res.json({
            status: "success",
            data: track
        })
    }),
    getParticularTrack: catchAsync(async (req, res, next) => {
        const track = await getTrackById(req.params.id)
        return res.json({
            status: "success",
            data: track
        })
    }),
    getTracks: catchAsync(async (req, res, next) => {
        const tracks = await getTracks()
        return res.json({
            status: "success",
            data: tracks
        })
    }),
    markTrackPublished: catchAsync(async (req, res, next) => {
        const track = await publishTrack(req.params.id)
        return res.json({
            status: "success",
            data: track
        })
    }),
    markTrackUnpublished: catchAsync(async (req, res, next) => {
        const track = await unpublishTrack(req.params.id)
        return res.json({
            status: "success",
            data: track
        })
    }),
}