const router = require('express').Router()

const { getCourses,getParticularCourse, createCourse,updateCourse,publishCourse,unpublishCourse, addTagsToCourse} = require('../course/course.controller')
router.get('/api/courses', getCourses)
router.get('/api/courses/:id', getParticularCourse)
router.post('/api/courses', createCourse)
router.put('/api/courses/:id', updateCourse)
router.put('/api/courses/publish/:id', publishCourse)
router.put('/api/courses/unpublish/:id', unpublishCourse)
router.post('/api/courses/addTagsToCourse/:courseId', addTagsToCourse)
module.exports = router