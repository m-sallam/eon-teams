import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Landing from './views/Landing.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/landing',
      name: 'landing',
      component: Landing,
      meta: { notAvailableInAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
      meta: { notAvailableInAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta: { notAvailableInAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/projects/:id',
      component: () => import(/* webpackChunkName: "project" */ './views/Project.vue'),
      meta: { requiresAuth: true, requiresProject: true },
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: "project" */ './components/project/overview/Index.vue'),
          meta: { requiresAuth: true, requiresProject: true }
        },
        {
          path: 'lists',
          component: () => import(/* webpackChunkName: "project" */ './components/project/tasks/Index.vue'),
          meta: { requiresAuth: true, requiresProject: true },
          children: [
            {
              path: ':listId',
              component: () => import(/* webpackChunkName: "project" */ './components/project/tasks/List.vue'),
              meta: { requiresAuth: true, requiresProject: true }
            }
          ]
        },
        {
          path: 'chat',
          component: () => import(/* webpackChunkName: "project" */ './components/project/chat/Index.vue'),
          meta: { requiresAuth: true, requiresProject: true }
        }
      ]
    }
  ],
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  store.dispatch('enableGlobalLoading')
  if (!store.state.ready) {
    await store.dispatch('autoLogin')
    store.dispatch('setReady')
  }
  if (to.matched.some(record => record.meta.notAvailableInAuth) && store.getters.isAuthenticated) {
    next({ path: '/', replace: true })
  } else if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isAuthenticated) {
    next({ path: '/landing', replace: true })
  } else if (to.matched.some(record => record.meta.requiresProject) && store.getters.isAuthenticated) {
    let res = await store.dispatch('getProject', to.params.id)
    if (res.status) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  store.dispatch('disableGlobalLoading')
})

export default router
