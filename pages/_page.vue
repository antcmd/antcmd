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
  mounted: function() {
    document.addEventListener('keydown', this.handleKeyDown)
  },
  beforeDestroy: function() {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleKeyDown({ keyCode }) {
      if (keyCode === 27) this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss"></style>
