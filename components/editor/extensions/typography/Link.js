// https://github.com/scrumpy/tiptap/blob/master/packages/tiptap-extensions/src/marks/Link.js
import { Mark } from 'tiptap'
import { markInputRule } from 'tiptap-commands'

export default class Italic extends Mark {
  get name() {
    return 'link'
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

  inputRules({ type }) {
    return [markInputRule(/(\w*)\/link/, type)]
  }
}
