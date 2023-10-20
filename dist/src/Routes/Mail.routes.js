"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const EmailService_Controller_1 = require("../Controllers/EmailService.Controller");
const router = express.Router();
router.post('/send-email', EmailService_Controller_1.sendMail);
exports.default = router;
