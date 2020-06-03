export const state = () => ({
  // items: {
  //   domains: [],
  //   emails: [],
  //   pages: []
  // },
  items: [],
  suggestionQuery: null,
  suggestionRange: null,
  filteredSuggestions: [],
  selectedIndex: 0
})

export const mutations = {
  onSuggestionStart(state, { items, query, range, command }) {
    state.suggestionQuery = query
    state.filteredSuggestions = items
    state.suggestionRange = range
  },

  onChange(state, { items, query, range }) {
    state.suggestionQuery = query
    state.filteredSuggestions = items
    state.suggestionRange = range
    state.selectedIndex = 0
  },

  onExit(state) {
    state.suggestionQuery = null
    state.filteredSuggestions = []
    state.suggestionRange = null
    state.selectedIndex = 0
    state.items = []
  },

  onUp(state) {
    state.selectedIndex =
      (state.selectedIndex + state.filteredSuggestions.length - 1) %
      state.filteredSuggestions.length
  },

  onDown(state) {
    state.selectedIndex =
      (state.selectedIndex + 1) % state.filteredSuggestions.length
  },

  getDomainsAndEmailsSuggestions(state, content) {
    const domainRegexp = /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/g
    const emailRegexp = /([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)/g
    const domains = content.match(domainRegexp) || []
    const emails = content.match(emailRegexp) || []

    function removeDuplicates(array) {
      return array.filter((a, b) => array.indexOf(a) === b)
    }

    const withoutDuplicates = removeDuplicates([...domains, ...emails])

    const items = withoutDuplicates.map((i, index) => ({
      id: index,
      name: i
    }))

    state.items = items
  }
}
