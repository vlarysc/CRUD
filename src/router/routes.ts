import { RouteConfig } from 'vue-router';
import Vue from 'vue';
import Router from 'vue-router'
import Index from 'pages/Index.vue'
import Cadastro from '../components/Cadastro.vue'


const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/cadastro/:id', component: () => import('../components/Pessoa.vue') },
      { path: '/cadastro/:id/enderecos', component: () => import('../components/Enderecos.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
