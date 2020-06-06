<template>
  <client-only>
    <editor
      :value.sync="page.content"
      :disabled="page.disabled"
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
          console.log('if page')
          return page
        } else {
          console.log('if not')
          this.addPage()

          const pages = this.$store.getters['pages/pages']
          return pages[pages.length - 1]
        }
      }
    })
  },

  beforeDestroy: function() {
    document.removeEventListener('keydown', this.back)
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // Only execute router.back if you don't come from other websites
      /* if (from.path !== '/') { */ /* } */
      vm.setOnEscapeListener()
    })
  },

  methods: {
    addPage() {
      this.$store.commit('pages/addPage', { title: '', value: '' })
    },

    save(value) {
      this.$store.commit('pages/saveContent', { url: this.page.url, value })
    },

    back({ keyCode }) {
      // On escape
      if (keyCode === 27) this.$router.back()
    },

    setOnEscapeListener() {
      if (document) {
        document.addEventListener('keydown', this.back)
      }
    }
  }
}
</script>
