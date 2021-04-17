const Provider = require("./provider.model")
const AccountService = require("../account/account.service")


const findProviderByAccountId = async (accountId) => {
    const provider = await Provider.findOne({account: accountId})
    return provider
}
const createProvider = async (name, accountId) => {
    const session = await Provider.startSession()
    try{
    session.startTransaction()
    const provider = await Provider.create([{ name,account:accountId }],{session});
    await session.commitTransaction()
    return provider
    }catch(err){
        console.log("ABBBBOOOORRTTTTTTT22222")
        console.log("ERRORR 2 ", err)
        await session.abortTransaction()
        session.endSession()
        throw err
    }
    
  };

  module.exports = {createProvider, findProviderByAccountId}