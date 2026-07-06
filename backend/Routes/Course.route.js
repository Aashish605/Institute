import express from 'express'
const router = express.Router();

import { getCourse, getCourseByTitle, getCourseById, createCourse, updateCourse, deleteCourse } from '../Controller/course.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

router.get("/", getCourse)
router.get("/id/:id", getCourseById)
router.get("/:title", getCourseByTitle)
router.post("/", isAdmin, createCourse)
router.put("/:id", isAdmin, updateCourse)
router.delete("/:id", isAdmin, deleteCourse)

export default router;
