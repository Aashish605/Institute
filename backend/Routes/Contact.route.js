import express from 'express'
const router = express.Router();

import { postContact, getContacts } from '../Controller/Contact.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

router.post("/", postContact)
router.get("/", isAdmin, getContacts)

export default router;
