<template>
  <div
    class="sticky top-0 flex py-4 px-6 md:px-7 align-center justify-between z-40 w-full bg-white"
    :class="{
      'border-b border-dark-charcoal-20':
        isHeaderScrolled || currentMenu !== null,
    }"
  >
    <NuxtLink to="/">
      <VLogoLoader :status="isFetching ? 'loading' : 'idle'" />
    </NuxtLink>
    <VContentSwitcher
      v-if="isSearch"
      :current-menu="currentMenu"
      @close-menu="closeMenu"
      @open-menu="openMenu('content-switcher')"
    />
    <VHeaderFilter
      v-if="isSearch"
      :hide-buttons="hideButtons"
      @close="closeMenu"
      @open="openMenu('filters')"
    />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  provide,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

import { isMinScreen } from '~/composables/use-media-query'
import { useSearchRoute } from '~/composables/use-search-route'
import { useWindowScroll } from '~/composables/use-window-scroll'

import closeIcon from '~/assets/icons/close.svg'

import VLogoLoader from '~/components/VLogoLoader/VLogoLoader.vue'
import VHeaderFilter from '~/components/VHeader/VHeaderFilter.vue'
import VContentSwitcher from '~/components/VHeader/VContentSwitcher'

const VHeader = defineComponent({
  name: 'VHeader',
  components: {
    VContentSwitcher,
    VHeaderFilter,
    VLogoLoader,
  },
  setup() {
    console.log('VHeader setup')
    const { store } = useContext()
    const { isSearch } = useSearchRoute()
    const { isHeaderScrolled } = useWindowScroll()
    const isMdScreen = isMinScreen('md')
    provide('isHeaderScrolled', isHeaderScrolled)
    provide('isMdScreen', isMdScreen)

    /** @type {import('@nuxtjs/composition-api').Ref<null|'filters'|'content-switcher'>} */
    const currentMenu = ref(null)

    /**
     *
     * @param {'filters'|'content-switcher'} menu
     */
    const openMenu = (menu) => {
      console.log('opening menu: ' + menu)
      currentMenu.value = menu
    }

    const closeMenu = () => {
      currentMenu.value = null
    }

    const toggleMenu = (menu) => {
      console.log('toggling menu', menu)
      if (currentMenu.value === menu) {
        closeMenu()
      } else {
        openMenu(menu)
      }
    }
    /**  @type {import('@nuxtjs/composition-api').ComputedRef<boolean>} */
    const isFetching = computed(() => {
      return store.getters['media/fetchState'].isFetching
    })

    const hideButtons = computed(() => currentMenu.value !== null)
    onMounted(() => {
      console.log('VHeader mounted')
    })
    return {
      closeIcon,
      currentMenu,
      isFetching,
      isHeaderScrolled,
      isMdScreen,
      isSearch,

      closeMenu,
      openMenu,
      toggleMenu,
      hideButtons,
    }
  },
})

export default VHeader
</script>
