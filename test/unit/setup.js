import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { env } from '~/utils/env'
import { config } from '@vue/test-utils'

// Attach nuxt config to process
for (const [key, value] of Object.entries(env)) {
  process.env[key] = value
}

// Make sure api analytics are enabled so we can test them!
process.env.enableInternalAnalytics = true

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(VueI18n)

config.mocks.$t = (key) => key
config.mocks.localePath = (i) => i
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
  }
