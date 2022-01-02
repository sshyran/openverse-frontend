<template>
  <div ref="nodeRef">
    <slot
      name="content-switcher-button"
      :a11yProps="triggerA11yProps"
      :visible="visibleRef"
      :handleClick="onTriggerClick"
    />
    <div class="hidden">
      <slot name="page-switcher-button" />
    </div>

    <VMenuModal
      :visible="visibleRef"
      :trigger-element="triggerElementRef"
      :hide="close"
      @close="onTriggerClick"
    >
      <slot name="page-switcher-content" />
      <slot name="content-switcher-content" />
    </VMenuModal>
  </div>
</template>

<script>
import { ref, watch, reactive, inject, computed } from '@nuxtjs/composition-api'
import { useBodyScrollLock } from '~/composables/use-body-scroll-lock'

import VMenuModal from '~/components/VHeader/VMenuModal.vue'

export default {
  name: 'VMobileContentSwitcher',
  components: {
    VMenuModal,
  },
  emits: [
    /**
     * Fires when the popover opens, regardless of reason. There are no extra parameters.
     */
    'open',
    /**
     * Fires when the popover closes, regardless of reason. There are no extra parameters.
     */
    'close',
  ],
  setup(_, { emit }) {
    const modalRef = ref(null)
    const visibleRef = ref(false)
    const nodeRef = ref(null)
    const triggerElementRef = computed(() => nodeRef.value?.firstChild)
    /** @type {import('@nuxtjs/composition-api').Ref<HTMLElement | undefined>} */
    const buttonRef = ref()
    // const { i18n } = useContext()
    /** @type {import('@nuxtjs/composition-api').Ref<boolean>} */
    const isMdScreen = inject('isMdScreen')
    /** @type {import('@nuxtjs/composition-api').Ref<boolean>} */
    const isHeaderScrolled = inject('isHeaderScrolled')

    const triggerA11yProps = reactive({
      'aria-expanded': false,
      'aria-haspopup': 'dialog',
    })

    watch([visibleRef], ([visible]) => {
      triggerA11yProps['aria-expanded'] = visible
    })

    const { lock, unlock } = useBodyScrollLock({ nodeRef })

    const open = () => {
      visibleRef.value = true
      emit('open')
      if (!isMdScreen.value) {
        lock()
      }
    }

    const close = () => {
      visibleRef.value = false
      emit('close')
      if (!isMdScreen.value) {
        unlock()
      }
    }

    const onTriggerClick = () => {
      if (visibleRef.value === true) {
        close()
      } else {
        open()
      }
    }
    return {
      modalRef,
      buttonRef,
      isHeaderScrolled,
      nodeRef,
      visibleRef,
      open,
      close,
      onTriggerClick,
      triggerA11yProps,
      isMdScreen,
      triggerElementRef,
    }
  },
}
</script>
