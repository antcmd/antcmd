<template>
  <client-only>
    <editor :value.sync="content" @input="save" />
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
    const page =
      this.$router.currentRoute.path === '/'
        ? 'home'
        : this.$router.currentRoute.path.substr(1)

    return { page }
  },

  computed: {
    // Get content for current page from Vuex store
    ...mapState({
      content: function(state) {
        return state.editor.content[this.page]
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
    save(value) {
      this.$store.commit('editor/save', { page: this.page, value })
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
