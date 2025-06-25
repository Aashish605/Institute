import express from 'express'
const router = express.Router();

import {postNotice,getNotice,deleteNotice} from '../Controller/Notice.controller.js'

router.post("/post",postNotice)
router.get('/get',getNotice)
router.post('/delete',deleteNotice)

export default router;