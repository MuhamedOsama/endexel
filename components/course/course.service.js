const Course = require("./course.model");
const tagService = require("../tag/tag.service");
const getAllCourses = async () => {
  return await Course.find();
};
const getParticularCourse = async (courseId) => {
  return await Course.findById(courseId);
};
const updateCourse = async (id, course) => {
  console.log(id, course);
  return await Course.findByIdAndUpdate({ _id: id }, course, { new: true });
};

const createCourse = async (course) => {
  let newCourse = await Course.create({ ...course });
  let count = (await Course.count()).toString();
  const date = new Date();
  const dateCode = `${date.getDate().toString().padStart(2, "0")}${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${date.getFullYear("YYYY")}/${count.padStart(4, "0")}`;
  newCourse.referenceNumber = dateCode;
  newCourse.save();
  return newCourse;
};
const publishCourse = async (id) => {
  return await Course.findByIdAndUpdate(
    { _id: id },
    { published: true },
    { new: true }
  );
};
const unpublishCourse = async (id) => {
  return await Course.findByIdAndUpdate(
    { _id: id },
    { published: false },
    { new: true }
  );
};
const addTagToCourse = async (courseId, tagId) => {
  let course = await Course.findById(courseId);
  if (course.tags.includes(tagId)) {
    return course;
  } else {
    await course.update({ tags: [...course.tags, tagId] });
    return course;
  }
};
const updateCourseTags = async (courseId, tagNames) => {
  let course = Course.findById(courseId)
  return await course.updateOne({ tags: tagNames });
};
module.exports = {
  getAllCourses,
  getParticularCourse,
  createCourse,
  updateCourse,
  publishCourse,
  unpublishCourse,
  addTagToCourse,
  updateCourseTags
};
