<template>
  <client-only>
    <editor></editor>
  </client-only>
</template>

<script>
import Editor from '../components/editor/editor'

export default {
  components: {
    Editor
  },
  beforeDestroy: function() {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path !== '/') {
        vm.setListener()
      }
    })
  },
  methods: {
    setListener() {
      if (document) {
        document.addEventListener('keydown', this.handleKeyDown)
      }
    },
    handleKeyDown({ keyCode }) {
      if (keyCode === 27) this.$router.back()
    }
  }
}
</script>

<style lang="scss"></style>
