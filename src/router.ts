import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event',
      component: () => import('./views/event.vue'),
    },
    {
      path: '/eventSearch',
      name: 'eventSearch',
      component: () => import('./views/eventSearch.vue'),
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('./views/card.vue'),
    },
    {
      path: '/cardview/:id',
      name: 'cardview',
      component: () => import('./views/cardView.vue'),
    },
  ],
});
