import { InputRule } from 'prosemirror-inputrules'
import { Extension } from 'tiptap'

const api = {
  name: 'gmail',
  alias: 'inbox',
}

export default class Gmail extends Extension {
  inputRules({ type }) {
    return [
      new InputRule(
        new RegExp(`/${api.alias}$`),
        (state, match, start, end) => {
          const domain = match.input.slice(0, -api.alias.length - 1)

          return state.tr
            .insertText('', end - api.alias.length, end)
            .setMeta('api-call', {
              api: api.name,
              domain,
            })
        }
      ),
    ]
  }
}
