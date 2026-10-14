// Fuente única de datos: página, cotizador, JSON-LD y llms.txt leen de aquí.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const SITE = {
  name: 'Turbo Courier',
  phone: '934 567 996',
  tel: '+51934567996',
  wa: 'https://wa.me/51934567996',
  title: 'Turbo Courier | Delivery en moto en Lima y Callao desde S/ 10',
  description:
    'Envíos en moto el mismo día a 43 distritos de Lima y Callao. Tarifa fija por distrito desde S/ 10. Cotiza en línea y pide por WhatsApp, 24 horas.',
}

// Última revisión de tarifas (YYYY-MM-DD): se muestra en la página, sitemap y llms.txt.
export const UPDATED = '2026-10-11'

// ponytail: vacío hasta tener URLs reales; alimenta el footer y `sameAs` del JSON-LD.
export const SOCIAL: { name: string; url: string }[] = []

export type Zone = { price: number; name: string; short: string; districts: string[] }

export const ZONES: Zone[] = [
  {
    price: 10,
    name: 'Zona 1 · Lima centro',
    short: 'Lima centro',
    districts: ['Cercado de Lima', 'Breña', 'Pueblo Libre', 'El Agustino', 'Jesús María', 'Lince', 'Magdalena del Mar', 'Rímac', 'San Borja', 'San Luis', 'Santiago de Surco', 'Surquillo', 'Ate - Vitarte', 'Miraflores', 'San Isidro', 'San Miguel', 'Independencia', 'Comas (no Collique)', 'Barranco', 'La Victoria', 'Santa Anita', 'San Juan de Lurigancho'],
  },
  {
    price: 12,
    name: 'Zona 2 · Lima sur, norte y Callao',
    short: 'Lima sur y norte',
    districts: ['Villa María del Triunfo', 'Villa El Salvador', 'Comas (Collique)', 'La Molina (Musa)', 'San Martín de Porres', 'Los Olivos', 'Chorrillos', 'San Juan de Miraflores', 'Callao', 'Ate - Santa Clara'],
  },
  {
    price: 15,
    name: 'Zona 3 · Periferia',
    short: 'Periferia',
    districts: ['Puente Piedra', 'Carabayllo', 'Huaycán (parte alta)', 'Jicamarca (anexo 8)', 'Manchay', 'Lurigancho - Chosica', 'Ventanilla', 'Lurín', 'Callao (Márquez)', 'Ate - Huaycán', 'Huachipa'],
  },
]

export type District = { name: string; price: number; zone: string }

export const ALL: District[] = ZONES.flatMap(z => z.districts.map(name => ({ name, price: z.price, zone: z.name })))

export const STEPS: [string, string][] = [
  ['Cotiza', 'Busca el distrito de destino y mira tu tarifa.'],
  ['Escríbenos', 'Envía la dirección de recojo y entrega por WhatsApp.'],
  ['Recogemos y entregamos', 'Un motorizado pasa por tu paquete y te avisa al entregar.'],
]

export const FAQ: [string, string][] = [
  ['¿Cuánto demora la entrega?', 'La mayoría de pedidos se entregan el mismo día si nos escribes antes de la 1:00 p. m.'],
  ['¿Qué no puedo enviar?', 'Dinero en efectivo, armas, sustancias ilegales, animales vivos ni productos inflamables.'],
  ['¿Cómo debo embalar mi paquete?', 'En caja o bolsa cerrada, con el nombre y teléfono del destinatario visibles.'],
  ['¿Hacen cobro contra entrega?', 'Sí. Cobramos al destinatario y te transferimos el monto el mismo día.'],
  ['¿Qué pasa si no encuentran al destinatario?', 'Te llamamos al momento. Puedes reprogramar la entrega o pedir la devolución.'],
  ['¿Puedo cambiar la dirección de entrega?', 'Sí, mientras el motorizado no haya salido a reparto. Avísanos por WhatsApp.'],
]

export const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export const fmt = (n: number) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(n)

// "octubre de 2026"
export const updatedLabel = new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(UPDATED))

export function matches(q: string): District[] {
  const k = norm(q.trim())
  if (k.length < 2) return []
  return ALL.filter(d => norm(d.name).includes(k)).slice(0, 6)
}

// Parte el nombre en [antes, coincidencia, después] para resaltar lo buscado.
export function split(name: string, q: string): [string, string, string] {
  const k = norm(q.trim())
  const i = norm(name).indexOf(k)
  return [name.slice(0, i), name.slice(i, i + k.length), name.slice(i + k.length)]
}
