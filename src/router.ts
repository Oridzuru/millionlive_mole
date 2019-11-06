import Vue from 'vue';
import Router from 'vue-router';
import Event from './views/event.vue';
import EventSearch from './views/eventSearch.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event',
      component: () => import('./views/event.vue'),
      // component: Event,
    },
    {
      path: '/eventSearch',
      name: 'eventSearch',

      component: () => import('./views/eventSearch.vue'),
      // component: EventSearch,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
