const Course = require("./course.model");
const catchAsync = require("../../utils/catchAsync");
const courseService = require("./course.service");
const tagService = require("../tag/tag.service");

const AppError = require("../../utils/appError");
const Tag = require("../tag/tag.model");
module.exports = {
  getCourses: catchAsync(async (req, res, next) => {
    const courses = await courseService.getAllCourses();
    res.status(200).json({
      status: "success",
      data:courses,
    });
  }),

  getParticularCourse: catchAsync(async (req, res, next) => {
    const courseId = req.params.id;
    const foundCourse = await courseService.getParticularCourse(courseId);
    if (!foundCourse) return next(new AppError("invalid credentials", 400));
    res.json({
      status: "success",
      data: foundCourse,
    });
  }),
  updateCourse: catchAsync(async (req, res, next) => {
    const course = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: course,
    });
  }),
  publishCourse: catchAsync(async (req, res, next) => {
    const course = await courseService.publishCourse(req.params.id);
    res.status(200).json({
      status: "success",
      data: course,
    });
  }),
  unpublishCourse: catchAsync(async (req, res, next) => {
    const course = await courseService.unpublishCourse(req.params.id);
    res.status(200).json({
      status: "success",
      data:course,
    });
  }),
  createCourse: catchAsync(async (req, res, next) => {
    //section begin
    //should be exported to a util function or something..
    const course = { ...req.body };
    //section end
    const newCourse = await courseService.createCourse(course);
    res.json({
      status: "success",
      data: newCourse,
    });
  }),
  addTagsToCourse: catchAsync(async (req, res, next) => {
    const course = await courseService.getParticularCourse(req.params.courseId)
    const tagNames = req.body.tags
    if (course) {
      await courseService.updateCourseTags(course._id, tagNames)
      return res.json({
        status: "success",
        data: course,
      });
    }
    return res.json({
      status: "fail",
      message: "course or tag not found"
    });
  })
};
