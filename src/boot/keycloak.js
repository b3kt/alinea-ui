import { boot } from "quasar/wrappers";
import { vueKeycloak } from "@baloise/vue-keycloak";

// keycloak configuration
const keycloakConfig = {
  initOptions: {
    flow: "standard", // default
    checkLoginIframe: false, // default
    onLoad: "login-required", // login-required default
  },
  config: {
    url: "https://alinea-keycloak.herokuapp.com/auth/",
    realm: "alinea",
    clientId: "account",
  },
};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  
  // to handle session in public routes
  if(app.config.globalProperties.$secureStorage.getItem('isRequireLogin')){
    app.use(vueKeycloak, keycloakConfig);
  }
  
  // check router which is require authentication
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
  
      if (
        app.config.globalProperties.$keycloak === undefined ||
        app.config.globalProperties.$keycloak === null
      ) {
        // store to secured localstorage
        app.config.globalProperties.$secureStorage.setItem('isRequireLogin', true);
        app.use(vueKeycloak, keycloakConfig);
        next();
      } else {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!app.config.globalProperties.$keycloak.isAuthenticated) {
          next({
            path: "/403",
            query: { redirect: to.fullPath },
          });
        } else {
          next();
        }
      }
    } else {
      next(); // make sure to always call next()!
    }
  });
});

export { vueKeycloak, keycloakConfig };
