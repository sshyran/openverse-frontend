<template>
  <VItemGroup
    direction="vertical"
    :bordered="!isMdScreen"
    type="radiogroup"
    class="z-10"
  >
    <VItem
      v-for="(item, idx) in content.types"
      :key="idx"
      :selected="item === content.activeType.value"
      :is-first="idx === 0"
      size="medium"
      @click="handleClick(item)"
    >
      <VIcon :icon-path="icons[item]" class="me-2 ms-4 my-4" />
      <span class="pe-20 py-4 font-semibold">{{
        $t(`search-type.${item}`)
      }}</span>
    </VItem>
  </VItemGroup>
</template>
<script>
import VIcon from '@/components/VIcon/VIcon.vue'
import VItem from '@/components/VItemGroup/VItem.vue'
import VItemGroup from '@/components/VItemGroup/VItemGroup.vue'

import checkIcon from 'assets/icons/checkmark.svg'

export default {
  name: 'VContentTypePopover',
  components: { VIcon, VItem, VItemGroup },
  props: {
    icons: {
      type: Object,
      required: true,
    },
    isMdScreen: {
      type: Boolean,
      default: false,
    },
    content: {},
  },
  setup(_, { emit }) {
    const handleClick = (item) => {
      console.log(item, 'clicked')
      emit('click', item)
    }

    return {
      checkIcon,
      handleClick,
    }
  },
}
</script>
