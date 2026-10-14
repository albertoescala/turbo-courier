import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { ALL, SITE, ZONES } from './data'

export const alt = `${SITE.name}: delivery en moto en Lima y Callao desde S/ ${ZONES[0].price}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const title = 'TU ENVÍO LLEGA HOY'
const sub = [`${ALL.length} distritos · Tarifa fija desde S/ ${ZONES[0].price}`, `WhatsApp ${SITE.phone}`]

// Satori no lee woff2: pide a Google Fonts el TTF de Barlow Condensed 900 itálica solo con los glifos usados.
async function barlow() {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,900&text=${encodeURIComponent(title + sub.join('') + SITE.name.toUpperCase())}`,
  ).then(r => r.text())
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
  if (!url) throw new Error('No se pudo cargar Barlow Condensed para la imagen OG')
  return fetch(url).then(r => r.arrayBuffer())
}

export default async function Image() {
  const logo = `data:image/jpeg;base64,${await readFile(join(process.cwd(), 'app/icon.jpeg'), 'base64')}`
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#111', color: '#fff', fontFamily: 'Barlow', fontStyle: 'italic', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: -120, width: 560, height: 630, background: '#d90a14', transform: 'skewX(-14deg)' }} />
        <div style={{ position: 'absolute', top: 0, right: 440, width: 18, height: 630, background: '#ffd400', transform: 'skewX(-14deg)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px', width: 760 }}>
          <div style={{ display: 'flex', fontSize: 44, color: '#fff' }}>
            TURBO <span style={{ color: '#d90a14', marginLeft: 12 }}>COURIER</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 132, lineHeight: 0.9, marginTop: 16 }}>
            <span>TU ENVÍO</span>
            <span style={{ display: 'flex' }}>
              LLEGA <span style={{ color: '#ffd400', marginLeft: 28 }}>HOY</span>
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 32, color: '#ffd400', marginTop: 32 }}>
            {sub.map(l => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
        <img src={logo} width={300} height={300} style={{ position: 'absolute', right: 70, top: 165, borderRadius: 150, border: '8px solid #fff' }} />
      </div>
    ),
    { ...size, fonts: [{ name: 'Barlow', data: await barlow(), style: 'italic', weight: 900 }] },
  )
}
