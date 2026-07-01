import express from 'express'
const router = express.Router();

import {postNotice,getNotice,deleteNotice,updateNotice} from '../Controller/Notice.controller.js'

router.post("/post",postNotice)
router.get('/get',getNotice)
router.post('/delete',deleteNotice)
router.put('/update',updateNotice)

export default router;