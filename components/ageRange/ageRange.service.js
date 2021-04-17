const AgeRange = require('./ageRange.model')

const createAgeRange = async (ageRange) => {
    return (await AgeRange.create(ageRange))
}

const updateAgeRange = async (id, ageRange) => {
    return (await AgeRange.findByIdAndUpdate(id, ageRange, { new: true }))
}


const getAgeRange = async (id) => {
    return (await AgeRange.findById(id))
}

const getAllageRanges = async () => {
    return (await AgeRange.find())
}

const deleteAgeRange = async (id) => {
    return (await AgeRange.findByIdAndDelete(id).exec())
}

const getAvailableageRanges = async () => {
    return (await AgeRange.find({ disabled: false }).exec())
}

const activateAgeRange = async (id) => {
    return (await AgeRange.findByIdAndUpdate(id, { disabled: false }, { new: true }).exec())
}

const deactivateAgeRange = async (id) => {
    return (await AgeRange.findByIdAndUpdate(id, { disabled: true }, { new: true }).exec())
}

module.exports = {
    createAgeRange,
    getAgeRange,
    getAllageRanges,
    updateAgeRange,
    deleteAgeRange,
    getAvailableageRanges,
    activateAgeRange,
    deactivateAgeRange
}