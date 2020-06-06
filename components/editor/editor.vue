<template>
  <div class="page">
    <div class="editor">
      <editor-content class="editor__content" :editor="editor" />
    </div>
    <suggestions ref="suggestions" :select="selectSuggestion" />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  BulletList,
  ListItem,
  Underline,
  HorizontalRule,
  Strike,
  History
} from 'tiptap-extensions'
import { Howl } from 'howler'
import { mapState } from 'vuex'

import Suggestions from './suggestions'

// elements
import Doc from './extensions/elements/doc'
import Title from './extensions/elements/title'
import Heading from './extensions/elements/heading'
import Bold from './extensions/elements/bold'
import Italic from './extensions/elements/italic'
import Link from './extensions/elements/link'

import Mention from './extensions/plugins/mention'

// api
import Hunter from './extensions/api/hunter'
import Crunchbase from './extensions/api/crunchbase'
import Clearbit from './extensions/api/clearbit'
import Gmail from './extensions/api/gmail'

import Synonyms from './extensions/api/words/synonyms'

const sound = new Howl({
  src: '/sounds/casual/switch.wav',
  volume: 0.5
})

export default {
  components: { EditorContent, Suggestions },

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      editor: null,
      editorChange: false
    }
  },

  computed: {
    ...mapState({
      content: function(state) {
        return state.editor.content[this.page]
      },
      suggestionItems: function(state) {
        return state.suggestions.items
      },
      suggestionQuery: function(state) {
        return state.suggestions.suggestionQuery
      },
      pages: function(state) {
        return state.pages
      }
    })
  },

  watch: {
    value(val) {
      if (this.editor && !this.editorChange) {
        this.editor.setContent(val, true)
      }
      this.editorChange = false
    }
  },

  mounted() {
    this.editor = new Editor({
      /* autoFocus: true, */
      extensions: [
        // api
        new Hunter(),
        new Crunchbase(),
        new Clearbit(),
        new Gmail(),
        new Synonyms(),

        // typo
        new Doc(),
        new Title(),
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Underline(),
        new Strike(),
        new Italic(),
        new Link(),
        new BulletList(),
        new ListItem(),
        new HorizontalRule(),

        new History(),
        new Mention({
          onEnter: this.$refs.suggestions.onSuggestionStart,
          onChange: this.$refs.suggestions.onChange,
          onExit: this.$refs.suggestions.onExit,
          onKeyDown: this.$refs.suggestions.onKeyDown,

          // domain and emails suggestions
          items: () => {
            this.getDomainsAndEmails()
            return this.suggestionItems
          }
        }),
        new Mention({
          onEnter: this.$refs.suggestions.onSuggestionStart,
          onChange: this.$refs.suggestions.onChange,
          onExit: this.$refs.suggestions.onExit,
          onKeyDown: this.$refs.suggestions.onKeyDown,

          // pages suggestion
          matcher: { char: '>' },
          items: () => {
            return this.pages.map((p) => ({
              name: p.title,
              id: p.url,
              url: p.url,
              type: 'page'
            }))
          }
          /* command: () => { */
          /*   if (event.key === 'Enter') { */
          /*     this.goToPage() */
          /*     return true */
          /*   } */
          /* } */
        })
      ],

      autoFocus: true,
      content: this.value,
      onUpdate: ({ transaction, getHTML }) => {
        if (transaction.getMeta('api-call')) sound.play()

        this.editorChange = true
        this.$emit('input', getHTML())
      }
    })
  },

  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  },

  methods: {
    getDomainsAndEmails() {
      this.$store.commit(
        'suggestions/getDomainsAndEmails',
        this.editor.getHTML()
      )
    },

    selectSuggestion(suggestion) {
      if (suggestion.type === 'page') {
        const { view, selection } = this.editor
        view.dispatch(
          view.state.tr.insertText(
            '',
            selection.from - (1 + this.suggestionQuery.length),
            selection.from
          )
        )
        this.$router.push(suggestion.url)
      } else {
        this.editor.view.dispatch(
          this.editor.view.state.tr.insertText(
            `${suggestion.name}`,
            this.editor.selection.from - (1 + this.suggestionQuery.length),
            this.editor.selection.from
          )
        )
      }

      this.$refs.suggestions.destroyPopup()
    },

    goToPage() {
      const user = this.filteredUsers[this.navigatedUserIndex]

      if (user) {
        this.editor.view.dispatch(
          this.editor.view.state.tr.insertText(
            ``,
            this.editor.selection.from - 3,
            this.editor.selection.from
          )
        )
        this.$router.push({ path: `/${user.name}` })

        this.destroyPopup()
      }
    }
  }
}
</script>
