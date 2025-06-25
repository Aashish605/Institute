import express from 'express'
const router = express.Router();

import {postMock,getMock,deleteMock} from '../Controller/Mock.controller.js'

router.post("/post",postMock)
router.get('/get',getMock)
router.post('/delete',deleteMock)

export default router;