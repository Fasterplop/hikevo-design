// src/pages/api/contact.ts
export const prerender = false; // Importante: Esta ruta se ejecuta en el servidor

import type { APIRoute } from "astro";
import { Resend } from 'resend';
import { z } from 'zod';

// Schema de validación
const ContactSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  hp_check: z.string().max(0), // Honeypot: debe venir vacío
  startTime: z.string().optional()
});

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Inicializamos Resend DENTRO del try para capturar si falta la API Key
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    const formData = await request.formData();
    const email = formData.get("email");
    const hp_check = formData.get("hp_check");
    const startTime = formData.get("startTime");

    // 2. Validación de datos y Honeypot
    const result = ContactSchema.safeParse({ email, hp_check, startTime });

    if (!result.success) {
      // Si el honeypot tiene contenido, es un bot.
      if (hp_check) { 
        return new Response(JSON.stringify({ message: "Received" }), { status: 200 }); 
      }
      return new Response(JSON.stringify({ error: result.error.format() }), { status: 400 });
    }

    // 3. Validación Anti-Spam por tiempo (opcional)
    const submissionTime = Date.now();
    const loadTime = result.data.startTime ? parseInt(result.data.startTime) : submissionTime;
    
    if (submissionTime - loadTime < 1000 && submissionTime - loadTime > 0) {
        console.warn(`Posible Spam (muy rápido): ${submissionTime - loadTime}ms`);
    }

    // 4. Enviar Email vía Resend
    const contactEmail = import.meta.env.CONTACT_EMAIL || 'hikevodesign@gmail.com';
    
    /* IMPORTANTE: 
       Si tu dominio 'hikevodesign.com' NO está verificado en Resend (tienes los DNS configurados),
       cambia el 'from' temporalmente a: 'onboarding@resend.dev'
       para que funcione la prueba.
    */
    const { data, error } = await resend.emails.send({
      from: 'Hikevo Design <contacto@hikevodesign.com>', 
      to: [contactEmail], 
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
      // Retornamos el error específico de Resend (ej: dominio no verificado)
      return new Response(JSON.stringify({ 
        error: "Error de Resend: " + error.message 
      }), { status: 500 });
    }

    // 5. Respuesta de Éxito
    return new Response(
      JSON.stringify({ message: "¡Recibido! Nos pondremos en contacto pronto." }),
      { status: 200 }
    );

  } catch (e: any) {
    console.error("Error completo:", e);
    // RESPUESTA DE DIAGNÓSTICO:
    // Esto enviará al frontend la causa exacta del error (ej: Missing API Key)
    return new Response(JSON.stringify({ 
      error: e.message || "Error desconocido en el servidor",
      type: e.name
    }), { status: 500 });
  }
};