<template>
  <div>
    <q-btn v-if="!isAuthenticated" outline @click="onShowLoginDialog()">
      {{ $t("login") }}
    </q-btn>
    <q-btn v-else outline @click="doLogout()">
      {{ $t("logout") }}
    </q-btn>

    <q-dialog v-model="loginDialog">
      <q-card class="my-card">
        <q-img lazy src="https://cdn.quasar.dev/img/chicken-salad.jpg" height="150px" />
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col-12 text-center q-my-sm">
              <q-btn color="primary" @click="setRequireAuth()">{{ $t("login_with_alinea") }}</q-btn>
            </div>
            <div class="col-12 text-center q-my-sm">
              <q-btn outline>{{ $t("login_with_google") }}</q-btn>
            </div>
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { secureStorage } from "boot/app"

export default {
  name: 'LoginDialog',
  setup() {
    return {};
  },
  methods: {
    onShowLoginDialog() {
      this.$store.commit("ui/showLoginDialog");
    },
    setRequireAuth() {
      secureStorage.setItem("is_require_auth", true);
      this.$router.push("/login");
      this.$router.go();
    }
  },
  computed: {
    
  },
};
</script>
