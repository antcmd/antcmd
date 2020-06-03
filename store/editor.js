import vuexLocal from '../plugins/vuex-persist'

export const state = () => ({
  content: {
    home: ''
  }
})

export const mutations = {
  save(state, { page, value }) {
    state.content = { ...state.content, [page]: value }
  }
}

export const plugins = [vuexLocal.plugin]
