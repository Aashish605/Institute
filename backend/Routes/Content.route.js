import express from 'express';
const router = express.Router();

import { getContent, updateContent } from '../Controller/Content.controller.js';
import { isAdmin } from '../Middleware/adminAuth.js';

router.get("/", getContent);
router.put("/", isAdmin, updateContent);

export default router;
