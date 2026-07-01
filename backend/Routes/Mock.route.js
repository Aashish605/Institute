import express from 'express'
const router = express.Router();

import {postMock,getMock,getMockById,deleteMock} from '../Controller/Mock.controller.js'

router.post("/post",postMock)
router.get('/get',getMock)
router.get('/get/:id', getMockById)
router.post('/delete',deleteMock)

export default router;