<template>
  <div>
    <q-btn v-if="!isAuthenticated" outline @click="onShowLoginDialog()">
      {{ $t("login") }}
    </q-btn>
    <q-btn v-else outline @click="onLogout()">
      {{ $t("logout") }}
    </q-btn>

    <q-dialog v-model="dialog">
      <q-card class="my-card">
        <q-img lazy src="https://cdn.quasar.dev/img/chicken-salad.jpg" height="150px" />
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col-12 text-center q-my-sm">
              <q-btn color="primary" to="/login">{{ $t("login_with_alinea") }}</q-btn>
            </div>
            <div class="col-12 text-center q-my-sm">
              <q-btn outline>{{ $t("login_with_google") }}</q-btn>
            </div>
            <!-- <div class="col-12 text-center q-my-sm">
              {{ $t("forgot_your_password") }}?
              <a
                href="https://account.berdaya.in/realms/alinea/login-actions/reset-credentials?client_id=account&tab_id=7fLqa0wrZ7Y"
              >
                {{ $t("forgot_password_link") }}
              </a>
            </div> -->

            <!-- <div class="col-12 text-center q-my-sm">
              {{ $t("didnt_have_account") }}?
              <a :href="getRegisterUrl">
                {{ $t("register_link") }}
              </a>
            </div> -->
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";
import { openURL } from "quasar";

export default {
  // name: 'ComponentName',
  setup() {
    return {
      instance: null,
      card: ref(false),
      tab: ref("mails"),
    };
  },
  methods: {
    onShowLoginDialog() {
      this.$store.commit("ui/showLoginDialog");
    },
    onLogout() {
      this.$secureStorage.setItem("isRequireLogin", false);
      openURL(this.getLogoutUrl);
    },
  },
  computed: {
    getLoginUrl() {
      return this.$keycloak !== undefined ? this.$keycloak.createLoginUrl() : null;
    },
    getLogoutUrl() {
      return this.$keycloak !== undefined ? this.$keycloak.createLogoutUrl() : null;
    },
    getRegisterUrl() {
      return this.$keycloak !== undefined ? this.$keycloak.createRegisterUrl() : null;
    },
    ...mapGetters({
      dialog: "ui/getLoginDialog",
      requireLogin: "ui/getRequireLogin",
    }),
  },
};
</script>
