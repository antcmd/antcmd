<template>
  <div class="container">
    <tree-menu
      :label="tree.title"
      :children="tree.children"
      :depth="0"
    ></tree-menu>
  </div>
</template>

<script>
import TreeMenu from '../components/tree.vue'

const tree = {
  id: 1,
  title: 'root',
  children: [
    {
      id: 2,
      title: 'item1',
      children: [
        {
          id: 3,
          title: 'item1.1'
        },
        {
          id: 4,
          title: 'item1.2',
          children: [
            {
              id: 5,
              title: 'item1.2.1'
            }
          ]
        }
      ]
    },
    {
      id: 6,
      title: 'item2'
    }
  ]
}

export default {
  components: {
    TreeMenu
  },
  data() {
    return {
      tree
    }
  }
}
</script>
