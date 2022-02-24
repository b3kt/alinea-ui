<template>
  <q-layout view="lHh Lpr lfr">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="isAuthenticated"
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <q-btn flat to="/">
            {{ config.appName }}
          </q-btn>
        </q-toolbar-title>
        <div class="q-ml-md gt-xs">
          <q-btn v-for="(item,idx) in menus " :key="idx" flat @click="$router.push(item.url)">
            {{ item.name }}
            <q-tooltip>
              {{ item.tooltip }}
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

    <q-footer  v-once>
      <Footer />
    </q-footer>

  </q-layout>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink: defineAsyncComponent(() =>
      import("components/EssentialLink")
    ),
    LoginDialog: defineAsyncComponent(() =>
      import("components/LoginDialog")
    ),
    Footer:  defineAsyncComponent(() =>
      import("components/Footer")
    )
  },
  mounted () {
    // this.$store.dispatch('model/fetchProfile');
    // console.log()
  },
  data() {
    return {
      menus: [
        { name:"stories", url:"/stories", tooltip: this.$t('explore_stories')},
        { name:"books", url:"/books", tooltip: this.$t('explore_books')},
        { name:"search", url:"/search", tooltip: this.$t('search_anything')},
      ],
    };
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
