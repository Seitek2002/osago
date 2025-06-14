import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ServicesLayout from "@/layouts/ServicesLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        layout: DefaultLayout,
      },
    },
    {
      path: '/documents-form',
      name: 'documents-form',
      component: () => import('../views/DocumentsForm.vue'),
      meta: {
        layout: ServicesLayout,
      },
    },
    {
      path: '/documents-form/:id',
      name: 'documents-form-referal',
      component: () => import('../views/DocumentsForm.vue'),
      meta: {
        layout: ServicesLayout,
      },
    },
    {
      path: '/data-forms',
      name: 'data-forms',
      component: () => import('../views/DataForms.vue'),
      meta: {
        layout: ServicesLayout,
      },
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('../views/Calculator.vue'),
      meta: {
        layout: ServicesLayout,
      },
    },
  ],
})

export default router
