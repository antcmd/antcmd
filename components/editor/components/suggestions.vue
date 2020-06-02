<template>
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
</template>

<script>
import Fuse from 'fuse.js'
import tippy, { sticky } from 'tippy.js'

import Mention from './extensions/Mention'

export default {
  data() {
    const mention = new Mention({
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

        const fuse = new Fuse(items, {
          threshold: 0.2,
          keys: ['name']
        })

        return fuse.search(query)
      }
    })

    return {
      mention,
      query: null,
      suggestionRange: null,
      filteredUsers: [],
      navigatedUserIndex: 0,
      insertMention: () => {}
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
    this.editor.destroy()
    this.destroyPopup()
  },
  methods: {
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
            this.editor.selection.from - 7,
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
      const domains = this.editor.getHTML().match(domainRegexp) || []

      function removeDuplicates(array) {
        return array.filter((a, b) => array.indexOf(a) === b)
      }

      const r = removeDuplicates(domains)

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
          this.editor.selection.from - 1,
          this.editor.selection.from
        )
      )

      this.destroyPopup()
      this.editor.focus('end')
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
</style>
