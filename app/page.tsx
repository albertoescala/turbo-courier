import Image from 'next/image'
import { ALL, FAQ, SITE, SITE_URL, SOCIAL, STEPS, UPDATED, updatedLabel, ZONES } from './data'
import Quote from './quote'

const NAV = [
  ['#tarifas', 'Tarifas'],
  ['#como', 'Cómo funciona'],
  ['#empresas', 'Empresas'],
  ['#faq', 'Preguntas'],
]

const icon = (d: React.ReactNode) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none">
    {d}
  </svg>
)

const BENEFITS: [React.ReactNode, string, string][] = [
  [icon(<><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2M9 2h6" /></>), 'Rápido', 'Entregas en el menor tiempo posible.'],
  [icon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>), 'Seguro', 'Tus envíos en manos seguras y confiables.'],
  [icon(<path d="M7 10v12M15 5.9 14 10h5.8a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.4 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z" />), 'Confiable', 'Comprometidos con la puntualidad y el buen servicio.'],
  [icon(<><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></>), 'Envío flex', 'Nos adaptamos a tus necesidades de entrega.'],
]

// Borde y color del número de cada paso.
const STEP_TONES = ['border-brand text-brand', 'border-sun text-night', 'border-night text-night']

const h2 = 'headline text-[clamp(44px,6vw,64px)] leading-[.95] uppercase'
const footLink = 'text-[#bdbdbd] hover:text-sun'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, '\\u003c') }} />

      {/* Barra superior */}
      <div className="bg-night text-[13px] text-[#e8e8e8]">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-[#22c55e]" />
            Atención 24 horas · Lima y Callao
          </div>
          <div className="flex items-center gap-5">
            <a href="#faq">Ayuda</a>
            <a href="#tarifas">Cobertura</a>
            <a href={SITE.wa} className="font-bold text-sun">
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#e6e6e2] bg-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-5 py-2.5">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Turbo Courier, inicio">
            <Image src="/logo.jpeg" alt="" width={52} height={52} loading="eager" className="size-[52px] rounded-full object-cover" />
            <span className="headline text-2xl leading-none tracking-[.01em] uppercase">
              Turbo <span className="text-brand">Courier</span>
            </span>
          </a>
          <nav aria-label="Principal" className="flex flex-wrap gap-7 text-[15px] font-semibold">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="hover:text-brand">
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#cotizar"
            className="rounded-lg bg-brand px-5 py-2.5 text-[15px] font-bold text-white transition duration-150 ease-[cubic-bezier(.2,0,0,1)] hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            Cotizar envío
          </a>
        </div>
      </header>

      <main id="inicio" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-clip bg-night text-white">
          <div aria-hidden="true" className="absolute top-0 -right-[10%] h-full w-[55%] bg-brand [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]" />
          <div aria-hidden="true" className="absolute top-0 -right-[10%] h-full w-[58%] bg-sun [clip-path:polygon(20%_0,22%_0,2%_100%,0_100%)]" />
          <div className="wrap relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-12 pt-20 pb-[88px]">
            <div>
              <p className="inline-flex rounded-md bg-sun px-3 py-1.5 text-[13px] font-extrabold tracking-[.06em] text-night uppercase">
                Delivery en moto · Lima y Callao
              </p>
              <h1 className="headline my-5 text-[clamp(56px,8vw,96px)] leading-[.92] tracking-[-.01em] text-balance uppercase">
                Tu envío llega <span className="text-sun">hoy</span>
              </h1>
              <p className="mb-8 max-w-[30ch] text-[19px] text-[#d6d6d6]">Tarifa fija por distrito desde S/ {ZONES[0].price}. Sin sorpresas.</p>
              <div className="flex flex-wrap gap-8">
                {[
                  [String(ALL.length), 'distritos cubiertos'],
                  ['24 h', 'atención por WhatsApp'],
                  [`S/ ${ZONES[0].price}`, 'tarifa desde'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="headline text-[44px] leading-none text-sun">{v}</div>
                    <div className="text-sm text-[#cfcfcf]">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <Quote />
          </div>
        </section>

        {/* Beneficios */}
        <section aria-label="Por qué Turbo Courier" className="bg-sun">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 py-7">
            {BENEFITS.map(([svg, title, text]) => (
              <div key={title} className="flex items-start gap-3.5">
                {svg}
                <div>
                  <div className="font-extrabold">{title}</div>
                  <div className="text-[15px] text-[#2a2a2a]">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tarifario */}
        <section id="tarifas" className="scroll-mt-20">
          <div className="wrap py-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-extrabold tracking-[.08em] text-brand uppercase">Tarifario y zona de cobertura</p>
                <h2 className={`${h2} mt-2`}>Un precio fijo por distrito</h2>
              </div>
              <a
                href="/tarifario.jpeg"
                download="tarifario-turbo-courier.jpeg"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-night px-[18px] py-2.5 font-bold text-night hover:bg-night hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14" />
                </svg>
                Descargar tarifario
              </a>
            </div>

            <div className="grid gap-6">
              {ZONES.map((z, i) => {
                const sun = i % 2 === 1
                return (
                  <article
                    key={z.price}
                    className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] overflow-hidden rounded-xl border-2 bg-white ${sun ? 'border-sun' : 'border-brand'}`}
                  >
                    <div className={`flex flex-col justify-between gap-4 p-7 ${sun ? 'bg-sun text-night' : 'bg-brand text-white'}`}>
                      <h3 className="text-sm font-bold tracking-[.08em] uppercase">{z.name}</h3>
                      <div>
                        <div className={`headline text-[80px] leading-[.9] ${sun ? 'text-night' : 'text-sun'}`}>S/ {z.price}</div>
                        <div className="mt-2 inline-block rounded bg-night px-2.5 py-1 text-[13px] font-extrabold tracking-[.08em] text-white">SOLES</div>
                      </div>
                      <p className="text-sm">{z.districts.length} distritos</p>
                    </div>
                    <ul className="col-span-2 columns-[3_180px] gap-x-6 p-7 text-[15px] font-medium">
                      {z.districts.map(d => (
                        <li key={d} className="py-1">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
            <p className="mt-5 text-sm text-muted">
              ¿Tu distrito no aparece?{' '}
              <a href={SITE.wa} className="text-brand underline underline-offset-2 hover:text-[#a30008]">
                Escríbenos
              </a>{' '}
              y te cotizamos. Tarifas vigentes, actualizadas en <time dateTime={UPDATED}>{updatedLabel}</time>.
            </p>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como" className="scroll-mt-20 bg-white">
          <div className="wrap py-24">
            <h2 className={`${h2} mb-12`}>Pide en 3 pasos</h2>
            <ol className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
              {STEPS.map(([title, text], i) => (
                <li key={title} className={`border-t-4 pt-5 ${STEP_TONES[i]}`}>
                  <div className="headline text-[56px] leading-none">0{i + 1}</div>
                  <h3 className="mt-2 mb-1 text-xl font-extrabold text-ink">{title}</h3>
                  <p className="text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Empresas */}
        <section id="empresas" className="scroll-mt-20 bg-brand text-white">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-12 py-24">
            <div>
              <h2 className={`${h2} mb-5`}>
                ¿Vendes online? <span className="text-sun">Te llevamos los pedidos.</span>
              </h2>
              <p className="mb-7 max-w-[44ch] text-lg">Recojo diario en tu tienda o almacén y entregas en toda Lima con la misma tarifa.</p>
              <div className="flex flex-wrap gap-3">
                <a href={`${SITE.wa}?text=${encodeURIComponent('Hola, quiero una cuenta empresa')}`} className="rounded-lg bg-sun px-6 py-3.5 font-extrabold text-night hover:bg-sun-light">
                  Crear cuenta empresa
                </a>
                <a href={`tel:${SITE.tel}`} className="rounded-lg border-2 border-white px-[22px] py-3 font-bold hover:bg-white hover:text-brand">
                  Hablar con un asesor
                </a>
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                ['Recojo programado', ' todos los días a la misma hora.'],
                ['Contra entrega', ': cobramos al cliente por ti.'],
                ['Reporte diario', ' de entregas por WhatsApp.'],
              ].map(([b, rest]) => (
                <li key={b} className="flex items-center gap-3.5 rounded-xl bg-brand-dark px-5 py-[18px]">
                  <span aria-hidden="true" className="text-xl font-black text-sun">
                    ✓
                  </span>
                  <span>
                    <strong>{b}</strong>
                    {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ: acordeón nativo, <details name> deja uno abierto a la vez sin JS */}
        <section id="faq" className="scroll-mt-20">
          <div className="mx-auto max-w-[780px] px-6 py-24">
            <h2 className={`${h2} mb-8`}>Preguntas frecuentes</h2>
            <div className="grid gap-3">
              {FAQ.map(([q, a], i) => (
                <details key={q} name="faq" open={i === 0} className="group rounded-xl border border-line bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[22px] py-5 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                    <h3>{q}</h3>
                    <span
                      aria-hidden="true"
                      className="grid size-7 flex-none place-items-center rounded-full bg-sun text-xl font-bold text-night transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-[22px] pb-5 text-[#3d3d3d]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8 overflow-clip rounded-2xl bg-night px-10 py-14 text-white">
            <div aria-hidden="true" className="absolute inset-y-0 -right-10 w-[180px] bg-brand [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)]" />
            <div className="relative">
              <p className="text-sm font-bold tracking-[.08em] text-sun uppercase">Atención 24 horas</p>
              <a href={`tel:${SITE.tel}`} className="headline block text-[clamp(48px,7vw,72px)] leading-none">
                {SITE.phone}
              </a>
            </div>
            <a
              href={SITE.wa}
              className="relative inline-flex items-center gap-2.5 rounded-lg bg-[#25d366] px-7 py-4 text-lg font-extrabold text-[#0b2e17] hover:bg-[#3be07a]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 7.7 19.4z" />
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b0b0b] text-sm text-[#bdbdbd]">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 pt-14 pb-6">
          <div>
            <Image src="/logo.jpeg" alt="Turbo Courier" width={72} height={72} className="mb-3 size-[72px] rounded-full object-cover" />
            <p>Delivery en moto para personas y tiendas online en Lima y Callao.</p>
          </div>
          <div>
            <div className="mb-2.5 font-extrabold text-white">Envíos</div>
            <div className="grid gap-1.5">
              <a href="#tarifas" className={footLink}>Tarifas</a>
              <a href="#cotizar" className={footLink}>Cotizar</a>
              <a href="#como" className={footLink}>Cómo funciona</a>
            </div>
          </div>
          <div>
            <div className="mb-2.5 font-extrabold text-white">Ayuda</div>
            <div className="grid gap-1.5">
              <a href="#faq" className={footLink}>Preguntas frecuentes</a>
              <a href={SITE.wa} className={footLink}>Incidencias y reclamos</a>
              <a href="#faq" className={footLink}>Artículos prohibidos</a>
            </div>
          </div>
          {SOCIAL.length > 0 && (
            <div>
              <div className="mb-2.5 font-extrabold text-white">Síguenos</div>
              <div className="grid gap-1.5">
                {SOCIAL.map(s => (
                  <a key={s.url} href={s.url} rel="me noopener" className={footLink}>
                    {s.name} · Turbo Courier
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="wrap flex flex-wrap justify-between gap-4 border-t border-[#222] py-5 text-[13px]">
          <span>© {UPDATED.slice(0, 4)} Turbo Courier</span>
          {/* TODO: páginas pendientes; el Libro de Reclamaciones virtual es obligatorio en Perú. */}
          <span className="flex gap-4">
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Libro de reclamaciones</a>
          </span>
        </div>
      </footer>
    </div>
  )
}

function jsonLd() {
  const business = `${SITE_URL}/#business`
  const place = (name: string) => ({ '@type': 'Place', name: `${name}, Lima, Perú` })
  const prices = ZONES.map(z => z.price)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': business,
        name: SITE.name,
        description: SITE.description,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.jpeg`,
        image: `${SITE_URL}/logo.jpeg`,
        telephone: SITE.tel,
        priceRange: `S/ ${Math.min(...prices)} – S/ ${Math.max(...prices)}`,
        currenciesAccepted: 'PEN',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        areaServed: [
          { '@type': 'City', name: 'Lima' },
          { '@type': 'City', name: 'Callao' },
        ],
        ...(SOCIAL.length > 0 && { sameAs: SOCIAL.map(s => s.url) }),
      },
      {
        '@type': 'Service',
        name: 'Delivery en moto en Lima y Callao',
        serviceType: 'Delivery en moto',
        provider: { '@id': business },
        offers: ZONES.map(z => ({
          '@type': 'Offer',
          name: `Envío ${z.name}`,
          price: z.price,
          priceCurrency: 'PEN',
          areaServed: z.districts.map(place),
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        inLanguage: 'es-PE',
        publisher: { '@id': business },
      },
    ],
  }
}
