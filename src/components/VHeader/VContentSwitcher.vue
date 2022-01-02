<template>
  <Component
    :is="switcherComponent"
    ref="menuModalRef"
    :modal-visible="currentMenu === 'content-switcher'"
    @open="openMenu"
    @close="closeMenu"
  >
    <template #page-switcher-button="{ a11yProps }">
      <VPageMenuButton :a11y-props="a11yProps" />
    </template>
    <template #page-switcher-content>
      <VPageMenuPopover />
    </template>
    <template #content-switcher-button="{ a11yProps, visible }">
      <VContentSwitcherButton
        v-if="!visible || currentMenu === null"
        :icon="icons[content.activeType.value]"
        :active-item="content.activeType.value"
        :a11y-props="a11yProps"
        @click="handleClick"
      />
    </template>
    <template #content-switcher-content>
      <VContentTypePopover
        :content="content"
        :icons="icons"
        :is-md-screen="isMdScreen"
        @click="handleContentTypeClick"
      />
    </template>
  </Component>
</template>
<script>
import { computed, inject, onMounted } from '@nuxtjs/composition-api'

import VContentSwitcherButton from '~/components/VHeader/VContentSwitcherButton.vue'
import VContentTypePopover from '~/components/VHeader/VContentTypePopover.vue'
import VPageMenuButton from '~/components/VHeader/VPageMenuButton.vue'
import VPageMenuPopover from '~/components/VHeader/VPageMenuPopover.vue'
import VDesktopSwitcher from '@/components/VHeader/VDesktopSwitcher'
// import VMobileContentSwitcher from '@/components/VHeader/VMobileContentSwitcher'
import useContentType from '@/composables/use-content-type'

import allIcon from 'assets/icons/all-content.svg'
import audioIcon from 'assets/icons/audio-content.svg'
import imageIcon from 'assets/icons/image-content.svg'
import ellipsisIcon from 'assets/icons/ellipsis.svg'

const icons = {
  all: allIcon,
  audio: audioIcon,
  image: imageIcon,
  ellipsis: ellipsisIcon,
}
export default {
  name: 'VContentSwitcher',
  components: {
    VContentSwitcherButton,
    VContentTypePopover,
    VPageMenuButton,
    VPageMenuPopover,
  },
  props: {
    currentMenu: {},
  },
  setup(_, { emit }) {
    console.log('VContentSwitcher setup')
    const isMdScreen = inject('isMdScreen')

    const content = useContentType()
    // const pages = usePages()
    /**
     * @type {ComputedRef<import('@nuxtjs/composition-api').Component>}
     */
    const switcherComponent = computed(
      () => VDesktopSwitcher
      // isMdScreen.value ? VDesktopSwitcher : VMobileContentSwitcher
    )
    const handleClick = () => {
      console.log('cw button clicked')
      openMenu()
    }
    const handleContentTypeClick = (item) => {
      console.log('[VContentSwitcher] is on! content type clicked', item)
      content.setActiveType(item)
    }
    const openMenu = () => {
      emit('open-menu')
    }
    const closeMenu = () => {
      emit('close-menu')
    }
    onMounted(() => {
      console.log('VContentSwitcher mounted')
    })
    return {
      content,
      icons,
      switcherComponent,
      isMdScreen,
      openMenu,
      closeMenu,
      handleContentTypeClick,
      handleClick,
    }
  },
}
</script>
