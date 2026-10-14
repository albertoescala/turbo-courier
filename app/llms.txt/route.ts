import { FAQ, SITE, SITE_URL, STEPS, UPDATED, ZONES } from '../data'

// /llms.txt (llmstxt.org): resumen en markdown para motores de IA, generado desde data.ts.
export const dynamic = 'force-static'

export function GET() {
  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} es un servicio de delivery (courier) en moto para personas y tiendas online en Lima y Callao, Perú. Atención 24 horas por WhatsApp. Tarifas vigentes al ${UPDATED}.

## Tarifas por zona (soles, PEN)

${ZONES.map(z => `### ${z.name}: S/ ${z.price}\n\n${z.districts.map(d => `- ${d}`).join('\n')}`).join('\n\n')}

## Cómo pedir

${STEPS.map(([t, d], i) => `${i + 1}. ${t}: ${d}`).join('\n')}

Cotizador en línea: ${SITE_URL}/#cotizar

## Empresas y tiendas online

- Recojo programado todos los días a la misma hora.
- Contra entrega: cobramos al cliente por ti.
- Reporte diario de entregas por WhatsApp.

## Preguntas frecuentes

${FAQ.map(([q, a]) => `### ${q}\n\n${a}`).join('\n\n')}

## Contacto

- WhatsApp y teléfono: ${SITE.tel}
- WhatsApp directo: ${SITE.wa}
- Web: ${SITE_URL}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
