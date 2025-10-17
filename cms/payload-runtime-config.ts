import baseConfig from '../payload.config.ts'
import { webpackBundler } from '@payloadcms/bundler-webpack'

const basePlugins = Array.isArray((baseConfig as unknown as { plugins?: unknown[] }).plugins)
  ? [...((baseConfig as unknown as { plugins?: unknown[] }).plugins!)]
  : []

const bundlerPlugin = webpackBundler()

const runtimeConfig = {
  ...baseConfig,
  plugins: [bundlerPlugin, ...basePlugins],
}

export default runtimeConfig
