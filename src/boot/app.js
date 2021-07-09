import { boot } from "quasar/wrappers";
import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";
import { sha256 } from "js-sha256";

export default boot(async ({ app, router }) => {
  // SECURE LOCALSTORAGE UTILS
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
  app.config.globalProperties.$secureStorage = secureStorage;


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
        return app.config.globalProperties.$keycloak.isAuthenticated;
      },
      // isAuthorMode() {
      //   const mode = this.$secureStorage.getItem("currentMode");
      //   return mode === "author";
      // },
      // userInfo() {
      //   return this.getUserInfo();
      // },
      // userUID() {
      //   const result = this.getUserInfo();
      //   return result !== null && result !== undefined ? result.sub : null;
      // },
      // isDialogDisplayed() {
      //   return this.dialogDashboard.displayed;
      // },
    },
    methods: {
      // getUserInfo() {
      //   return JSON.parse(this.$secureStorage.getItem("userInfo"));
      // },
      // doLogout() {
      //   this.$secureStorage.clear();
      // },
    },
  };
  app.mixin(mixins);
});
