import express from 'express'
const router = express.Router();

import {postNotice,getNotice,getNoticeById,deleteNotice,updateNotice} from '../Controller/Notice.controller.js'

router.post("/post",postNotice)
router.get('/get',getNotice)
router.get('/get/:id', getNoticeById)
router.post('/delete',deleteNotice)
router.put('/update',updateNotice)

export default router;