const router = require("express").Router()

const {createTag, getTag,getAllTags,updateTag,deleteTag} = require("./tag.controller")

router.post("/api/tags",createTag)
router.put("/api/tags/:id",updateTag)
router.delete('/api/tags/:id',deleteTag)
router.get("/api/tags/",getAllTags)
router.get("/api/tags/:id", getTag)

module.exports = router