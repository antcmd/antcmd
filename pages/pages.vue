<template>
  <client-only>
    <div class="navigation">
      <input
        ref="searchInput"
        :value="searchQuery"
        name="search"
        type="text"
        class="search"
        placeholder="Search"
        autofocus="true"
        @input="onChange"
      />
      <div class="body">
        <div class="pages-folder">Pages</div>
        <nuxt-link
          v-for="page in pages"
          :key="page.url"
          :to="page.url"
          class="page-link"
        >
          {{ page.title }}
        </nuxt-link>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      searchQuery: ''
    }
  },

  computed: {
    ...mapState({
      pages: function(state) {
        return state.pages.pages.filter((i) =>
          i.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
    })
  },

  beforeDestroy: function() {
    document.removeEventListener('keydown', this.onKeyDown)
  },

  mounted() {
    /* this.$refs.input.focus() */
    document.addEventListener('keydown', this.onKeyDown)
  },

  updated() {
    if (this.$refs.searchInput) {
      this.$refs.searchInput.focus()
    }
  },

  methods: {
    onKeyDown(e) {
      // TODO: on Enter move to page
      const { key, metaKey } = e

      if (key === 'Enter') {
        const page = this.pages[0]

        if (page) {
          this.$router.push(page.url)
        }
        /* this.$router.back() */
      }

      if (key === 'Escape') {
        this.$router.back()
      }

      if (metaKey && key === 'o') {
        e.preventDefault()
        this.$router.back()
      }

      if (metaKey && key === 'p') {
        e.preventDefault()
        this.$store.commit('pages/addPage', { redirect: true })
      }
    },

    onChange({ target }) {
      this.searchQuery = target.value
    }
  }
}
</script>

<style lang="scss">
.navigation {
  position: relative;
  display: flex;
  padding-top: 140px;
  padding-bottom: 22px;
  padding-left: 0px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  background-image: none;
  background-position: 0px 0px;
  -webkit-filter: none;
  filter: none;
}

.search {
  width: 655px;
  height: 52px;
  margin-bottom: 40px;
  padding: 0px;
  border: none;
  background-color: transparent;
  color: #000;
  font-size: 42px;
  line-height: 46px;
  font-weight: 700;
  outline: none;
}

.search::placeholder {
  color: rgba(1, 23, 49, 0.36);
}

.body {
  width: 655px;
  display: flex;
  flex-direction: column;
}

.page-link {
  color: #0c77f8;
  font-size: 18px;
  line-height: 30px;
  font-weight: 500;
  padding: 10px 0px;
}

.pages-folder {
  display: flex;
  margin-right: 0px;
  margin-bottom: 0px;
  padding: 5px 13px 5px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  order: -1;
  border-style: none none solid;
  border-width: 1px 1px 2px 3px;
  border-color: rgba(0, 0, 0, 0.09) rgba(0, 0, 0, 0.09) rgba(0, 0, 0, 0.09)
    hsla(0, 0%, 46.7%, 0.07);
  font-weight: 600;
  padding-right: 7px;
  padding-left: 0px;
  font-size: 18px;
  line-height: 30px;
  white-space: normal;
}
</style>
