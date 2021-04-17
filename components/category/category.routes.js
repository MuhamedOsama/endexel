const router = require("express").Router()

const { createCategory, getCategory, getAllCategories, updateCategory, deleteCategory, categoriesLookup,activateCategory,deactivateCategory } = require("./category.controller")

router.post("/api/categories", createCategory)
router.put("/api/categories/:id", updateCategory)
router.delete('/api/categories/:id', deleteCategory)
router.get("/api/categories/", getAllCategories)
router.get("/api/categorieslookup", categoriesLookup)
router.get("/api/categories/:id", getCategory)
router.post("/api/categories/:id/activate", activateCategory)
router.post("/api/categories/:id/deactivate", deactivateCategory)


module.exports = router