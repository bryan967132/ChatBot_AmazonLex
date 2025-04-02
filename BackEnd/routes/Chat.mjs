import express from 'express';
import { chatWithLex } from '../controllers/Chat.mjs';

const router = express.Router();

router.post('/chat', chatWithLex);

export default router;