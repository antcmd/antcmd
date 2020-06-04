import { InputRule } from 'prosemirror-inputrules'
import { Extension } from 'tiptap'

export default class Home extends Extension {
  inputRules({ type }) {
    return [
      new InputRule(new RegExp(`/home$`), (state, match, start, end) => {
        // Go to home
        this.options.callback()

        return state.tr.insertText('', end - 4, end)
      })
    ]
  }
}
