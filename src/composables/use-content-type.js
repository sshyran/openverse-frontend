import { ref, useContext, watch } from '@nuxtjs/composition-api'
import { SEARCH } from '~/constants/store-modules'
import { UPDATE_QUERY } from '~/constants/action-types'

const contentTypes = ['all', 'audio', 'image']
/**@type {import('@nuxtjs/composition-api').Ref<'all'|'audio'|'image'|'video'|null>} */
const previousContentType = ref(null)
/** @type {import('@nuxtjs/composition-api').Ref<'all'|'audio'|'image'|'video'>} */
const activeType = ref('image')

export default function useContentType() {
  const { store } = useContext()
  activeType.value = store.state.search.searchType

  watch(
    () => store.state.search.searchType,
    (newSearchType) => (activeType.value = newSearchType)
  )
  const setActiveType = async (contentType) => {
    if (previousContentType.value === contentType) return
    await store.dispatch(`${SEARCH}/${UPDATE_QUERY}`, {
      searchType: contentType,
    })

    previousContentType.value = contentType
  }

  return {
    setActiveType,
    activeType,
    types: contentTypes,
  }
}
