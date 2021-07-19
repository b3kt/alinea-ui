<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar size="36px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <span class="q-px-sm">
            Hi User
          </span>
        </q-toolbar-title>

        <div class="q-ml-md">
          <q-btn class="q-ml-sm" outline @click="onCreateStory()">
            {{ $t("create_story") }}
            <q-tooltip>
              {{ $t("explore_stories") }}
            </q-tooltip>
          </q-btn>
          <q-btn class="q-ml-sm" outline>
            {{ $t("sales_balance") }}
            <q-tooltip>
              {{ $t("explore_books") }}
            </q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>

      <!-- <q-tabs>
        <q-route-tab
          icon="map"
          to="/your/route"
          replace
          label="One Tab"
        />
        <q-route-tab
          icon="assignment"
          to="/some/other/route"
          replace
          label="Other Tab"
        />
      </q-tabs> -->
    </q-header>

    <!-- (Optional) The Footer -->
    <!-- <q-footer>
      <q-tabs switch-indicator>
        <q-route-tab
          icon="map"
          to="/your/route"
          replace
          label="One Tab"
        />
        <q-route-tab
          icon="assignment"
          to="/some/other/route"
          replace
          label="Other Tab"
        />
      </q-tabs>

      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer v-model="enabled" side="left" bordered class="bg-grey-2" :mini="leftDrawerOpen">
      <EssentialLink />
    </q-drawer>

    <DashboardDialog/>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import DashboardDialog from "components/DashboardDialog";

export default {
  name: "AuthorLayout",
  components: {
    EssentialLink,
    DashboardDialog
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      enabled: true,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    onCreateStory(){
      this.$store.commit("ui/showDashboardDialog");
    }
  }
};
</script>
