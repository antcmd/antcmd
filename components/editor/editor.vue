<template>
  <div class="page">
    <div class="editor">
      <editor-content class="editor__content" :editor="editor" />
    </div>
    <div v-show="showSuggestions" ref="suggestions" class="suggestion-list">
      <template v-if="hasResults">
        <div
          v-for="(user, index) in filteredUsers"
          :key="user.id"
          class="suggestion-list__item"
          :class="{ 'is-selected': navigatedUserIndex === index }"
          @click="selectUser(user)"
        >
          {{ user.name }}
        </div>
      </template>
      <div v-else class="suggestion-list__item is-empty">
        No users found
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Placeholder,
  BulletList,
  ListItem,
  Underline,
  HorizontalRule,
  Strike,
  History
} from 'tiptap-extensions'
import { Howl } from 'howler'
/* import Fuse from 'fuse.js' */
import tippy, { sticky } from 'tippy.js'

import IconBase from '../icons/base'
import IconBold from '../icons/bold'
import IconItalic from '../icons/italic'
import IconUnderline from '../icons/underline'
import IconStrike from '../icons/strike'

import Doc from './extensions/Doc'
import Title from './extensions/Title'

import Icon from './components/icon'

// typo
import Heading from './extensions/typography/Heading'
import Bold from './extensions/typography/Bold'
import Italic from './extensions/typography/Italic'
import Link from './extensions/typography/Link'
import Mention from './extensions/Mention'
/* import Bullets from './extensions/Bullets' */

// cli
import Home from './extensions/cli/home'
import Save from './extensions/cli/save'
import Pages from './extensions/cli/pages'

// api
import Hunter from './extensions/api/Hunter'
import Crunchbase from './extensions/api/Crunchbase'
import Clearbit from './extensions/api/Clearbit'
import Gmail from './extensions/api/Gmail'

/* eslint-disable */
/* import BoldIcon from '~/icons/bold.svg' */
import ItalicIcon from '../../static/icons/italic.svg'
/* console.log(BoldIcon) */

const sound = new Howl({
  src: '/sounds/casual/switch.wav',
  volume: 0.5
})

export default {
  components: {
    EditorContent,
    Icon,
    ItalicIcon,
    IconBase,
    IconBold,
    IconItalic,
    IconUnderline,
    IconStrike
  },
  data() {
    return {
      sound,
      editor: new Editor({
        autoFocus: true,
        extensions: [
          // api
          new Hunter(),
          new Crunchbase(),
          new Clearbit(),
          new Gmail(),

          // cli
          new Home({ callback: () => this.$router.push({ path: '/' }) }),
          new Save(),
          new Pages(),

          // typo
          new Doc(),
          new Title(),
          new Heading({ levels: [1, 2, 3] }),
          new Bold(),
          new Underline(),
          new Strike(),
          /* new Bullets(), */
          new Italic(),
          new Link(),
          new BulletList(),
          new ListItem(),
          new HorizontalRule(),

          new History(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: (node) => {
              if (node.type.name === 'title') {
                return 'Title'
              }

              return 'Type something'
            }
          }),
          new Mention({
            // a list of all suggested items
            items: () => this.getPages(),
            matcher: { char: '>' },
            /* command: (range, attrs, schema) => alert('yo'), */
            // is called when a suggestion starts
            onEnter: ({ items, query, range, command, virtualNode }) => {
              this.query = query
              this.filteredUsers = items
              this.suggestionRange = range
              this.renderPopup(virtualNode)
              // we save the command for inserting a selected mention
              // this allows us to call it inside of our custom popup
              // via keyboard navigation and on click

              this.insertMention = () => alert('move to page')
            },
            // is called when a suggestion has changed
            onChange: ({ items, query, range, virtualNode }) => {
              this.query = query
              this.filteredUsers = items
              this.suggestionRange = range
              this.navigatedUserIndex = 0
              this.renderPopup(virtualNode)
            },
            // is called when a suggestion is cancelled
            onExit: () => {
              // reset all saved values
              this.query = null
              this.filteredUsers = []
              this.suggestionRange = null
              this.navigatedUserIndex = 0
              this.destroyPopup()
            },
            // is called on every keyDown event while a suggestion is active
            onKeyDown: ({ event }) => {
              if (event.key === 'ArrowUp') {
                this.upHandler()
                return true
              }

              if (event.key === 'ArrowDown') {
                this.downHandler()
                return true
              }

              if (event.key === 'Enter') {
                this.goToPage()
                return true
              }

              return false
            }
            // is called when a suggestion has changed
            // this function is optional because there is basic filtering built-in
            // you can overwrite it if you prefer your own filtering
            // in this example we use fuse.js with support for fuzzy search
            /* onFilter: (items, query) => { */
            /*   if (!query) { */
            /*     return items */
            /*   } */

            /*   const fuse = new Fuse(items, { */
            /*     threshold: 0.2, */
            /*     keys: ['name'] */
            /*   }) */

            /*   return fuse.search(query) */
            /* } */
          }),
          new Mention({
            items: () => this.getItems(),
            // is called when a suggestion starts
            onEnter: ({ items, query, range, command, virtualNode }) => {
              this.query = query
              this.filteredUsers = items
              this.suggestionRange = range
              this.renderPopup(virtualNode)
              // we save the command for inserting a selected mention
              // this allows us to call it inside of our custom popup
              // via keyboard navigation and on click

              this.insertMention = command
            },
            onChange: ({ items, query, range, virtualNode }) => {
              this.query = query
              this.filteredUsers = items
              this.suggestionRange = range
              this.navigatedUserIndex = 0
              this.renderPopup(virtualNode)
            },
            onExit: () => {
              // reset all saved values
              this.query = null
              this.filteredUsers = []
              this.suggestionRange = null
              this.navigatedUserIndex = 0
              this.destroyPopup()
            },
            onKeyDown: ({ event }) => {
              if (event.key === 'ArrowUp') {
                this.upHandler()
                return true
              }

              if (event.key === 'ArrowDown') {
                this.downHandler()
                return true
              }

              if (event.key === 'Enter') {
                this.enterHandler()
                return true
              }

              return false
            },
            onFilter: (items, query) => {
              if (!query) {
                return items
              }

              return items.filter((i) => i.name.includes(query))

              /* const fuse = new Fuse(items, { */
              /*   threshold: 0.2, */
              /*   keys: ['name'] */
              /* }) */

              /* return fuse.search(query) */
            }
          })
        ],
        onUpdate: (update) => {
          const apiCall = update.transaction.getMeta('api-call')
          if (apiCall) {
            this.sound.play()
          }

          const saveCall = update.transaction.getMeta('save-request')
          if (saveCall) {
            this.saveStart = saveCall.start
            this.saveEnd = saveCall.end
            window.addEventListener('keydown', this.listenSave)
          }

          window.localStorage.setItem(
            `page${
              this.$router.currentRoute.path === '/'
                ? '/home'
                : this.$router.currentRoute.path
            }`,
            update.getHTML()
          )
        },
        content: window.localStorage.getItem(
          `page${
            this.$router.currentRoute.path === '/'
              ? '/home'
              : this.$router.currentRoute.path
          }`
        )
      }),
      query: null,
      suggestionRange: null,
      filteredUsers: [],
      navigatedUserIndex: 0,
      insertMention: () => {},
      saveStart: null,
      saveEnd: null
    }
  },

  computed: {
    hasResults() {
      return this.filteredUsers.length
    },

    showSuggestions() {
      return this.query || this.hasResults
    }
  },

  mounted() {
    this.editor.focus('end')
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.listenSave)
    this.editor.destroy()
    this.destroyPopup()
  },
  methods: {
    setContent() {
      // you can pass a json document
      this.editor.setContent('')
      // HTML string is also supported
      // this.editor.setContent('<p>This is some inserted text. 👋</p>')
      this.editor.focus()
    },
    listenSave({ key }) {
      if (key === 'Enter') {
        const last = this.editor.selection.to
        const name = this.editor.view.state.doc.cut(this.saveEnd + 2, last)
          .textContent

        this.editor.view.dispatch(
          this.editor.view.state.tr.insertText('', this.saveStart, last)
        )

        window.localStorage.setItem(`page/${name}`, this.editor.getHTML())
        window.localStorage.setItem(`page/home`, '')
        this.setContent()
        this.content = ''
        /* this.$router.push({ path: name }) */
      }
    },
    // navigate to the previous item
    // if it's the first item, navigate to the last one
    upHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + this.filteredUsers.length - 1) %
        this.filteredUsers.length
    },

    // navigate to the next item
    // if it's the last item, navigate to the first one
    downHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + 1) % this.filteredUsers.length
    },

    enterHandler() {
      const user = this.filteredUsers[this.navigatedUserIndex]

      if (user) {
        this.selectUser(user)
      }
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
        this.editor.focus('end')
      }
    },

    getItems() {
      const domainRegexp = /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/g
      // eslint-disable-next-line
      const emailRegexp = /([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)/g
      const html = this.editor.getHTML()
      const domains = html.match(domainRegexp) || []
      const emails = html.match(emailRegexp) || []

      function removeDuplicates(array) {
        return array.filter((a, b) => array.indexOf(a) === b)
      }

      const r = removeDuplicates([...domains, ...emails])

      return r.map((i, index) => ({
        id: index,
        name: i
      }))
    },

    getPages() {
      return Object.keys(localStorage)
        .filter((i) => i.startsWith('page/'))
        .map((page, index) => ({
          name: page.substring(5),
          id: index
        }))
    },

    // we have to replace our suggestion text with a mention
    // so it's important to pass also the position of your suggestion text
    selectUser(user) {
      this.editor.view.dispatch(
        this.editor.view.state.tr.insertText(
          `${user.name}`,
          this.editor.selection.from - (1 + this.query.length),
          this.editor.selection.from
        )
      )

      /* this.insertMention({ */
      /*   range: this.suggestionRange, */
      /*   attrs: { */
      /*     id: user.id, */
      /*     label: user.name */
      /*   } */
      /* }) */

      this.destroyPopup()
      /* this.editor.focus('end') */
    },

    // renders a popup with suggestions
    // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
    renderPopup(node) {
      if (this.popup) {
        return
      }

      // ref: https://atomiks.github.io/tippyjs/v6/all-props/
      this.popup = tippy('.page', {
        getReferenceClientRect: node.getBoundingClientRect,
        appendTo: () => document.body,
        interactive: true,
        sticky: true, // make sure position of tippy is updated when content changes
        plugins: [sticky],
        content: this.$refs.suggestions,
        trigger: 'mouseenter', // manual
        showOnCreate: true,
        theme: 'dark',
        placement: 'top-start',
        inertia: true,
        duration: [400, 200]
      })
    },

    destroyPopup() {
      if (this.popup) {
        /* this.popup[0].destroy() */
        this.popup = null
      }
    }
  }
}
</script>

<style lang="scss">
.page {
  position: relative;
}

.mention {
  background: rgba(#000000, 0.1);
  color: rgba(#000000, 0.6);
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
}

.mention-suggestion {
  color: rgba(#000000, 0.6);
}

.suggestion-list {
  padding: 0.2rem;
  border: 2px solid rgba(#000000, 0.1);
  font-size: 0.8rem;
  font-weight: bold;
  width: 200px;

  &__no-results {
    padding: 0.2rem 0.5rem;
  }

  &__item {
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
    margin-bottom: 0.2rem;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    &.is-selected,
    &:hover {
      background-color: rgba(#fff, 0.2);
    }

    &.is-empty {
      opacity: 0.5;
    }
  }
}

.tippy-box[data-theme~='dark'] {
  background-color: #000000;
  padding: 0;
  font-size: 1rem;
  text-align: inherit;
  color: #ffffff;
  border-radius: 5px;
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
  background: #f5f5f5;
}
</style>
