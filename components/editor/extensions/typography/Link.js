// https://github.com/scrumpy/tiptap/blob/master/packages/tiptap-extensions/src/marks/Link.js
import { Mark, Plugin } from 'tiptap'
import {
  updateMark,
  removeMark,
  pasteRule
  // markInputRule
} from 'tiptap-commands'
import { InputRule } from 'prosemirror-inputrules'
import { getMarkAttrs } from 'tiptap-utils'

export default class Link extends Mark {
  get name() {
    return 'link'
  }

  get defaultOptions() {
    return {
      openOnClick: true
    }
  }

  get schema() {
    return {
      attrs: {
        href: {
          default: null
        }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: (dom) => ({
            href: dom.getAttribute('href')
          })
        }
      ],
      toDOM: (node) => [
        'a',
        {
          ...node.attrs,
          rel: 'noopener noreferrer nofollow'
        },
        0
      ]
    }
  }

  commands({ type }) {
    return (attrs) => {
      if (attrs.href) {
        return updateMark(type, attrs)
      }

      return removeMark(type)
    }
  }

  pasteRules({ type }) {
    return [
      pasteRule(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
        type,
        (url) => ({ href: url })
      )
    ]
  }

  inputRules({ type }) {
    /* eslint-disable */
    return [
      // markInputRule(/(\w*)\/link/, type),
      new InputRule(new RegExp(`w*(w*)/link$`), (state, match, start, end) => {
        console.log(match)
        // return state.tr.setStoredMarks((marks) => console.log(marks))
        return null
        // const domain = match.input.slice(0, -api.alias.length - 1)

        // return state.tr
        //   .insertText('', end - api.alias.length, end)
        //   .setMeta('api-call', {
        //     api: api.name,
        //     domain
        //   })
      })
    ]
  }

  get plugins() {
    if (!this.options.openOnClick) {
      return []
    }

    return [
      new Plugin({
        props: {
          handleClick: (view, pos, event) => {
            const { schema } = view.state
            const attrs = getMarkAttrs(view.state, schema.marks.link)

            if (attrs.href && event.target instanceof HTMLAnchorElement) {
              event.stopPropagation()
              window.open(attrs.href)
            }
          }
        }
      })
    ]
  }
}
