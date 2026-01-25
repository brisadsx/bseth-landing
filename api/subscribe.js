/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {

  console.log("------------------------------------------------");
  console.log("🔍 DIAGNÓSTICO DE VARIABLES:");
  console.log("API KEY:", process.env.RESEND_API_KEY ? "✅ Cargada correctamente" : "❌ FALTA (Es undefined)");
  console.log("AUDIENCE ID:", process.env.RESEND_AUDIENCE_ID ? "✅ Cargada correctamente" : "❌ FALTA (Es undefined)");
  console.log("------------------------------------------------");


  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    const { email } = request.body;
    
    if (!email) {
      return response.status(400).json({ error: 'Falta el email' });
    }

    const data = await resend.contacts.create({
      email: email,
      firstName: '',
      unsubscribed: false,
      audienceId:process.env.RESEND_AUDIENCE_ID,
    });

    return response.status(200).json({ message: 'Email guardado', data });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: error.message });
  }
}