const Seeker = require("./seeker.model")

const findSeekerByAccountId = async (accountId) => {
    const seeker = await Seeker.findOne({ account: accountId })
    return seeker
}
const createSeeker = async (firstName,lastName, accountId) => {
    const session = await Seeker.startSession()
    try{
    session.startTransaction()
    const seeker = await Seeker.create([{ firstName,lastName, account: accountId }],{session});
    await session.commitTransaction()
    return seeker
    }catch(err){
        await session.abortTransaction()
        session.endSession()
        throw err
    }
};

const updateSeeker = async (filter = {}, query = {}) => {
    const session = await Seeker.startSession()
    try {
        session.startTransaction()
        const seeker = await Seeker.updateOne(filter, query)
        session.commitTransaction()
        await session.commitTransaction()
    } catch (err) {
        console.log("ERRORR ", err)
        await session.abortTransaction()
        session.endSession()
        throw err
    }
}

const deleteSeeker = async (seekerId) => {
    const session = await Seeker.startSession()
    try {
        session.startTransaction()
        const seeker = await Seeker.deleteOne({ _id: seekerId })
        await session.commitTransaction()

    } catch (err) {
        console.log("ERRORR ", err)
        await session.abortTransaction()
        session.endSession()
        throw err
    }
}

module.exports = { createSeeker, findSeekerByAccountId, updateSeeker, deleteSeeker }
