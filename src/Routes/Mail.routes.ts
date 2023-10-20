const express = require('express');
const app = express();
import { 
    sendMail
 } from "../Controllers/EmailService.Controller";

 const router = express.Router();

router.post('/send-email', sendMail);

export default router;