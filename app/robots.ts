import type { MetadataRoute } from 'next'
import { SITE_URL } from './data'

// ponytail: '*' ya incluye a los bots de IA (GPTBot, ClaudeBot, PerplexityBot…); listar uno por uno solo si se quiere bloquear alguno.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml` }
}
