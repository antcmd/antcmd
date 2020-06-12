import vuexLocal from '../plugins/vuex-persist'

export const state = () => ({
  theme: 'light', // dark, yellow, grey, red
  sound: 'default',
  fontSize: 19
})

export const mutations = {
  setTheme(state, theme) {
    state.theme = theme
  }
}

export const plugins = [vuexLocal.plugin]
