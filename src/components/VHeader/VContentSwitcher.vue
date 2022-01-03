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
        @click="$emit('click')"
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
import { inject, onMounted, ref, watch } from '@nuxtjs/composition-api'
import useContentType from '@/composables/use-content-type'

import allIcon from 'assets/icons/all-content.svg'
import audioIcon from 'assets/icons/audio-content.svg'
import imageIcon from 'assets/icons/image-content.svg'
import ellipsisIcon from 'assets/icons/ellipsis.svg'

import VContentSwitcherButton from '@/components/VHeader/VContentSwitcher/VContentSwitcherButton.vue'
import VContentTypePopover from '@/components/VHeader/VContentSwitcher/VContentTypePopover.vue'
import VPageMenuButton from '@/components/VHeader/VContentSwitcher/VPageMenuButton.vue'
import VPageMenuPopover from '@/components/VHeader/VContentSwitcher/VPageMenuPopover.vue'
import VDesktopSwitcher from '@/components/VHeader/VContentSwitcher/VDesktopSwitcher.vue'
import VMobileContentSwitcher from '@/components/VHeader/VContentSwitcher/VMobileContentSwitcher.vue'

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
    const isMdScreen = inject('isMdScreen')
    const menuModalRef = ref(null)
    const content = useContentType()

    /**
     * @type {Ref<import('@nuxtjs/composition-api').Component>}
     */
    const switcherComponent = ref(VMobileContentSwitcher)
    // Is there a way to understand whether the component is mounted or not?
    let mounted = ref(false)
    onMounted(() => (mounted.value = true))
    watch(
      [isMdScreen],
      () => {
        if (mounted.value) {
          switcherComponent.value = isMdScreen.value
            ? VDesktopSwitcher
            : VMobileContentSwitcher
        }
      },
      { immediate: true }
    )

    const handleContentTypeClick = (item) => {
      content.setActiveType(item)
      menuModalRef.value?.closeMenu()
      closeMenu()
    }
    const openMenu = () => {
      emit('open-menu')
    }
    const closeMenu = () => {
      emit('close-menu')
    }
    return {
      content,
      icons,
      switcherComponent,
      isMdScreen,
      openMenu,
      closeMenu,
      handleContentTypeClick,
      menuModalRef,
    }
  },
}
</script>
