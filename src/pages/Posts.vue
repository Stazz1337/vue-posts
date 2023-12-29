<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Breadcrumbs from '../components/Breadcrumbs.vue';

const router = useRouter();

const myItems = [
  {
    name: 'Главная',
    url: '/',
  },
  {
    name: 'Список постов',
    url: '/posts',
  },
];

interface Post {
  id: number;
  title: string;
  body: string;
}

const posts = ref<Post[]>([]);

const openPost = (id: number) => {
  router.push(`/posts/${id}`);
};

const deletePost = (id: number) => {
  const index = posts.value.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts.value.splice(index, 1);
  }
};

const fetchItems = async () => {
  try {
    const { data }: { data: Post[] } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`,
    );
    posts.value = data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchItems();
});
</script>

<template>
  <Breadcrumbs :items="myItems" />
  <section class="posts">
    <ul class="posts__list">
      <li
        class="posts__item"
        v-for="post in posts"
        :key="post.id"
        @click="openPost(post.id)"
        @contextmenu.prevent="deletePost(post.id)">
        <p>#{{ post.id }}</p>
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.posts {
  margin-top: 50px;

  &__list {
    list-style-type: none;
    display: grid;
    gap: 20px;
  }

  &__item {
    border: black solid 1px;
    border-radius: 5px;
    padding: 15px;
    display: grid;
    gap: 10px;
    cursor: pointer;
  }
}
</style>
