import { boot } from "quasar/wrappers";
import Keycloak from "keycloak-js";
import { secureStorage } from "boot/app";

// keycloak configuration
const defaultInitConfig = {
  flow: "standard",
  checkLoginIframe: false,
  onLoad: "login-required",
};

const options = {
  initOptions: defaultInitConfig,
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
function createKeycloak(config) {
  return Keycloak__default["default"](config);
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  
  async function updateToken(keycloak) {
    if (!keycloak) {
      throw new Error("Keycloak is not initialized.");
    }
    try {
      await keycloak.updateToken(10);
      store.commit('keycloak/setToken',keycloak.token);
    } catch (error) {
      store.commit('keycloak/hasFailed',true);
      throw new Error(
        "Failed to refresh the token, or the session has expired"
      );
    }
    return keycloak.token;
  }

  async function initKeycloak(initConfig, keycloak) {
    try {
      store.commit('keycloak/isPending',true);

      const kc = secureStorage.getItem('keycloak');
      if(isNil(kc)){
        const _isAuthenticated = await keycloak.init(initConfig);
        store.commit('keycloak/isAuthenticated',_isAuthenticated);
      }else{
        console.log(kc)

        keycloak = kc; 
        store.commit('keycloak/isAuthenticated',true);
      }

      if (!isNil(keycloak.token)) {
        store.commit('keycloak/setToken',keycloak.token);
        keycloak.onAuthRefreshSuccess = () => {store.commit('keycloak/setToken',keycloak.token); };
        keycloak.onTokenExpired = () => updateToken(keycloak);
        
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
  const isRequireAuth = secureStorage.getItem("is_require_auth");
  if (!isNil(isRequireAuth) && isRequireAuth && (_keycloak.authenticated === undefined || !_keycloak.authenticated)) {
    await initKeycloak(keycloakInitOptions, _keycloak);
  }

  app.config.globalProperties.$keycloak = _keycloak;
  
});
