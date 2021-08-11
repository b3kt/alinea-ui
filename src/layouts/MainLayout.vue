<template>
  <q-layout view="lHh Lpr lfr">
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

    <q-drawer
      v-if="isAuthenticated"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <EssentialLink />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <Footer />
    </q-footer>
<!-- 
    [{{getSession}}] -->
    
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import LoginDialog from "components/LoginDialog";
import Footer from "components/Footer";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
    LoginDialog,
    Footer
  },
  mounted () {
    this.$store.dispatch('model/fetchProfile');
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
