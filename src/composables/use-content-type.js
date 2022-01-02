import {
  ssrRef,
  useContext,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import { SEARCH } from '~/constants/store-modules'
import { UPDATE_QUERY } from '~/constants/action-types'

const contentTypes = ['all', 'audio', 'image']
const previousContentType = ssrRef(null)
const activeType = ssrRef(null)

export default function useContentType() {
  const { app, store } = useContext()
  const route = useRoute()
  const router = useRouter()
  activeType.value = store.state.search.searchType

  console.log('usecontenttype', activeType.value, previousContentType.value)
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
    const type = contentType === 'all' ? '' : contentType

    const newPath = app.localePath({
      path: `/search/${type}`,
      query: route.value.query,
    })
    router.push(newPath)
  }

  return {
    setActiveType,
    activeType,
    types: contentTypes,
  }
}
