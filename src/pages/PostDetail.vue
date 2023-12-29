<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import Breadcrumbs from '../components/Breadcrumbs.vue';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  website: string;
  phone: string;
}

const route = useRoute();
const postId = Number(route.params.id);

const post = ref<Post | null>(null);
const user = ref<User | null>(null);

const myItems = [
  {
    name: 'Главная',
    url: '/',
  },
  {
    name: 'Список постов',
    url: '/posts',
  },
  {
    name: `Пост №` + postId,
    url: '/posts/:id',
  },
];

const fetchPost = async () => {
  try {
    const { data }: { data: Post } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    post.value = data;
    const userId = data.userId;

    const { data: userData }: { data: User } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );

    user.value = userData;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<template>
  <Breadcrumbs :items="myItems" />
  <div v-if="post" class="post-detail">
    <p>#{{ post.id }}</p>
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <p>By: {{ user?.username }}</p>
    <p>Email: {{ user?.email }}</p>
    <p>Phone: {{ user?.phone }}</p>
    <p>From: {{ user?.website }}</p>
  </div>
</template>

<style scoped lang="scss">
.post-detail {
  border: black solid 1px;
  border-radius: 5px;
  padding: 15px;
  display: grid;
  gap: 10px;
  margin-top: 50px;
}
</style>
