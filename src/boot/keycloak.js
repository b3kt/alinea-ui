import { boot } from "quasar/wrappers";
import { vueKeycloak } from "@baloise/vue-keycloak";

import { useKeycloak } from '@baloise/vue-keycloak'

const {
  isAuthenticated,
  isPending,
  hasFailed,
  token,
  decodedToken,
  username,
  roles,
  keycloak,

  // Functions
  hasRoles,
} = useKeycloak()

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

// async function initAsync(app,store) {
//   if(app !== undefined && store !== undefined){
//     app.use(vueKeycloak, keycloakConfig);
//     store.commit("ui/setKeycloakInstance", app.config.globalProperties.$keycloak);
//   }
// }

function initSync(app,store) {
  // if(app !== undefined && store !== undefined){
  //   (async () => initAsync(app,store))();
  // }
  app.use(vueKeycloak, keycloakConfig);
  store.commit("ui/setKeycloakInstance", app.config.globalProperties.$keycloak);
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  
  // set default value
  // app.config.globalProperties.$keycloak = {
  //   isAuthenticated: false,
  //   token: null
  // }

  // to handle session in public routes
  if(app.config.globalProperties.$secureStorage.getItem('isRequireLogin')){
    initSync(app,store);
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
        initSync(app,store);
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
