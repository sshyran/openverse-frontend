import { render, screen } from '@testing-library/vue'

import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import messages from '../../../../../src/locales/en.json'

import VHeader from '~/components/VHeader/VHeader.vue'
import { useSearchRoute } from '~/composables/use-search-route'
import { isMinScreen, useReducedMotion } from '@/composables/use-media-query'
import { ref } from '@nuxtjs/composition-api'
/**
 * For some reason I need to mock the implementation
 * of this mock in each test, or it doesn't work.
 *
 * In each implementation I'm faking returning a ref
 * with `mockImplementation(() => ({value: true}))`
 * that may be related.
 */
jest.mock('~/composables/use-search-route', () => ({
  useSearchRoute: jest.fn(),
}))
jest.mock('~/composables/use-media-query', () => ({
  isMinScreen: jest.fn(),
  useReducedMotion: jest.fn(),
}))

describe('VHeader', () => {
  let options = {}
  let storeMock
  let localVue
  let appliedFilters = []
  let props = {}

  const i18n = new VueI18n({
    locale: 'en',
    localeProperties: {
      dir: 'ltr',
    },
    fallbackLocale: 'en',
    messages: { en: messages },
  })
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueI18n)
    storeMock = new Vuex.Store({
      modules: {
        media: {
          namespaced: true,
          getters: {
            fetchState: () => ({
              isFetching: false,
            }),
          },
        },
        search: {
          namespaced: true,
          state: { searchType: 'image' },
          getters: {
            isAnyFilterApplied: () => appliedFilters.length > 0,
            appliedFilterTags: () => appliedFilters,
          },
        },
      },
    })
    options = {
      localVue,
      propsData: props,
      mocks: {
        $nuxt: { context: { store: storeMock, i18n } },
      },
      stubs: { NuxtLink: true },
    }
  })
  describe('Non-search header', () => {
    it('shows logo', () => {
      useSearchRoute.mockImplementation(() => ({ value: false }))
      isMinScreen.mockImplementation(() => ref(true))

      render(VHeader, options)

      const logo = screen.getByTestId('logo-loader')

      expect(logo).toBeVisible()
    })
    it('animates the logo when fetching', () => {
      useSearchRoute.mockImplementation(() => ({ value: false }))
      isMinScreen.mockImplementation(() => ref(true))

      // todo: mock isFetching: true

      render(VHeader, options)

      const logo = screen.getByTestId('logo-loader')
      // todo: test logo is animating
      expect(logo).toBeVisible()
    })
  })
  describe('Search header', () => {
    describe('Above the medium breakpoint', () => {
      it('shows page menu', async () => {
        useSearchRoute.mockImplementation(() => ({ isSearch: true }))
        isMinScreen.mockImplementation(() => ref(true))
        useReducedMotion.mockImplementation(() => ({ value: true }))

        render(VHeader, options)

        const menuButton = await screen.findByLabelText(/menu/i)

        expect(menuButton).toBeVisible()
      })
      it('shows content switcher button', async () => {
        useSearchRoute.mockImplementation(() => ({ isSearch: true }))
        isMinScreen.mockImplementation(() => ref(true))
        useReducedMotion.mockImplementation(() => ({ value: true }))

        render(VHeader, options)
        // Removing this call makes the tests fail
        await screen.getByText(/images/i)

        expect(await screen.getByText(/images/i)).toBeVisible()
      })
    })
    describe('below the medium breakpoint', () => {
      it('does not show page menu', async () => {
        useSearchRoute.mockImplementation(() => ({ isSearch: true }))
        isMinScreen.mockImplementation(() => ref(false))
        useReducedMotion.mockImplementation(() => ({ value: true }))

        render(VHeader, options)

        const menuButton = screen.queryByLabelText(/menu/i)

        expect(menuButton).not.toBeInTheDocument()
      })
      it('shows content switcher button', async () => {
        useSearchRoute.mockImplementation(() => ({ isSearch: true }))
        isMinScreen.mockImplementation(() => ref(false))
        useReducedMotion.mockImplementation(() => ({ value: true }))

        render(VHeader, options)
        await screen.getByText(/images/i)

        expect(await screen.getByText(/images/i)).toBeVisible()
      })
    })
  })
})
