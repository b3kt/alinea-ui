import { boot } from "quasar/wrappers";
import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";
import { sha256 } from "js-sha256";
import localforage from "localforage";
import { mapGetters } from "vuex";

import { useKeycloak } from "@baloise/vue-keycloak";

const SECRET_KEY = sha256("asdo82GFDafsKAJSU628123918G12U~~");
const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);
    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
  },
});

export default boot(async ({ app, router }) => {
  localforage.config({
    driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name: "alineaApp",
    version: 1.0,
    // size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: "datastore", // Should be alphanumeric, with underscores.
    description: "some description",
  });
  app.config.globalProperties.$feeds = localforage.createInstance({
    name: "feeds",
  });
  app.config.globalProperties.$options = localforage.createInstance({
    name: "options",
  });

  // SECURE LOCALSTORAGE UTILS
  app.config.globalProperties.$secureStorage = secureStorage;

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
  } = useKeycloak();

  //MIXIN
  const mixins = {
    data() {
      return {
        config: {
          appName: "Alinea",
          dmsUploadURL: "https://dms.berdaya.in/upload",
          dmsDeleteURL: "https://dms.berdaya.in/",
          defaultImageURL:
            "https://via.placeholder.com/200x300/00a89c/ffffff?text=No%20Cover",
        },
        dialogDashboard: {
          title: "test",
          displayed: true,
          maximized: false,
        },
      };
    },
    computed: {
      isAuthenticated() {
        const session = this.$secureStorage.getItem("session");
        return session !== undefined && session !== null ? session.isAuthenticated : false;
      },
      getSession() {
        const session = this.$secureStorage.getItem("session");
        return session !== undefined && session !== null ? session : {}; 
      },
      getLoginUrl() {
        return this.$keycloak !== undefined ? this.$keycloak.createLoginUrl() : null;
      },
      getLogoutUrl() {
        return this.$keycloak !== undefined ? this.$keycloak.createLogoutUrl() : null;
      },
      getRegisterUrl() {
        return this.$keycloak !== undefined ? this.$keycloak.createRegisterUrl() : null;
      },
      getUserUID(){
        const session = this.$secureStorage.getItem("session");
        return session !== undefined && session !== null ? session.decodedToken.sub : null; 
      },
      getUserGroups(){
        const session = this.$secureStorage.getItem("session");
        return session !== undefined && session !== null ? session : null; 
      },
      ...mapGetters({
        dialog: "ui/getLoginDialog",
        requireLogin: "ui/getRequireLogin",
      }),
    },
    methods: {
      initSession() {
        console.log("--");
        console.log(keycloak);
        console.log("--");
        if(isAuthenticated.value){
          const obtainedRoles = this.$secureStorage.getItem("session"); 
          if(obtainedRoles === undefined || obtainedRoles === null){
            this.$secureStorage.setItem("session", {
              isAuthenticated: isAuthenticated.value,
              roles: roles.value,
              username: username.value,
              token: token.value,
              decodedToken: decodedToken.value,
              // keycloak: keycloak
            });
          }
        }
      }
    },
    created() {
      this.initSession();
    },
  };
  app.mixin(mixins);
});

export { secureStorage }
