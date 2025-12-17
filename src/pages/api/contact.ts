// src/pages/api/contact.ts
export const prerender = false; // Importante: Esta ruta se ejecuta en el servidor (Cloudflare Worker)

import type { APIRoute } from "astro";
import { Resend } from 'resend';
import { z } from 'zod'; // Validación de tipos

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Schema de validación
const ContactSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  hp_check: z.string().max(0), // Honeypot: debe venir vacío
  startTime: z.string().optional()
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const hp_check = formData.get("hp_check"); // Campo oculto anti-spam
    const startTime = formData.get("startTime");
    // 1. Validación de datos y Honeypot
    const result = ContactSchema.safeParse({ email, hp_check, startTime });

    if (!result.success) {
      // Si el honeypot tiene contenido, es un bot. Retornamos éxito falso para engañarlo o error.
      if (hp_check) { 
        return new Response(JSON.stringify({ message: "Received" }), { status: 200 }); 
      }
      return new Response(JSON.stringify({ error: result.error.format() }), { status: 400 });
    }

    const submissionTime = Date.now();
    const loadTime = result.data.startTime ? parseInt(result.data.startTime) : submissionTime;
    
    if (submissionTime - loadTime < 2000) {
        console.warn(`Spam detectado: Envío en ${submissionTime - loadTime}ms`);
        // Retornamos éxito falso para no alertar al bot
        return new Response(JSON.stringify({ message: "Received" }), { status: 200 }); 
    }

    // 2. Enviar Email vía Resend
    const { data, error } = await resend.emails.send({
      from: 'Hikevo Design<contacto@hikevodesign.com>', // CAMBIAR por: contacto@hikevodesign.com una vez verificado
      to: ['hikevodesign@gmail.com'], // Tu correo real donde quieres recibir el lead
      subject: 'Nuevo Lead: Auditoría Web',
      html: `
        <h1>Nuevo Lead Capturado</h1>
        <p><strong>Email:</strong> ${result.data.email}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Origen:</strong> Formulario de Contacto </p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return new Response(JSON.stringify({ error: "Error interno al enviar correo" }), { status: 500 });
    }

    // 3. Respuesta de Éxito
    return new Response(
      JSON.stringify({ message: "¡Recibido! Nos pondremos en contacto pronto." }),
      { status: 200 }
    );

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
};