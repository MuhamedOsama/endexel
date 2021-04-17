const Category = require("./category.model")

const createCategory = async (category) => {
    return (await Category.create(category))
}

const updateCategory = async (id, category) => {
    return (await Category.findByIdAndUpdate(id, category, { new: true }))
}


const getCategory = async (id) => {
    return (await Category.findById(id))
}

const getAllCategories = async () => {
    return (await Category.find())
}

const deleteCategory = async (id) => {
    return (await Category.findByIdAndDelete(id).exec())
}

const getAvailableCategories = async () => {
    return (await Category.find({ disabled: false }).exec())
}

const activateCategory = async (id) => {
    return (await Category.findByIdAndUpdate(id, { disabled: false }, { new: true }).exec())
}

const deactivateCategory = async (id) => {
    return (await Category.findByIdAndUpdate(id, { disabled: true }, { new: true }).exec())
}

module.exports = {
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getAvailableCategories,
    activateCategory,
    deactivateCategory
}