import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Landing de una página con ~6 KB de Tailwind: inlinear el CSS quita la petición que bloquea el render (mejora FCP/LCP en móvil).
  experimental: { inlineCss: true },
}

export default nextConfig
