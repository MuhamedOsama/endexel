const tagService = require('./tag.service')
const catchAsync = require("../../utils/catchAsync")

module.exports = {

    createTag: catchAsync(async (req, res, next) => {
        const newTag = await tagService.createTag(req.body)
        res.status(200).json({
            status: "success",
            data: newTag
        })

    }),

    getTag: catchAsync(async (req, res, next) => {

        const tag = await tagService.getTag(req.params.id)
        res.status(200).json({
            status: "success",
            data: tag
        })
    }),

    getAllTags: catchAsync(async (req, res, next) => {
        const tags = await tagService.getAllTags()
        res.status(200).json({
            status: "success",
            data: tags
        })
    }),
    updateTag: catchAsync(async (req, res, next) => {
        const tag = await tagService.updateTag(req.params.id, req.body)
        res.status(200).json({
            status: "success",
            data: tag
        })
    }),

    deleteTag: catchAsync(async (req, res, nex) => {
        await tagService.deleteTag(req.params.id)
        res.status(200).json({
            status: "success",
            data: null
        })
    })

}