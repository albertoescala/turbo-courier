import type { MetadataRoute } from 'next'
import { SITE_URL, UPDATED } from './data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: UPDATED }]
}
