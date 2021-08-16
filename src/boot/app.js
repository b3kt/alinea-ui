import { boot } from "quasar/wrappers";
import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";
import { sha256 } from "js-sha256";
import localforage from "localforage";
import { mapGetters } from "vuex";
import { openURL, Notify } from "quasar";
// import { createDynamicForms } from "@asigloo/vue-dynamic-forms";
import { axiosUploadInstance } from "boot/axios";
// import FormData from 'form-data';
// import fs from 'fs';

Notify.setDefaults({
  position: "bottom-right",
  timeout: 3000,
  textColor: "white",
});

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

const getContextHeaders = () => {
  const session = secureStorage.getItem("session");
  if (
    session !== undefined &&
    session !== null &&
    session.token !== undefined &&
    session.token !== null
  ) {
    return {
      headers: {
        Authorization: "Bearer " + session.token,
      },
    };
  } else {
    return null;
  }
};

export default boot(async ({ app, router }) => {
  // const VueDynamicForms = createDynamicForms({});
  // app.use(VueDynamicForms);

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

  //MIXIN
  const mixins = {
    data() {
      return {
        config: {
          appName: "Alinea",
          defaultImageURL:
            "https://via.placeholder.com/200x300/00a89c/ffffff?text=alinea",
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
        return session !== undefined && session !== null
          ? session.isAuthenticated
          : false;
      },
      getSession() {
        const session = this.$secureStorage.getItem("session");
        return session !== undefined && session !== null ? session : {};
      },
      getLoginUrl() {
        return this.$keycloak !== undefined
          ? this.$keycloak.createLoginUrl()
          : null;
      },
      getLogoutUrl() {
        return this.$keycloak !== undefined
          ? this.$keycloak.createLogoutUrl()
          : null;
      },
      getRegisterUrl() {
        return this.$keycloak !== undefined
          ? this.$keycloak.createRegisterUrl()
          : null;
      },
      getCurrentRole() {
        return this.$secureStorage.getItem("current_role");
      },
      getUserUID() {
        const session = this.$secureStorage.getItem("session");
        return session !== undefined && session !== null
          ? session.decodedToken.sub
          : null;
      },
      getUserGroups() {
        const session = this.$secureStorage.getItem("session");
        return session !== undefined && session !== null ? session : null;
      },
      ...mapGetters({
        loginDialog: "ui/getLoginDialog",
        dashboardDialog: "ui/getDashboardDialog",
        requireLogin: "ui/getRequireLogin",
        isAuthenticated: "keycloak/isAuthenticated",
        myProfile: "model/getProfile",
        getDialogForm: "ui/getDialogForm",
        getDialogModel: "ui/getDialogModel",
      }),
      isProfileCompleted() {
        return (
          this.myProfile !== undefined &&
          this.myProfile !== null
        );
      },
    },
    methods: {
      sanitize(value) {
        return value.split("&state=")[0];
      },
      isNil(value) {
        return value === undefined || value === null;
      },
      isNotEmpty(value) {
        return value !== undefined && value !== null && value.length > 0;
      },
      onResetFormData() {
        this.$store.commit("ui/resetFormModel");
      },
      doLogout() {
        if (this.getLogoutUrl !== undefined && this.getLogoutUrl !== null) {
          this.$secureStorage.clear();
          openURL(this.getLogoutUrl);
        } else {
          alert("already logged out");
        }
      },
      doUpload(uploadObj) {
        const FormData = require("form-data");
        const session = secureStorage.getItem("session");        
        const formData = new FormData();
        formData.append('id', uploadObj.id);
        formData.append('name', uploadObj.name);
        formData.append('field', uploadObj.field);
        formData.append('file', uploadObj.file);

        return axiosUploadInstance
          .post(
            "/upload", formData,
            {
              headers: {
                Authorization: "Bearer " + session.token,
                "Content-Type": "multipart/form-data"
              }
            }
          );
      },
    },
    created() {
      //this.initSession();
    },
  };
  app.mixin(mixins);
});

export { secureStorage, getContextHeaders };
