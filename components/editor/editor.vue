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

import NewPage from './extensions/commands/new_page'
import Home from './extensions/commands/home'
import Help from './extensions/commands/help'
import Theme from './extensions/commands/themes'
import Pages from './extensions/commands/pages'

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
import Clubhouse from './extensions/api/clubhouse'
/* import Synonyms from './extensions/api/words/synonyms' */

const sound = new Howl({
  src: '/sounds/casual/switch.wav',
  volume: 0.5
})

const soundNewPage = new Howl({
  src: '/sounds/casual/click4.wav',
  volume: 0.5
})

export default {
  components: { EditorContent, Suggestions },

  props: {
    value: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
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
      theme: function(state) {
        return state.app.theme
      },
      suggestionItems: function(state) {
        return state.suggestions.items
      },
      suggestionQuery: function(state) {
        return state.suggestions.suggestionQuery
      },
      pages: function(state) {
        return state.pages.pages
      }
    })
  },

  watch: {
    value(val) {
      if (this.editor && !this.editorChange) {
        this.editor.setContent(val, true)
      }
      this.editorChange = false
    },
    theme(theme) {
      const htmlElement = document.documentElement

      if (theme) {
        localStorage.setItem('theme', theme)
        htmlElement.setAttribute('theme', theme)
      }
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      /* editable: this.editable, */
      editable: true,
      extensions: [
        new NewPage(),
        new Home(),
        new Help(),
        new Theme({
          theme: this.theme,
          setTheme: this.setTheme,
          toggleTheme: this.toggleTheme
        }),
        new Pages(),

        // api
        new Hunter(),
        new Crunchbase(),
        new Clearbit(),
        new Gmail(),
        new Clubhouse(),
        /* new Synonyms(), */

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

        // Domain and Email suggestions on @
        new Mention({
          onEnter: this.$refs.suggestions.onSuggestionStart,
          onChange: this.$refs.suggestions.onChange,
          onExit: this.$refs.suggestions.onExit,
          onKeyDown: this.$refs.suggestions.onKeyDown,

          items: () => {
            this.getDomainsAndEmails()
            return this.suggestionItems
          }
        }),

        // Link or create page
        /* new Mention({ */
        /*   onEnter: this.$refs.suggestions.onSuggestionStart, */
        /*   onChange: this.$refs.suggestions.onChange, */
        /*   onExit: this.$refs.suggestions.onExit, */
        /*   onKeyDown: this.$refs.suggestions.onKeyDown, */

        /*   matcher: { char: '>', allowSpaces: true }, */
        /*   items: () => { */
        /*     return [ */
        /*       ...this.pages.map((p) => ({ */
        /*         name: p.title, */
        /*         id: p.url, */
        /*         url: p.url, */
        /*         type: 'page-link' */
        /*       })), */
        /*       { */
        /*         name: 'New page', */
        /*         id: 666, */
        /*         type: 'page-link' */
        /*       } */
        /*     ] */
        /*   } */
        /* }), */

        // Navigate to a page
        new Mention({
          onEnter: this.$refs.suggestions.onSuggestionStart,
          onChange: this.$refs.suggestions.onChange,
          onExit: this.$refs.suggestions.onExit,
          onKeyDown: this.$refs.suggestions.onKeyDown,

          matcher: { char: '//' },
          items: () => {
            return this.pages.map((p) => ({
              name: p.title,
              id: p.url,
              url: p.url,
              type: 'page-navigation'
            }))
          }
        })
      ],
      onUpdate: ({ transaction, getHTML }) => {
        if (transaction.getMeta('api-call')) {
          sound.play()
        }

        if (transaction.getMeta('new-page')) {
          soundNewPage.play()
          this.newPage()
        }

        if (transaction.getMeta('home')) {
          sound.play()
          this.$router.push('/')
        }

        if (transaction.getMeta('pages')) {
          sound.play()
          this.$router.push('/pages')
        }

        if (transaction.getMeta('help')) {
          sound.play()
          this.$router.push('/help')
        }

        this.editorChange = true
        this.$emit('input', getHTML())
      },
      autoFocus: true
    })

    if (this.value !== '') {
      this.editor.focus('end')
    }
  },

  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  },

  methods: {
    setTheme(theme) {
      this.$store.commit('app/setTheme', theme)
    },

    toggleTheme(theme) {
      const htmlElement = document.documentElement

      if (this.theme === 'dark') {
        htmlElement.setAttribute('theme', 'light')
        this.setTheme('light')
      } else {
        htmlElement.setAttribute('theme', 'dark')
        this.setTheme('dark')
      }
    },

    getDomainsAndEmails() {
      this.$store.commit(
        'suggestions/getDomainsAndEmails',
        this.editor.getHTML()
      )
    },

    selectSuggestion(suggestion) {
      switch (suggestion.type) {
        case 'mention': {
          const { view, selection } = this.editor

          view.dispatch(
            view.state.tr.insertText(
              `${suggestion.name}`,
              selection.from - (1 + this.suggestionQuery.length),
              selection.from
            )
          )
          this.$router.push(suggestion.url)
          break
        }

        case 'page-navigation': {
          const { view, selection } = this.editor
          view.dispatch(
            view.state.tr.insertText(
              '',
              selection.from - (2 + this.suggestionQuery.length),
              selection.from
            )
          )
          this.$router.push(suggestion.url)
          break
        }

        case 'page-link': {
          const { view, selection } = this.editor
          view.dispatch(
            view.state.tr.insertText(
              'link',
              selection.from - (1 + this.suggestionQuery.length),
              selection.from
            )
          )
          break
        }

        default:
          break
      }

      this.$refs.suggestions.destroyPopup()
    },

    newPage() {
      this.$store.commit('pages/addPage', { redirect: true })
    },

    goToPage() {
      const user = this.filteredUsers[this.navigatedUserIndex]

      if (user) {
        const { view, selection } = this.editor
        view.dispatch(
          view.state.tr.insertText(``, selection.from - 3, selection.from)
        )

        this.$router.push({ path: `/${user.name}` })
        this.destroyPopup()
      }
    }
  }
}
</script>
