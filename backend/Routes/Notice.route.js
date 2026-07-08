import express from 'express'
const router = express.Router();

import { postNotice, getNotice, getNoticeById, deleteNotice, updateNotice } from '../Controller/Notice.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

router.post("/post", isAdmin, postNotice)
router.get('/get', getNotice)
router.get('/get/:id', getNoticeById)
router.delete('/delete', isAdmin, deleteNotice)
router.put('/update', isAdmin, updateNotice)

export default router;
