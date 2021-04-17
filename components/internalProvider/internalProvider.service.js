const InternalProvider = require("./internalProvider.model")

const createInternalProvider = async(internalProvider) =>{
    return await InternalProvider.create(internalProvider)
}

const updateInternalProvider = async(id , internalProvider)=>{
    return await InternalProvider.findByIdAndUpdate({_id: id }, internalProvider, {new: true})
}


const getParticularInternalProvider = async(id)=> {
    return await InternalProvider.findById(id)
}

const getInternalProviders = async()=> {
    return await InternalProvider.find()
}

const deleteInternalProvider = async(id)=>{
    return await InternalProvider.findByIdAndDelete(id).exec()
}

module.exports = {createInternalProvider ,
    updateInternalProvider,
    getParticularInternalProvider,
    getInternalProviders,
    deleteInternalProvider
}