import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import App from './App.vue';

const routes = [
  { path: '/', name: 'home', component: () => import('./pages/Home.vue') },
  { path: '/posts', name: 'posts', component: () => import('./pages/Posts.vue') },
  { path: '/posts/:id', name: 'postDetail', component: () => import('./pages/PostDetail.vue') },
];

const router = createRouter({ history: createWebHistory(), routes });

const app = createApp(App);

app.use(router);

app.mount('#app');
