import path from 'node:path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import payload from 'payload'
import { webpackBundler } from '@payloadcms/bundler-webpack'

import payloadConfig from '../payload.config'

dotenv.config({
  path: process.env.PAYLOAD_ENV_PATH
    ? path.resolve(process.cwd(), process.env.PAYLOAD_ENV_PATH)
    : path.resolve(process.cwd(), '.env'),
})

const PORT = Number(process.env.PORT || process.env.CMS_PORT || 4000)
const HOST = process.env.HOST || '0.0.0.0'
const CMS_BASE_URL = process.env.CMS_BASE_URL || `http://localhost:${PORT}`

const parseAllowedOrigins = () => {
  const configured = process.env.CMS_ALLOWED_ORIGINS
  if (!configured) {
    return [
      'http://localhost:3000',
      CMS_BASE_URL,
    ]
  }

  return configured
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

const allowedOrigins = parseAllowedOrigins()

const app = express()

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

const start = async () => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is required to run the Payload admin server.')
  }

  const baseConfig = payloadConfig as unknown as { plugins?: unknown[] }
  const existingPlugins = Array.isArray(baseConfig.plugins) ? baseConfig.plugins : []
  const configWithBundler = {
    ...(payloadConfig as object),
    plugins: [webpackBundler(), ...existingPlugins],
  }

  await (payload as unknown as { init: (args: any) => Promise<void> }).init({
    config: configWithBundler,
    express: app,
    onInit: () => {
      payload.logger.info(
        `Payload Admin ready at ${CMS_BASE_URL}/admin (API ${CMS_BASE_URL}/api)`
      )
    },
  })

  app.listen(PORT, HOST, () => {
    payload.logger.info(`Payload server listening on ${CMS_BASE_URL}`)
  })
}

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start Payload CMS server:', error)
  process.exit(1)
})
