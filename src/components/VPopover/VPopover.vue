<template>
  <div>
    <div
      ref="triggerContainerRef"
      class="w-min whitespace-nowrap"
      @click="onTriggerClick"
    >
      <!--
        @slot The trigger, should be a button 99.99% of the time. If you need custom event handling on the trigger button, ensure bubbling is not prevented or else the popover will not open
          @binding {object} a11yProps
          @binding {boolean} visible
      -->
      <slot
        name="trigger"
        :a11y-props="triggerA11yProps"
        :visible="visibleRef"
      />
    </div>
    <VPopoverContent
      :visible="visibleRef"
      :trigger-element="triggerRef"
      :placement="placement"
      :hide-on-esc="hideOnEsc"
      :hide-on-click-outside="hideOnClickOutside"
      :auto-focus-on-show="autoFocusOnShow"
      :auto-focus-on-hide="autoFocusOnHide"
      :hide="close"
      :aria-label="label"
      :aria-labelledby="labelledBy"
    >
      <!-- @slot The content of the popover -->
      <slot name="default" />
    </VPopoverContent>
  </div>
</template>

<script>
import VPopoverContent from '~/components/VPopover/VPopoverContent.vue'
import {
  defineComponent,
  ref,
  watch,
  reactive,
  computed,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'VPopover',
  components: { VPopoverContent },
  /**
   * NB: Most of these technically default to `undefined` so that the underlying `VPopoverContent`
   * default for each of them can take over.
   */
  props: {
    /**
     * Whether the popover should hide when the <kbd>Escape</kbd> key is pressed.
     *
     * @default true
     */
    hideOnEsc: { type: Boolean, default: undefined },
    /**
     * Whether the popover should hide when a click happens outside the popover content,
     * excluding the trigger. When the trigger is clicked and the popover is open, nothing
     * will happen.
     *
     * @default true
     */
    hideOnClickOutside: { type: Boolean, default: undefined },
    /**
     * Whether the popover content should automatically receive focus when the popover
     * opens.
     *
     * @default true
     */
    autoFocusOnShow: { type: Boolean, default: undefined },
    /**
     * Whether the trigger should automatically receive focus when the popover closes.
     *
     * @default true
     */
    autoFocusOnHide: { type: Boolean, default: undefined },
    /**
     * The placement of the popover relative to the trigger. Should be one of the options
     * for `placement` passed to popper.js.
     *
     * @see https://popper.js.org/docs/v2/constructors/#options
     *
     * @default 'bottom'
     */
    placement: {
      type: /** @type {import('@nuxtjs/composition-api').PropType<import('@popperjs/core').Placement>} */ (
        String
      ),
    },
    /**
     * The label of the popover content. Must be provided if `labelledBy` is empty.
     *
     * @default undefined
     */
    label: { type: String },
    /**
     * The id of the element labelling the popover content. Must be provided if `label` is empty.
     *
     * @default undefined
     */
    labelledBy: { type: String },
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
    const visibleRef = ref(false)
    /** @type {import('@nuxtjs/composition-api').Ref<HTMLElement | undefined>} */
    const triggerContainerRef = ref()

    const triggerA11yProps = reactive({
      'aria-expanded': false,
      'aria-haspopup': 'dialog',
    })

    const triggerRef = computed(() => triggerContainerRef.value?.firstChild)

    watch([visibleRef], ([visible]) => {
      if (visible) {
        triggerA11yProps['aria-expanded'] = true
      } else {
        triggerA11yProps['aria-expanded'] = false
      }
    })

    const open = () => {
      visibleRef.value = true
      emit('open')
    }

    const close = () => {
      visibleRef.value = false
      emit('close')
    }

    const onTriggerClick = () => {
      if (visibleRef.value === true) {
        close()
      } else {
        open()
      }
    }

    return {
      visibleRef,
      close,
      triggerContainerRef,
      triggerRef,
      onTriggerClick,
      triggerA11yProps,
    }
  },
})
</script>
