<template>
  <client-only>
    <editor
      :value.sync="page.content"
      :editable="page.editable"
      @input="save"
    />
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import Editor from '../components/editor/editor'

export default {
  components: {
    Editor
  },

  computed: {
    ...mapState({
      pages: function(state) {
        return state.pages
      },
      page() {
        const page = this.$store.getters['pages/pageByUrl'](
          this.$router.currentRoute.path
        )

        if (page) {
          return page
        }

        return {
          content: ''
        }
      }
    })
  },

  beforeDestroy: function(a, b, c) {
    // delete page if it's empty
    if (
      (this.page.content === '' || this.page.content === '<h1></h1><p></p>') &&
      this.page.id
    ) {
      this.removePage(this.page.id)
    }
  },

  beforeRouteLeave(to, from, next) {
    document.removeEventListener('keydown', this.onKeyDown)
    next()
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setOnEscapeListener()
    })
  },

  methods: {
    addPage() {
      this.$store.commit('pages/addPage')
    },

    toNextPage() {
      this.$store.commit('pages/toNextPage')
    },

    toPreviousPage() {
      this.$store.commit('pages/toPreviousPage')
    },

    save(value) {
      this.$store.commit('pages/saveContent', {
        id: this.page.id,
        url: this.page.url,
        value
      })
    },

    removePage(id) {
      this.$store.commit('pages/removePage', id)
    },

    // On escape
    onKeyDown(e) {
      if (this.$router.currentRoute.path !== '/pages') {
        const { key, metaKey } = e
        if (key === 'Escape') {
          this.$router.push('/pages')
        }
        if (metaKey) {
          if (key === 'ArrowDown') {
            this.toNextPage()
          }
          if (key === 'ArrowUp') {
            this.toPreviousPage()
          }

          if (key === 'ArrowLeft') {
            e.preventDefault()
            this.$router.push('/pages')
          }

          if (key === 'ArrowRight') {
            e.preventDefault()
            /* soundNewPage.play() */
            this.$store.commit('pages/addPage', { redirect: true })
          }
        }
      }
    },

    setOnEscapeListener() {
      if (document) {
        document.addEventListener('keydown', this.onKeyDown)
      }
    }
  }
}
</script>
