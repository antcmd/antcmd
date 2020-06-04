<template>
  <div class="page">
    <div class="editor">
      <editor-content class="editor__content" :editor="editor" />
    </div>
    <suggestions ref="suggestions" :select="onSelectSuggestion" />
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
      autoFocus: true,
      extensions: [
        // api
        new Hunter(),
        new Crunchbase(),
        new Clearbit(),
        new Gmail(),

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
          items: () => {
            this.getSuggestionItems()
            return this.suggestionItems
          }
        })
      ],

      content: this.value,
      onUpdate: ({ transaction, getHTML }) => {
        if (transaction.getMeta('api-call')) sound.play()

        this.editorChange = true
        this.$emit('input', getHTML())
      }
    })

    this.editor.setContent(this.value)
    this.editor.focus('end')
  },

  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  },

  methods: {
    getSuggestionItems() {
      this.$store.commit(
        'suggestions/getDomainsAndEmailsSuggestions',
        this.editor.getHTML()
      )
    },

    onSelectSuggestion(suggestion) {
      this.editor.view.dispatch(
        this.editor.view.state.tr.insertText(
          `${suggestion.name}`,
          this.editor.selection.from - (1 + this.suggestionQuery.length),
          this.editor.selection.from
        )
      )

      this.$refs.suggestions.destroyPopup()
    }
  }
}
</script>

<style lang="scss">
.page {
  position: relative;
}

* {
  font-family: Inter;
}

.editor {
  display: flex;
  justify-content: center;
}

.editor__content {
  margin-top: 100px;
  width: 665px;
}

.ProseMirror {
  outline: none !important;
}

.editor *.is-empty:nth-child(1)::before,
.editor *.is-empty:nth-child(2)::before {
  content: attr(data-empty-text);
  float: left;
  color: #97a0bf;
  pointer-events: none;
  height: 0;
}

h1 {
  margin-bottom: 19px;
}
p {
  font-size: 19px;
  line-height: 32px;
}
body {
  /* background: #f5f5f5; */
}
a {
  color: #0645ad;
  cursor: pointer;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
