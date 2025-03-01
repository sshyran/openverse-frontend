<template>
  <div
    ref="nodeRef"
    class="w-full flex"
    :role="type"
    :class="direction === 'vertical' ? 'flex-col' : 'flex-row'"
    @focusin="isFocused = true"
    @focusout="isFocused = false"
  >
    <!--
      @slot The items in the item group. Should all be `VItem`s
    -->
    <slot name="default" />
  </div>
</template>

<script>
import {
  defineComponent,
  provide,
  ref,
  readonly,
} from '@nuxtjs/composition-api'
import { ensureFocus } from 'reakit-utils'
import { useI18n } from '~/composables/use-i18n'

/**
 * @typedef VItemGroupContext
 * @property {'vertical' | 'horizontal'} direction
 * @property {boolean} bordered
 * @property {'menu' | 'radiogroup'} type
 */

/**
 * @type {import('@nuxtjs/composition-api').InjectionKey<VItemGroupContext>}
 */
export const VItemGroupContextKey = Symbol('VItemGroupContext')

/**
 * @typedef VItemGroupFocusContext
 * @property {import('@nuxtjs/composition-api').Readonly<import('@nuxtjs/composition-api').Ref<boolean>>} isGroupFocused
 * @property {(event: KeyboardEvent) => void} onItemKeyPress
 * @property {import('@nuxtjs/composition-api').Readonly<import('@nuxtjs/composition-api').Ref<number>>} selectedCount
 * @property {(selected: boolean, previousSelected: boolean) => void} setSelected
 */

/**
 * @type {import('@nuxtjs/composition-api').InjectionKey<VItemGroupFocusContext>}
 */
export const VItemGroupFocusContextKey = Symbol('VItemGroupFocusContext')

const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export default defineComponent({
  name: 'VItemGroup',
  props: {
    /**
     * The direction to render the items in.
     *
     * @default 'vertical'
     */
    direction: {
      type: /** @type {import('@nuxtjs/composition-api').PropType<'vertical' | 'horizontal'>} */ (
        String
      ),
      default: 'vertical',
      validate: (v) => ['vertical', 'horizontal'].includes(v),
    },
    /**
     * Whether to render a bordered, separated list of items. When false each
     * item will be have whitespace separating them instead of borders.
     *
     * @default true
     */
    bordered: {
      type: Boolean,
      default: true,
    },
    /**
     * The type of item group and item to render. This directly affects the `role` attribute
     * of the container and the items themselves.
     *
     * `menu` should be used when providing a menu of independent options.
     *
     * @see https://www.w3.org/TR/wai-aria-1.1/#menu
     *
     * `radiogroup` should be used when providing a menu of options where only one can be selected at a time.
     *
     * @see https://www.w3.org/TR/wai-aria-1.1/#radiogroup
     *
     * @default 'menu'
     */
    type: {
      type: /** @type {import('@nuxtjs/composition-api').PropType<'menu' | 'radiogroup'>} */ (
        String
      ),
      default: 'menu',
      validate: (v) => ['menu', 'radiogroup'].includes(v),
    },
  },
  setup(props) {
    /** @type {import('@nuxtjs/composition-api').Ref<HTMLElement | undefined>} */
    const nodeRef = ref()
    const isFocused = ref(false)
    provide(VItemGroupContextKey, props)

    const i18n = useI18n()

    /**
     * When the item group is horizontal, we need to "reverse" the behavior of the left and right arrow keys for RTL locales
     * because the DOM order gets reversed to be opposite the visual order relative to left/right movement.
     *
     * For vertical locales it should remain the same.
     * @param {string} ltr
     * @param {string} rtl
     */
    const resolveArrow = (ltr, rtl) => {
      return i18n.localeProperties.dir === 'rtl' &&
        props.direction === 'horizontal'
        ? rtl
        : ltr
    }

    /**
     * @param {KeyboardEvent} event
     */
    const onItemKeyPress = (event) => {
      if (!arrows.includes(event.key) || !nodeRef.value) return

      event.preventDefault()

      const target = event.target

      // While VItem ultimately renders a button at the moment, that could change in the future, so using a data attribute selector makes it more flexible for the future
      const items = Array.from(
        nodeRef.value.querySelectorAll('[data-item-group-item]')
      )

      const targetIndex = items.findIndex((item) => item === target)

      switch (event.key) {
        case 'ArrowUp':
        case resolveArrow('ArrowLeft', 'ArrowRight'):
          if (targetIndex === 0) {
            return ensureFocus(items[items.length - 1])
          }
          return ensureFocus(items[targetIndex - 1])
        case 'ArrowDown':
        case resolveArrow('ArrowRight', 'ArrowLeft'):
          if (targetIndex === items.length - 1) {
            return ensureFocus(items[0])
          }
          return ensureFocus(items[targetIndex + 1])
      }
    }

    const selectedCount = ref(0)

    /**
     * @param {boolean} selected
     * @param {boolean} previousSelected
     */
    const setSelected = (selected, previousSelected) => {
      if (previousSelected && !selected) selectedCount.value -= 1
      if (!previousSelected && selected) selectedCount.value += 1
    }

    const focusContext = {
      isGroupFocused: readonly(isFocused),
      onItemKeyPress,
      selectedCount: readonly(selectedCount),
      setSelected,
    }

    provide(VItemGroupFocusContextKey, focusContext)

    return { isFocused, nodeRef }
  },
})
</script>
