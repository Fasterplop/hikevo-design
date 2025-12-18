// src/pages/api/contact.ts
export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from 'resend';
import { z } from 'zod';

const ContactSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  hp_check: z.string().max(0),
  startTime: z.string().optional()
});

// Agregamos 'locals' a los argumentos de la función
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. OBTENCIÓN ROBUSTA DE LA API KEY
    // Intentamos obtenerla del Runtime de Cloudflare (Producción)
    // Si no, caemos al entorno estándar (Desarrollo/Build)
    const RESEND_API_KEY = (locals as any).runtime?.env?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

    // Validación crítica antes de continuar
    if (!RESEND_API_KEY) {
      throw new Error("La variable RESEND_API_KEY no está configurada o no es accesible.");
    }

    const resend = new Resend(RESEND_API_KEY);

    const formData = await request.formData();
    const email = formData.get("email");
    const hp_check = formData.get("hp_check");
    const startTime = formData.get("startTime");

    const result = ContactSchema.safeParse({ email, hp_check, startTime });

    if (!result.success) {
      if (hp_check) { 
        return new Response(JSON.stringify({ message: "Received" }), { status: 200 }); 
      }
      return new Response(JSON.stringify({ error: result.error.format() }), { status: 400 });
    }

    const submissionTime = Date.now();
    const loadTime = result.data.startTime ? parseInt(result.data.startTime) : submissionTime;
    
    if (submissionTime - loadTime < 1000 && submissionTime - loadTime > 0) {
        console.warn(`Posible Spam (muy rápido): ${submissionTime - loadTime}ms`);
    }

    // Obtenemos el email de destino igual que la API Key
    const ENV_CONTACT_EMAIL = (locals as any).runtime?.env?.CONTACT_EMAIL || import.meta.env.CONTACT_EMAIL;
    const contactEmail = ENV_CONTACT_EMAIL || 'hikevodesign@gmail.com';

    // Verificación de dominio para Resend (Evita errores de "From" inválido)
    // Si estás en pruebas y no has verificado el dominio, usa 'onboarding@resend.dev'
    const fromEmail = 'Hikevo Design <contacto@hikevodesign.com>'; 
    
    const { data, error } = await resend.emails.send({
      from: fromEmail, 
      to: [contactEmail], 
      subject: 'Nuevo Lead: Auditoría Web',
      html: `
        <h1>Nuevo Lead Capturado</h1>
        <p><strong>Email:</strong> ${result.data.email}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Origen:</strong> Formulario de Contacto</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return new Response(JSON.stringify({ 
        error: "Error de Resend: " + error.message 
      }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ message: "¡Recibido! Nos pondremos en contacto pronto." }),
      { status: 200 }
    );

  } catch (e: any) {
    console.error("Error completo:", e);
    return new Response(JSON.stringify({ 
      error: e.message || "Error desconocido en el servidor",
      type: e.name
    }), { status: 500 });
  }
};