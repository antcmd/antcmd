import { InputRule } from 'prosemirror-inputrules'
import { Extension } from 'tiptap'

export default class Publish extends Extension {
  inputRules({ type }) {
    return [
      new InputRule(new RegExp(`/publish`), (state, match, start, end) => {
        return state.tr.insertText('', end - 8, end).setMeta('publish', true)
      })
    ]
  }
}
