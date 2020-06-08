<template>
  <client-only>
    <editor :value.sync="value" :editable="editable" />
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import Editor from '../components/editor/editor'

export default {
  components: {
    Editor
  },

  data() {
    return {
      editable: false
    }
  },

  computed: {
    ...mapState({
      pages: function(state) {
        return state.pages.pages
      },
      value: function(state) {
        let value = '<h1>Pages</h1>'

        this.pages.map(
          (p) => (value += `<p><a href=${p.url}>${p.title}</a></p>`)
        )

        return value
      }
    })
  },

  beforeDestroy: function() {
    document.removeEventListener('keydown', this.onKeyDown)
  },

  mounted() {
    document.addEventListener('keydown', this.onKeyDown)
  },

  methods: {
    onKeyDown(e) {
      const { key, metaKey } = e

      if (key === 'Escape') {
        this.$router.back()
      }

      if (metaKey) {
        if (key === 'ArrowLeft') {
          e.preventDefault()
        }
        if (key === 'ArrowRight') {
          e.preventDefault()
          this.$router.back()
        }
      }
    }
  }
}
</script>
