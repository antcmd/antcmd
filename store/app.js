export const state = () => ({
  theme: 'light', // dark
  sound: 'default',
  fontSize: 19
})

export const mutations = {
  setTheme(state, theme) {
    state.theme = theme
  }
}
