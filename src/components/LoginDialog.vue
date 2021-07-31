<template>
  <div>
    <div v-if="!isAuthenticated">
      <q-btn outline @click="onShowLoginDialog()">
        {{ $t("login") }}
      </q-btn>
    </div>
    <div v-else>
      <q-btn outline @click="onBecomeAuthor()" class="q-mr-sm" v-if="myProfile === null || myProfile === undefined">
        {{ $t("become_author") }}
      </q-btn>
      <q-btn outline @click="doLogout()">
        {{ $t("logout") }}
      </q-btn>
    </div>

    <q-dialog v-model="loginDialog">
      <q-card class="my-card">
        <q-img lazy src="https://cdn.quasar.dev/img/chicken-salad.jpg" height="150px" />
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col-12 text-center q-my-sm">
              <q-btn color="primary" @click="setRequireAuth()">{{
                $t("login_with_alinea")
              }}</q-btn>
            </div>
            <div class="col-12 text-center q-my-sm">
              <q-btn outline>{{ $t("login_with_google") }}</q-btn>
            </div>
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>

    <ActivationDialog />
  </div>
</template>

<script>
import { secureStorage } from "boot/app";
import ActivationDialog from "components/ActivationDialog";
import authorProfileSchema from "components/forms/author-profile-form";

export default {
  name: "LoginDialog",
  components: { ActivationDialog },
  setup() {
    return {};
  },
  methods: {
    onShowLoginDialog() {
      this.$store.commit("ui/showLoginDialog");
    },
    onBecomeAuthor() {
      this.$store.commit("ui/setFormSchema", authorProfileSchema);
      this.$store.commit("ui/showActivationDialog");
    },
    setRequireAuth() {
      secureStorage.setItem("is_require_auth", true);
      this.$router.push("/login");
      this.$router.go();
    },
  },
  computed: {},
};
</script>
