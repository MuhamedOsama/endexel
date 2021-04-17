const categoryService = require("./category.service");
const catchAsync = require("./../../utils/catchAsync");

module.exports = {
  createCategory: catchAsync(async (req, res, next) => {
    const newCategory = await categoryService.createCategory(req.body);
    res.status(200).json({
      status: "success",
      data: newCategory,
    });
  }),

  getCategory: catchAsync(async (req, res, next) => {
    const category = await categoryService.getCategory(req.params.id);
    res.status(200).json({
      status: "success",
      data: category
    });
  }),

  getAllCategories: catchAsync(async (req, res, next) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  }),
  updateCategory: catchAsync(async (req, res, next) => {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: "success",
      data: category
    });
  }),

  deleteCategory: catchAsync(async (req, res, nex) => {
    await categoryService.deleteCategory(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  }),
  categoriesLookup: catchAsync(async (req, res, next) => {
    const categories = await categoryService.getAvailableCategories()
    res.status(200).json({
      status: "success",
      data: categories
    })
  }),
  deactivateCategory: catchAsync(async (req, res, next) => {
    const category = await categoryService.deactivateCategory(req.params.id)
    res.status(200).json({
      status: "success",
      data: category
    })
  }),
  activateCategory: catchAsync(async (req, res, next) => {
    const category = await categoryService.activateCategory(req.params.id)
    res.status(200).json({
      status: "success",
      data: category
    })
  })

};
