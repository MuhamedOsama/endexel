const catchAsync = require("../../utils/catchAsync");
const internalProviderService = require("./internalProvider.service");
module.exports = {
  getInternalProviders: catchAsync(async (req, res, next) => {
    const internalProviders = await internalProviderService.getInternalProviders();
    res.status(200).json({
      status: "success",
      data: internalProviders
    });
  }),
  getParticularInternalProvider: catchAsync(async (req, res, next) => {
    const internalProviderId = req.params.internalProviderId;
    const foundCourse = await internalProviderService.getParticularInternalProvider(
      internalProviderId
    );
    if (!foundCourse) return next(new AppError("course not found", 400));
    res.json({
      status: "success",
      data: foundCourse,
    });
  }),
  updateInternalProvider: catchAsync(async (req, res, next) => {
    const internalProvider = await internalProviderService.updateInternalProvider(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: "success",
      data: internalProvider,
    });
  }),
  createInternalProvider: catchAsync(async (req, res, next) => {
    //section begin
    //should be exported to a util function or something..

    const internalProvider = { ...req.body };
    //section end
    const newInternalProvider = await internalProviderService.createInternalProvider(
      internalProvider
    );
    res.json({
      status: "success",
      data: newInternalProvider,
    });
  }),
};
