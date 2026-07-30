import { config as loadEnv } from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import type { NextConfig } from "next"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
loadEnv({ path: path.join(__dirname, "../../.env"), override: false })

const httpBackendInternal =
  process.env.HTTP_BACKEND_INTERNAL_URL?.trim() || "http://127.0.0.1:3001"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${httpBackendInternal}/:path*`,
      },
    ]
  },
}

export default nextConfig
