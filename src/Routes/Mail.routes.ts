const express = require('express');
const app = express();
import { corsMiddleware } from '../middleware/cors.middleware';
import { 
    sendMail
 } from "../Controllers/EmailService.Controller";

 const router = express.Router();

router.post('/send-email',corsMiddleware, sendMail);

export default router;