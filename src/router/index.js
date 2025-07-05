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
      path: '/choose-form',
      name: 'choose-form',
      component: () => import('../views/ChooseForm.vue'),
      meta: {
        layout: ServicesLayout,
      },
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/Success.vue'),
      meta: {
        layout: ServicesLayout,
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
      name: 'documents-form-id',
      component: () => import('../views/DocumentsForm.vue'),
      meta: {
        layout: ServicesLayout,
      },
    },
    {
      path: '/documents-form-2',
      name: 'documents-form-2',
      component: () => import('../views/DocumentsForm2.vue'),
      meta: {
        layout: ServicesLayout,
      },
    },
    {
      path: '/documents-form-2/:id',
      name: 'documents-form-2-id',
      component: () => import('../views/DocumentsForm2.vue'),
      meta: {
        layout: ServicesLayout,
      },
    },
    {
      path: '/:id',
      name: 'documents-form-referal',
      component: () => import('../views/ChooseForm.vue'),
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
      path: '/data-forms-2',
      name: 'data-forms-2',
      component: () => import('../views/DataForms2.vue'),
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
