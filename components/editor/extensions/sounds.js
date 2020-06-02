import { InputRule } from 'prosemirror-inputrules'
import { Extension } from 'tiptap'

// + sound-off

const api = {
  name: 'gmail',
  // alias: 'sound1'
  alias: 'sound10'
}

export default class Gmail extends Extension {
  inputRules({ type }) {
    return [
      new InputRule(new RegExp(`/sound1$`), (state, match, start, end) => {
        return state.tr
          .insertText('', end - api.alias.length, end)
          .setMeta('sound-call', {
            sound: 'sound1'
          })
      }),
      new InputRule(new RegExp(`/sound2$`), (state, match, start, end) => {
        return state.tr
          .insertText('', end - api.alias.length, end)
          .setMeta('sound-call', {
            sound: 'sound2'
          })
      }),
      new InputRule(new RegExp(`/sound3$`), (state, match, start, end) => {
        return state.tr
          .insertText('', end - api.alias.length, end)
          .setMeta('sound-call', {
            sound: 'sound3'
          })
      }),
      new InputRule(new RegExp(`/sound4$`), (state, match, start, end) => {
        return state.tr
          .insertText('', end - api.alias.length, end)
          .setMeta('sound-call', {
            sound: 'sound4'
          })
      }),
      new InputRule(new RegExp(`/sound5$`), (state, match, start, end) => {
        return state.tr
          .insertText('', end - api.alias.length, end)
          .setMeta('sound-call', {
            sound: 'sound5'
          })
      }),
      new InputRule(new RegExp(`/sound6$`), (state, match, start, end) => {
        return state.tr
          .insertText('', end - api.alias.length, end)
          .setMeta('sound-call', {
            sound: 'sound6'
          })
      }),
      new InputRule(new RegExp(`/sound7$`), (state, match, start, end) => {
        return state.tr
          .insertText('', end - api.alias.length, end)
          .setMeta('sound-call', {
            sound: 'sound7'
          })
      }),
      new InputRule(new RegExp(`/sound8$`), (state, match, start, end) => {
        return state.tr
          .insertText('', end - api.alias.length, end)
          .setMeta('sound-call', {
            sound: 'sound8'
          })
      }),
      new InputRule(new RegExp(`/sound9$`), (state, match, start, end) => {
        return state.tr
          .insertText('', end - api.alias.length, end)
          .setMeta('sound-call', {
            sound: 'sound9'
          })
      })
    ]
  }
}
