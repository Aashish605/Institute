import express from 'express'
const router = express.Router();

import {getCourse} from '../Controller/course.controller.js'

router.get("/",getCourse)

export default router;