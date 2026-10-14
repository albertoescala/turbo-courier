'use client'

import { useState, type KeyboardEvent } from 'react'
import { fmt, matches, SITE, split, ZONES, type District } from './data'

export default function Quote() {
  const [q, setQ] = useState('')
  const [pick, setPick] = useState<District | null>(null)
  const [hi, setHi] = useState(0)

  const m = pick ? [] : matches(q)
  const noMatch = !pick && q.trim().length >= 3 && m.length === 0
  const choose = (d: District) => {
    setPick(d)
    setQ(d.name)
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQ('')
      setPick(null)
      return
    }
    if (!m.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHi((hi + 1) % m.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHi((hi - 1 + m.length) % m.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(m[hi] ?? m[0])
    }
  }

  return (
    <div id="cotizar" className="scroll-mt-24 rounded-xl bg-white p-2 text-ink shadow-[0_24px_60px_rgb(0_0_0/.35)]">
      <div className="px-5 pt-6 pb-5">
        <label htmlFor="q" className="mb-2 block text-[15px] font-bold">
          ¿A qué distrito envías?
        </label>
        <div className="relative">
          <input
            id="q"
            role="combobox"
            aria-expanded={m.length > 0}
            aria-controls="q-list"
            aria-autocomplete="list"
            aria-activedescendant={m.length ? `q-opt-${hi}` : undefined}
            autoComplete="off"
            value={q}
            onChange={e => {
              setQ(e.target.value)
              setPick(null)
              setHi(0)
            }}
            onKeyDown={onKey}
            placeholder="Ej. Miraflores, Callao, Lurín…"
            className="h-15 w-full rounded-lg border-2 border-[#d8d8d3] bg-white px-[18px] text-lg font-medium text-ink focus:border-brand focus:outline-none"
          />
          {m.length > 0 && (
            <ul
              id="q-list"
              role="listbox"
              className="absolute top-[66px] right-0 left-0 z-10 rounded-lg border border-line bg-white p-1.5 shadow-[0_16px_40px_rgb(0_0_0/.14)]"
            >
              {m.map((d, i) => {
                const [pre, mid, post] = split(d.name, q)
                return (
                  <li
                    key={d.name}
                    id={`q-opt-${i}`}
                    role="option"
                    aria-selected={i === hi}
                    onMouseDown={e => {
                      e.preventDefault()
                      choose(d)
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 ${i === hi ? 'bg-[#fff6cc]' : ''}`}
                  >
                    <span>
                      {pre}
                      <strong className="text-brand">{mid}</strong>
                      {post}
                    </span>
                    <span className="font-extrabold tabular-nums">{fmt(d.price)}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div aria-live="polite">
          {pick ? (
            <>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border-2 border-night p-5">
                <div>
                  <div className="text-[13px] font-bold tracking-[.06em] text-muted uppercase">{pick.zone}</div>
                  <div className="text-xl font-extrabold">{pick.name}</div>
                </div>
                <div className="headline text-5xl leading-none text-brand">{fmt(pick.price)}</div>
              </div>
              <a
                href={`${SITE.wa}?text=${encodeURIComponent(`Hola, quiero un envío a ${pick.name} (${fmt(pick.price)})`)}`}
                className="mt-3 flex h-14 items-center justify-center gap-2.5 rounded-lg bg-sun text-[17px] font-extrabold text-night transition-transform duration-150 hover:-translate-y-0.5 hover:bg-sun-light"
              >
                Pedir por WhatsApp
              </a>
            </>
          ) : noMatch ? (
            <div role="alert" className="mt-4 rounded-lg border border-brand px-4 py-3.5 text-[15px]">
              <strong>No encontramos ese distrito.</strong> Escríbenos y te confirmamos cobertura.
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {ZONES.map(z => (
                <div key={z.price} className="rounded-lg bg-paper px-1.5 py-3">
                  <div className="text-xl font-extrabold">S/ {z.price}</div>
                  <div className="text-[13px] text-muted">{z.short}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
