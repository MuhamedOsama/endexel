const ejs = require('ejs')
module.exports.generateTemplate = async (pathToFile, opts = {}) => {
    const data = await ejs.renderFile(pathToFile, opts)
    return data
}