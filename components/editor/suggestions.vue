<template>
  <div v-show="showSuggestions" ref="suggestions" class="suggestion-list">
    <template v-if="hasResults">
      <div
        v-for="(suggestion, index) in filteredSuggestions"
        :key="suggestion.id"
        class="suggestion-list__item"
        :class="{ 'is-selected': selectedIndex === index }"
        @click="onSelectSuggestion(suggestion)"
      >
        {{ suggestion.name }}
      </div>
    </template>
    <div v-else class="suggestion-list__item is-empty">
      No users found
    </div>
  </div>
</template>

<script>
import tippy, { sticky } from 'tippy.js'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      suggestionQuery: function(state) {
        return state.suggestions.suggestionQuery
      },
      suggestionRange: function(state) {
        return state.suggestions.suggestionRange
      },
      filteredSuggestions: function(state) {
        return state.suggestions.filteredSuggestions
      },
      selectedIndex: function(state) {
        return state.suggestions.selectedIndex
      }
    }),
    hasResults() {
      return this.filteredSuggestions.length
    },
    showSuggestions() {
      return this.suggestionQuery || this.hasResults
    }
  },

  beforeDestroy() {
    this.destroyPopup()
  },

  methods: {
    onUp() {
      this.$store.commit('suggestions/onUp')
    },
    onDown() {
      this.$store.commit('suggestions/onDown')
    },
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.onUp()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.onDown()
        return true
      }

      if (event.key === 'Enter') {
        this.onEnter()
        return true
      }

      return false
    },

    onEnter() {
      /* this.$store.commit('suggestions/onEnter') */
      const suggestion = this.filteredSuggestions[this.selectedIndex]

      if (suggestion) {
        this.$attrs.select(suggestion)
      }
    },
    onSuggestionStart({ items, query, range, command, virtualNode }) {
      this.$store.commit('suggestions/onSuggestionStart', {
        items,
        query,
        range,
        command
      })

      this.renderPopup(virtualNode)
    },

    onExit() {
      this.$store.commit('suggestions/onExit')

      this.destroyPopup()
    },

    onChange({ items, query, range, virtualNode }) {
      this.$store.commit('suggestions/onChange', {
        items,
        query,
        range
      })
      this.renderPopup(virtualNode)
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
