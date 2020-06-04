import { InputRule } from 'prosemirror-inputrules'
import { Extension } from 'tiptap'

export default class Pages extends Extension {
  inputRules({ type }) {
    return [
      new InputRule(new RegExp(`/p$`), (state, match, start, end) => {
        // console.log(match)
        // this.options.callback()
        // alert('pages')
        // return null
        // const domain = match.input.slice(0, -api.alias.length - 1)

        return state.tr.insertText('p/')
        //   .setMeta('api-call', {
        //     api: api.name,
        //     domain
        //   })
      })
    ]
  }
}
