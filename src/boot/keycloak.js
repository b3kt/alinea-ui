import { boot } from "quasar/wrappers";
import Keycloak from "keycloak-js";
import vue from "vue";
import { secureStorage } from "boot/app";
// import jwtDecode from "jwt-decode";

// keycloak configuration
const options = {
  initOptions: {
    flow: "standard", // default
    checkLoginIframe: false, // default
    onLoad: "login-required", // login-required default
  },
  config: {
    url: "https://lemur-4.cloud-iam.com/auth/",
    realm: "alinea",
    clientId: "alinea-ui",
  },
};

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}
const Keycloak__default = /*#__PURE__*/ _interopDefaultLegacy(Keycloak);

function isPromise(promise) {
  return !isNil(promise) && typeof promise.then === "function";
}
function isFunction(fun) {
  return !isNil(fun) && typeof fun === "function";
}
function isString(text) {
  return !isNil(text) && (typeof text === "string" || text instanceof String);
}
function isNil(value) {
  return value === undefined || value === null;
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  let $keycloak = undefined;



  async function isTokenReady() {
    return new Promise((resolve) => checkToken(resolve));
  }
  const checkToken = (resolve) => {
    if (!isNil($keycloak) && !isNil($keycloak.token)) {
      resolve();
    } else {
      setTimeout(() => checkToken(resolve), 500);
    }
  };
  function getKeycloak() {
    return $keycloak;
  }
  async function getToken() {
    return updateToken();
  }
  async function updateToken() {
    if (!$keycloak) {
      throw new Error("Keycloak is not initialized.");
    }
    try {
      await $keycloak.updateToken(10);
      store.commit('keycloak/setToken',$keycloak.token);
    } catch (error) {
      store.commit('keycloak/hasFailed',true);
      throw new Error(
        "Failed to refresh the token, or the session has expired"
      );
    }
    return $keycloak.token;
  }
  function createKeycloak(config) {
    $keycloak = Keycloak__default["default"](config);
    return getKeycloak();
  }
  async function initKeycloak(initConfig) {
    try {
      store.commit('keycloak/isPending',true);
      const _isAuthenticated = await $keycloak.init(initConfig);
      store.commit('keycloak/isAuthenticated',_isAuthenticated);
      if (!isNil($keycloak.token)) {
        store.commit('keycloak/setToken',$keycloak.token);
        $keycloak.onAuthRefreshSuccess = () => {store.commit('keycloak/setToken',$keycloak.token); };
        $keycloak.onTokenExpired = () => updateToken();
        
      } else {
        store.commit('keycloak/isAuthenticated',false);
        console.log("running guest mode");
      }
    } catch (error) {
      console.log(error)
      store.commit('keycloak/hasFailed',true);
      store.commit('keycloak/isAuthenticated',false);
      throw new Error("unable read access token");
    } finally {
      store.commit('keycloak/isPending',false);
    }
  }

  const useKeycloak = () => {
    return Object.assign(Object.assign({}, vue.toRefs(state)), {
      keycloak: getKeycloak(),
      hasRoles: (roles) =>
        !isNil(roles) &&
        state.isAuthenticated &&
        roles.every((role) => state.roles.includes(role)),
    });
  };

  const defaultInitConfig = {
    flow: "standard",
    checkLoginIframe: false,
    onLoad: "login-required",
  };

  function loadJsonConfig(url) {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.overrideMimeType("application/json");
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (200 <= this.status && this.status <= 400) {
            const jsonResponse = this.responseText;
            const response = JSON.parse(jsonResponse);
            resolve(response);
          } else {
            reject("Could not load " + url + " file");
          }
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    });
  }

  if (isNil(options)) {
    throw new Error("The Keycloak.KeycloakConfig are requried");
  }
  let keycloakPluginConfig;
  if (isString(options)) {
    keycloakPluginConfig = await loadJsonConfig(options);
  } else if (isPromise(options) || isFunction(options)) {
    keycloakPluginConfig = await options();
  } else {
    keycloakPluginConfig = options;
  }
  const keycloakConfig = keycloakPluginConfig.config;

  const keycloakInitOptions = !isNil(keycloakPluginConfig.initOptions)
    ? Object.assign(
        Object.assign({}, defaultInitConfig),
        keycloakPluginConfig.initOptions
      )
    : defaultInitConfig;
  const _keycloak = createKeycloak(keycloakConfig);

  app.config.globalProperties.$keycloak = _keycloak;

  const isRequireAuth = secureStorage.getItem("is_require_auth");
  if (!isNil(isRequireAuth) && isRequireAuth && (_keycloak.authenticated === undefined || !_keycloak.authenticated)) {
    await initKeycloak(keycloakInitOptions);
  }
  
});
