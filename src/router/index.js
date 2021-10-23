import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'base',
        path: '/',
        component: () => import('@pages/index.vue'),
    }
];

const Router = createRouter({
    history: createWebHistory(),
    routes,
})

export default Router;