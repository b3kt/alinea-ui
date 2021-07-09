import { boot } from 'quasar/wrappers'
import { vueKeycloak } from '@baloise/vue-keycloak'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {

  
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      
      // something to do
      app.use(vueKeycloak, {
        initOptions: {
          flow: 'standard', // default
          checkLoginIframe: false, // default
          onLoad: 'login-required', // default
        },
        config: {
          url: 'https://alinea-keycloak.herokuapp.com/auth/',
          realm: 'alinea',
          clientId: 'account'
        }
      })
      
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!app.config.globalProperties.$keycloak.isAuthenticated) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })

  
})
