import express from 'express'
const router = express.Router();

import {postContact} from '../Controller/Contact.controller.js'

router.post("/",postContact)

export default router;