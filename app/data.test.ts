import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ALL, matches, split, updatedLabel } from './data.ts'

test('busca sin tildes ni mayúsculas', () => assert.deepEqual(matches(' RIMAC ').map(d => d.name), ['Rímac']))
test('menos de 2 letras no busca', () => assert.deepEqual(matches(' m '), []))
test('máximo 6 sugerencias', () => assert.equal(matches('an').length, 6))
test('resalta respetando tildes', () => assert.deepEqual(split('Lurín', 'RIN'), ['Lu', 'rín', '']))
test('43 distritos con su zona', () => {
  assert.equal(ALL.length, 43)
  assert.equal(ALL.find(d => d.name === 'Callao')?.price, 12)
})
test('fecha legible', () => assert.equal(updatedLabel, 'octubre de 2026'))
