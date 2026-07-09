import express from 'express'
const router = express.Router();

import { postTestimonial, getTestimonials, deleteTestimonial } from '../Controller/Testimonial.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

router.post("/post", isAdmin, postTestimonial)
router.get('/get', getTestimonials)
router.delete('/delete', isAdmin, deleteTestimonial)

export default router;
