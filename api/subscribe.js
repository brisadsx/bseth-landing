/* eslint-disable no-undef */
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
  // ors
  response.setHeader('Access-Control-Allow-Credentials', true);

  response.setHeader('Access-Control-Allow-Origin', 'https://bseth-intro.vercel.app'); 
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    const { email, turnstileToken } = request.body; // Recibimos el token
    
    if (!email || !turnstileToken) {
      return response.status(400).json({ error: 'Faltan datos (email o token de seguridad)' });
    }

    // token verification with Cloudflare Turnstile
    const formData = new URLSearchParams();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
    formData.append('response', turnstileToken);

    const cfVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    
    const cfData = await cfVerify.json();

    if (!cfData.success) {
      return response.status(403).json({ error: 'Validación de seguridad fallida (Bot detectado)' });
    }

    // si es válido, guardamos el email en Resend
    const data = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    return response.status(200).json({ message: 'Email guardado exitosamente', data });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: error.message });
  }
}