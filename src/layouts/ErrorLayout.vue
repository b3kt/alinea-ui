<template>
  <q-layout view="lHh Lpr lFf" class="bg-primary">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="isAuthenticated"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <q-btn flat to="/">
            {{ config.appName }}
          </q-btn>
        </q-toolbar-title>
        <div class="q-ml-md">
          <q-btn flat to="/stories">
            {{ $t("stories") }}
            <q-tooltip>
              {{ $t("explore_stories") }}
            </q-tooltip>
          </q-btn>
          <q-btn flat to="/books">
            {{ $t("books") }}
            <q-tooltip>
              {{ $t("explore_books") }}
            </q-tooltip>
          </q-btn>
          <q-btn flat to="/search">
            {{ $t("browse") }}
            <q-tooltip>
              {{ $t("search_anything") }}
            </q-tooltip>
          </q-btn>
        </div>
        <q-space />
        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <LoginDialog />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="bg-primary text-white text-center q-pa-md flex flex-center">
        <div>
          <div style="font-size: 30vh">404</div>
          <div class="text-h4" style="opacity: 0.4">Oops. Nothing here...</div>
          <q-btn
            class="q-mt-xl"
            color="white"
            text-color="blue"
            unelevated
            to="/"
            :label="$t('go_home')"
            no-caps
          />
        </div>
      </div>
    </q-page-container>    
  </q-layout>
</template>

<script>
import LoginDialog from "components/LoginDialog";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ErrorLayout",
  components: {
    LoginDialog,
  },
  mounted() {
    const curr = ref(this.$router.currentRoute);
    if(curr.value !== undefined && curr.value.fullPath.indexOf("&state=") > -1){
      // this.$router.push("/");
      this.$router.replace('/')
    }
  },
});
</script>
