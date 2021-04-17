const TargetAudience = require('./targetAudience.model')

const createTargetAudience = async (targetAudience) => {
    return (await TargetAudience.create(targetAudience))
}

const updateTargetAudience = async (id, targetAudience) => {
    return (await TargetAudience.findByIdAndUpdate(id, targetAudience, { new: true }))
}


const getTargetAudience = async (id) => {
    return (await TargetAudience.findById(id))
}

const getAllTargetAudiences = async () => {
    return (await TargetAudience.find())
}

const deleteTargetAudience = async (id) => {
    return (await TargetAudience.findByIdAndDelete(id).exec())
}

const getAvailableTargetAudiences = async () => {
    return (await TargetAudience.find({ disabled: false }).exec())
}

const activateTargetAudience = async (id) => {
    return (await TargetAudience.findByIdAndUpdate(id, { disabled: false }, { new: true }).exec())
}

const deactivateTargetAudience = async (id) => {
    return (await TargetAudience.findByIdAndUpdate(id, { disabled: true }, { new: true }).exec())
}

module.exports = {
    createTargetAudience,
    getTargetAudience,
    getAllTargetAudiences,
    updateTargetAudience,
    deleteTargetAudience,
    getAvailableTargetAudiences,
    activateTargetAudience,
    deactivateTargetAudience
}