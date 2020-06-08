import vuexLocal from '../plugins/vuex-persist'

export const state = () => ({
  count: 1,
  pages: [
    {
      id: 1,
      url: '/',
      title: '',
      content: ''
    },
    {
      id: 0,
      url: '/help',
      title: 'Help',
      content:
        '<h1>Help</h1><h2></h2><p><strong>API</strong></p><ul><li><p>/hunt<strong> </strong><em>(domain)</em></p></li><li><p>/crunch<strong> </strong><em>(domain)</em></p></li><li><p>/clearbit<strong> </strong><em>(domain / email)</em></p></li></ul><p></p><p><strong>Navigation</strong></p><ul><li><p><strong>/n </strong><em>- new page</em></p></li><li><p><strong>// </strong><em>- navigate to a page</em></p></li><li><p><strong>Shift + </strong>↑↓ <em>- move to next/previous page</em></p></li></ul><p></p><p></p><p></p><p></p>',
      editable: false
    }
  ]
})

const getTitle = (value) => {
  const h1 = value.indexOf('<h1>') + 4
  const h1Closing = value.indexOf('</h1>')
  const title = value.slice(h1, h1Closing) || ''

  return title
}

export const mutations = {
  addPage(state, { redirect, url, title = '', content = '' }) {
    const id = state.count + 1
    const pageUrl = url || `/${id}`

    state.pages.push({
      id,
      title,
      content,
      url: pageUrl
    })

    state.count += 1

    if (redirect) {
      this.$router.push(pageUrl)
    }
  },

  toNextPage(state) {
    const currentIndex = state.pages.findIndex(
      (p) => p.url === this.$router.currentRoute.path
    )
    let pageUrl

    if (currentIndex || currentIndex === 0) {
      const nextIndex = (currentIndex + 1) % state.pages.length
      pageUrl = state.pages[nextIndex].url
    } else {
      pageUrl = state.pages[0].url
    }
    console.log(currentIndex)
    console.log(state.pages)

    this.$router.push(pageUrl)
  },

  toPreviousPage(state) {
    const currentIndex = state.pages.findIndex(
      (p) => p.url === this.$router.currentRoute.path
    )
    let pageUrl
    console.log(currentIndex)
    console.log(state.pages)

    if (currentIndex || currentIndex === 0) {
      const nextIndex =
        (currentIndex + state.pages.length - 1) % state.pages.length

      pageUrl = state.pages[nextIndex].url
    } else {
      pageUrl = state.pages[0].url
    }

    this.$router.push(pageUrl)
  },

  saveContent(state, { url, value }) {
    const pageIndex = state.pages.findIndex((p) => p.url === url)
    const page = state.pages[pageIndex]

    if (!page) {
      this.commit('pages/addPage', {
        url: this.$router.currentRoute.path,
        content: value
      })
    }

    state.pages[pageIndex] = { ...page, title: getTitle(value), content: value }
  }
}

export const getters = {
  pages: (state) => state.pages,
  pageByUrl: (state) => (url) => {
    const r = state.pages.find((p) => p.url === url)
    return r
  }
}

export const plugins = [vuexLocal.plugin]
