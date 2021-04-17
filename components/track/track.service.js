const Track = require('./track.model')

const createTrack = async (track) => {
    return (await Track.create(track))
}

const updateTrack = async (id, updatedTrack) => {
    return (await Track.findByIdAndUpdate(id, updatedTrack, { new: true }))
}

const getTracks = async () => {
    return (await Track.find().exec())
}

const getTrackById = async (id) => {
    return (await Track.findOne({ _id: id }).exec())
}

const publishTrack = async (id) => {
    return (await Track.findByIdAndUpdate(id, { published: true }, { new: true }))
}

const unpublishTrack = async (id) => {
    return (await Track.findByIdAndUpdate(id, { published: false }, { new: true }))
}

module.exports = {
    createTrack,
    updateTrack,
    getTracks,
    getTrackById,
    publishTrack,
    unpublishTrack
}