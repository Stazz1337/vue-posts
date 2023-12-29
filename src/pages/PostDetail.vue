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

interface PostResponse {
  data: Post;
}

interface UserResponse {
  data: User;
}

const route = useRoute();
const postId = Number(route.params.id) as number;

const post = ref<Post | null>(null);
const user = ref<User | null>(null);

const userId = sessionStorage.getItem('userId') ? Number(sessionStorage.getItem('userId')) : null;

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

const fetchPost = async (): Promise<void> => {
  try {
    const postResponse = axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const userResponse = axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);

    const [postData, userData]: [PostResponse, UserResponse] = await Promise.all([
      postResponse,
      userResponse,
    ]);

    post.value = postData.data;
    user.value = userData.data;
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
