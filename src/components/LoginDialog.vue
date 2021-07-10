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
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { openURL } from "quasar";

export default {
  name: 'LoginDialog',
  setup() {
    return {};
  },
  methods: {
    onShowLoginDialog() {
      this.$store.commit("ui/showLoginDialog");
    },
    onLogout() {
      if(this.getLogoutUrl !== undefined && this.getLogoutUrl !== null){
        this.$secureStorage.clear();
        openURL(this.getLogoutUrl);
      } else {
        alert('already logged out')
      }
    },
  },
  computed: {
    
  },
};
</script>
