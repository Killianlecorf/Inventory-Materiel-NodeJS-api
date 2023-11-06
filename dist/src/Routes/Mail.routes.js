"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const cors_middleware_1 = require("../middleware/cors.middleware");
const EmailService_Controller_1 = require("../Controllers/EmailService.Controller");
const router = express.Router();
router.post('/send-email', cors_middleware_1.corsMiddleware, EmailService_Controller_1.sendMail);
exports.default = router;
