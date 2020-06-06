<template>
  <client-only>
    <editor :value.sync="content" />
  </client-only>
</template>

<script>
import Editor from '../components/editor/editor'

export default {
  components: {
    Editor
  },

  data() {
    return {
      content:
        '<h1></h1><p></p><h2>API</h2><ul><li><p><strong>/hunt </strong><em> {domain}</em></p></li><li><p><strong>/crunch </strong> <em>{domain}</em></p></li><li><p><strong>/clearbit </strong> <em>{domain, email}</em></p></li><li><p><strong>/s </strong> <em>{word,  sentence} - get synonym or paraphrase</em></p></li></ul><p></p><h2>Email </h2><ul><li><p><strong>/inbox</strong></p></li><li><p><strong>/e </strong><em>- send</em></p></li></ul><p></p><h2>Pages </h2><ul><li><p><strong>/n </strong><em>- new page</em></p></li><li><p><strong>// </strong><em>- insert link to page</em></p></li><li><p><strong>&gt;</strong><em> -</em><strong> </strong><em>go to page</em></p></li></ul><p></p><p></p><p></p><p></p>'
    }
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
    back({ keyCode }) {
      // On escape move between currently opened page and home
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
