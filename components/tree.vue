<template>
  <div>
    <div :style="indent" v-if="label">
      <nuxt-link :to="url" class="page-link">
        {{ label }}
      </nuxt-link>
    </div>
    <tree-menu
      v-for="page in children"
      :key="page.id"
      :children="page.children"
      :label="page.title"
      :url="page.url"
      :depth="depth + 1"
    >
    </tree-menu>
  </div>
</template>

<script>
export default {
  name: 'TreeMenu',
  props: ['children', 'label', 'url', 'depth'],
  computed: {
    indent() {
      return { transform: `translate(${this.depth * 24}px)` }
    }
  }
}
</script>
