import { boot } from 'quasar/wrappers'
import { vueKeycloak } from '@baloise/vue-keycloak'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
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
})
