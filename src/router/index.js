import { createRouter, createWebHistory } from 'vue-router'
import DocumentsForm from '../views/DocumentsForm.vue'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ServicesLayout from "@/layouts/ServicesLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'documents-form',
      component: DocumentsForm,
      meta: {
        layout: DefaultLayout,
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
