import express from 'express'
const router = express.Router();

import { postMock, getMock, getMockById, deleteMock } from '../Controller/Mock.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

router.post("/post", isAdmin, postMock)
router.get('/get', getMock)
router.get('/get/:id', getMockById)
router.post('/delete', isAdmin, deleteMock)

export default router;
