import express from 'express'
const router = express.Router();

import {getCourse, getCourseByTitle} from '../Controller/course.controller.js'

router.get("/",getCourse)
router.get("/:title", getCourseByTitle)

export default router;