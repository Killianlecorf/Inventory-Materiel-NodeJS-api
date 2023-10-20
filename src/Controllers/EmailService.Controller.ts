import { Request, Response } from 'express';
import { sendEmail } from '../Services/EmailService';
import { isValidEmail } from '../Utils/ValidationEmail';

export const sendMail = async (req: Request, res: Response) => {
  const { to, subject, text } = req.body;

  try {
    if (!to || !subject || !text) {
      throw new Error('Les champs "Email", "Object" et "Corps du mail" sont obligatoires.');
    }

    if (!isValidEmail(to)) {
      throw new Error('L\'adresse e-mail du destinataire est invalide.');
    }

    await sendEmail({ to, subject, text });
    res.status(200).json({ message: 'E-mail envoyé avec succès' });
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    res.status(400).json({ error: error.message });
  }
};
