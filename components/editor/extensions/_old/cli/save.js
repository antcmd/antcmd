import { InputRule } from 'prosemirror-inputrules'
import { Extension } from 'tiptap'

export default class Save extends Extension {
  inputRules({ type }) {
    return [
      new InputRule(new RegExp(`/save$`), (state, match, start, end) => {
        return state.tr.insertText('e:').setMeta('save-request', {
          start,
          end
        })
      })
    ]
  }
}
