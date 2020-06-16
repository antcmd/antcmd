import { Howl } from 'howler'
import vuexLocal from '../plugins/vuex-persist'

export const state = () => ({
  count: 1,
  pages: [
    {
      id: 1,
      url: '/',
      title: '',
      content: '',
      children: [],
      parentId: null
    }
  ]
})

export const getters = {
  pages: (state) => state.pages,
  pageByUrl: (state) => (url) => {
    const r = state.pages.find((p) => p.url === url)
    return r
  }
}

export const mutations = {
  addPage(state, { page, options: { redirect } }) {
    state.pages.push(page)

    if (redirect) {
      this.$router.push(page.url)
    }
  },

  incrementCount(state) {
    state.count += 1
  },

  addSubPage(state, { parentId, page }) {
    const parentPageIndex = state.pages.findIndex((p) => p.id === parentId)
    const parentPage = {
      ...state.pages[parentPageIndex],
      children: [...state.pages[parentPageIndex].children, page]
    }

    state.pages[parentPageIndex] = parentPage
  },

  async publish(state, { id, theme }) {
    const page = state.pages.find((p) => p.id === id)

    let content = page.content

    function replaceAll(string, search, replace) {
      return string.split(search).join(replace)
    }

    // TODO: dirty hack when using /pub. rework later
    content = replaceAll(content, '/pu', '')

    const result = await fetch(
      'https://cors-anywhere.herokuapp.com/http://ec2-54-87-171-242.compute-1.amazonaws.com:3000/page',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          origin: 'http://ec2-54-87-171-242.compute-1.amazonaws.com'
        },
        body: JSON.stringify({ ...page, content, theme })
      }
    ).then((r) => r.json())

    if (result && result.id) {
      const url = `https://antglobe.now.sh/${result.id}`
      const win = window.open(url, '_blank')
      win.focus()
    }
  },

  removePage(state, id) {
    state.pages = state.pages.filter((p) => p.id !== id)
  },

  goToPage(state) {
    soundMove.play()
  },

  toNextPage(state) {
    soundMove.play()
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

    this.$router.push(pageUrl)
  },

  toPreviousPage(state) {
    soundMove.play()
    const currentIndex = state.pages.findIndex(
      (p) => p.url === this.$router.currentRoute.path
    )
    let pageUrl

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
        page: {
          url: this.$router.currentRoute.path,
          content: value
        },
        options: { redirect: true }
      })
    }

    state.pages[pageIndex] = { ...page, title: getTitle(value), content: value }
  }
}

export const actions = {
  addPage(
    { state, commit },
    {
      page: { url, title, content, theme, parentId },
      options: { redirect = false }
    }
  ) {
    const id = state.count + 1
    const page = {
      id,
      url: url || `/${id}`,
      title: title,
      content: title === '' ? content : `<h1>${title}</h1><p></p>`,
      theme: theme,
      parentId,
      children: []
    }

    commit('incrementCount')
    commit('addPage', { page, options: { redirect } })

    if (parentId) {
      commit('addSubPage', { parentId, page })
    }

    // if (!parentId) {
    //   commit('addPage', { page, options: { redirect } })
    // } else {
    //   commit('addSubPage', { parentId, page })
    // }

    return page
  }
}

export const plugins = [vuexLocal.plugin]

const getTitle = (value) => {
  const h1 = value.indexOf('<h1>') + 4
  const h1Closing = value.indexOf('</h1>')
  const title = value.slice(h1, h1Closing) || ''

  return title
}

const soundMove = new Howl({
  src: '/sounds/casual/click2.wav',
  volume: 0.5
})
