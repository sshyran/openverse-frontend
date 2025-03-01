import { RouterLinkStub } from '@vue/test-utils'
import MediaTag from '~/components/MediaTag/MediaTag'
import render from '~/../test/unit/test-utils/render'

describe('MediaTag', () => {
  let props = null
  let options = null

  beforeEach(() => {
    props = {}
    options = { propsData: props }
  })

  it('should render an div tag by default', () => {
    const wrapper = render(MediaTag, options)
    expect(wrapper.vm.$props.tag).toEqual('div')
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLDivElement)
  })

  it('should render the supplied tag', () => {
    options.propsData = {
      ...options.propsData,
      tag: 'a',
      href: 'https://example.com/',
    }

    const wrapper = render(MediaTag, options)
    expect(wrapper.vm.$props.tag).toEqual('a')
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLAnchorElement)
    expect(wrapper.vm.$el.href).toEqual('https://example.com/')
  })

  it('should render the supplied Vue component', () => {
    options.propsData = {
      ...options.propsData,
      tag: 'RouterLink',
      to: '/',
    }
    options.stubs = {
      RouterLink: RouterLinkStub,
    }

    const wrapper = render(MediaTag, options)
    expect(wrapper.vm.$props.tag).toEqual('RouterLink')
    expect(wrapper.vm.$el).toBeInstanceOf(HTMLAnchorElement)
  })

  it('renders slot content', () => {
    options.slots = {
      default: '<div id="slot-content">Hello</div>',
    }

    const wrapper = render(MediaTag, options)
    const element = wrapper.find('#slot-content').element
    expect(element).toBeInstanceOf(HTMLDivElement)
    expect(element.textContent).toEqual('Hello')
  })
})
