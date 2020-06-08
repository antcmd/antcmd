import { InputRule } from 'prosemirror-inputrules'
import { Extension } from 'tiptap'

export default class Themes extends Extension {
  inputRules({ type }) {
    return [
      // Dark
      new InputRule(new RegExp(`/dark`), (state, match, start, end) => {
        const htmlElement = document.documentElement

        htmlElement.setAttribute('theme', 'dark')
        this.options.setTheme('dark')

        return state.tr.insertText('', end - 5, end)
      }),

      // Light
      new InputRule(new RegExp(`/light`), (state, match, start, end) => {
        const htmlElement = document.documentElement

        htmlElement.setAttribute('theme', 'light')
        this.options.setTheme('light')

        return state.tr.insertText('', end - 6, end)
      }),

      // Toggle
      new InputRule(new RegExp(`/theme`), (state, match, start, end) => {
        this.options.toggleTheme()

        return state.tr.insertText('', end - 6, end)
      })
    ]
  }
}
