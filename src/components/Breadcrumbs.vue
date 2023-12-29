<script setup lang="ts">
import type { PropType } from 'vue';

interface Item {
  url: string;
  name: string;
}

defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
});
</script>

<template>
  <nav v-if="items && items.length" class="breadcrumbs">
    <ol>
      <li v-for="(item, itemIndex) in items" :key="itemIndex">
        <router-link
          v-if="itemIndex !== items.length - 1"
          :to="item.url"
          :title="item.name"
          class="breadcrumbs__link">
          {{ item.name }}
        </router-link>
        <span v-else>{{ item.name }}</span>
        <span v-if="items[itemIndex + 1]" class="breadcrumbs__separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  background-color: #f7f7f7;
  border-radius: 4px;
  ol,
  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 7px 15px;
    li {
      color: #222222;
      .breadcrumbs__link {
        font-weight: 600;
        color: #222222;
        text-decoration: underline;
        &:hover {
          color: blue;
        }
      }

      .breadcrumbs__separator {
        color: hsla(0, 0%, 13%, 0.563);
        margin: 0.3rem;
      }
    }
  }
}
</style>
