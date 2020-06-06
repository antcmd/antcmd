import vuexLocal from '../plugins/vuex-persist'

export const state = () => [
  {
    url: '/',
    title: '',
    content: '<h1>hey</h1>'
  },
  {
    url: '/help',
    title: 'Help',
    content:
      '<h1>Help</h1><h2></h2><p><strong>API</strong></p><ul><li><p>/hunt<strong> </strong><em>{domain}</em></p></li><li><p>/crunch<strong> </strong><em>{domain}</em></p></li><li><p>/clearbit<strong> </strong><em>{domain, email}</em></p></li><li><p>/s<strong> </strong><em>{word, sentence} - get synonym or paraphrase</em></p></li></ul><h2></h2><p><strong>Gmail</strong></p><ul><li><p><strong>/inbox</strong></p></li><li><p><strong>/e </strong><em>- send</em></p></li></ul><h2></h2><p><strong>Pages</strong></p><ul><li><p><strong>/n </strong><em>- new page</em></p></li><li><p><strong>// </strong><em>- insert link to page</em></p></li><li><p><strong>&gt;</strong><em> -</em><strong> </strong><em>go to page</em></p></li></ul><p></p><p></p><p></p><p></p>',
    editable: false
  },
  {
    url: '/changelog',
    title: 'changelog',
    content: '',
    editable: false
  }
]

export const mutations = {
  addPage(pages, { title, content }) {
    if (!title) {
      title = 'Untitled'
    }
    // const url = `/${title.toLowerCase().replace(/ /g, '-')}`
    const url = this.$router.currentRoute.path

    console.log('add new')
    console.log('content')
    console.log(content)
    pages.push({
      title,
      content,
      url
    })
  },

  saveContent(pages, { url, value }) {
    const pageIndex = pages.findIndex((p) => p.url === url)
    const page = pages[pageIndex]
    pages[pageIndex] = { ...page, content: value }
  }
}

export const getters = {
  pages: (pages) => pages,
  pageByUrl: (pages) => (url) => pages.find((p) => p.url === url),
  newPage: (pages) => {
    const page = { title: 'New', content: '<h1>New</h1>', url: 'new' }
    pages = [...pages, page]
  }
}

export const plugins = [vuexLocal.plugin]
