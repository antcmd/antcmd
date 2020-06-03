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
    <editor-menu-bubble
      :editor="editor"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu }"
    >
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon-base width="16" height="16"><icon-bold /></icon-base>
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon-base width="16" height="16"><icon-italic /></icon-base>
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon-base width="16" height="16"><icon-underline /></icon-base>
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon-base width="16" height="16"><icon-strike /></icon-base>
        </button>
      </div>
    </editor-menu-bubble>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
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

const sound1 = new Howl({
  src: '/sounds/dland__hint.wav',
  volume: 0.5
})
const sound2 = new Howl({
  src: '/sounds/digital_life.wav',
  sprite: {
    digital: [0, 300]
  },
  volume: 0.5
})
const sound3 = new Howl({
  src: '/sounds/confirmation-upward.wav',
  volume: 0.5
})
const sound4 = new Howl({
  src: '/sounds/power08.wav',
  volume: 0.5
})
const sound5 = new Howl({
  src: '/sounds/casual/click.wav',
  volume: 0.5
})
const sound6 = new Howl({
  src: '/sounds/casual/click4.wav',
  volume: 0.5
})
const sound7 = new Howl({
  src: '/sounds/casual/click2.wav',
  volume: 0.5
})
const sound8 = new Howl({
  src: '/sounds/casual/switch.wav',
  volume: 0.5
})
const sound9 = new Howl({
  src: '/sounds/casual/click3.wav',
  volume: 0.5
})

export default {
  components: {
    EditorContent,
    EditorMenuBubble,
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
      sound: sound8,
      keepInBounds: true,
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

          const soundCall = update.transaction.getMeta('sound-call')
          if (soundCall) {
            switch (soundCall.sound) {
              case 'sound1':
                sound1.play()
                this.sound = sound1
                break
              case 'sound2':
                sound2.play('digital')
                sound2.fade(0.6, 0, 300)
                this.sound = sound2
                break
              case 'sound3':
                sound3.play()
                this.sound = sound3
                break
              case 'sound4':
                sound4.play()
                this.sound = sound4
                break
              case 'sound5':
                sound5.play()
                this.sound = sound5
                break
              case 'sound6':
                sound6.play()
                this.sound = sound6
                break
              case 'sound7':
                sound7.play()
                this.sound = sound7
                break
              case 'sound8':
                sound8.play()
                this.sound = sound8
                break
              case 'sound9':
                sound9.play()
                this.sound = sound9
                break
              default:
                sound1.play()
            }
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

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #fff;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.is-active {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: #fff;
  }
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
