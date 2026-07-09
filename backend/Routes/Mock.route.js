import express from 'express'
const router = express.Router();

import { postMock, getMock, getMockById, updateMock, deleteMock } from '../Controller/Mock.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

router.post("/post", isAdmin, postMock)
router.get('/get', getMock)
router.get('/get/:id', getMockById)
router.delete('/delete', isAdmin, deleteMock)
router.put('/update', isAdmin, updateMock)

export default router;
