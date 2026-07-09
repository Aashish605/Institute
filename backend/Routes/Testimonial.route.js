import express from 'express'
const router = express.Router();

import { postTestimonial, getTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } from '../Controller/Testimonial.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

router.post("/post", isAdmin, postTestimonial)
router.get('/get', getTestimonials)
router.get('/get/:id', getTestimonialById)
router.put('/update', isAdmin, updateTestimonial)
router.delete('/delete', isAdmin, deleteTestimonial)

export default router;
