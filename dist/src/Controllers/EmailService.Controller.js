"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const EmailService_1 = require("../Services/EmailService");
const ValidationEmail_1 = require("../Utils/ValidationEmail");
const sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, text } = req.body;
    try {
        if (!to || !subject || !text) {
            throw new Error('Les champs "Email", "Object" et "Corps du mail" sont obligatoires.');
        }
        if (!(0, ValidationEmail_1.isValidEmail)(to)) {
            throw new Error('L\'adresse e-mail du destinataire est invalide.');
        }
        yield (0, EmailService_1.sendEmail)({ to, subject, text });
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
    }
    catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(400).json({ error: error.message });
    }
});
exports.sendMail = sendMail;
