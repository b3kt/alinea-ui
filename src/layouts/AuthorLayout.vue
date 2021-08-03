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
          <span class="q-px-sm"> Hi User </span>
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
    </q-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-2">
      <EssentialLink />
    </q-drawer>

    <DashboardDialog />

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
import storySchema from "components/forms/story-form";
import { mapGetters } from "vuex";

export default {
  name: "AuthorLayout",
  components: {
    EssentialLink,
    DashboardDialog,
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
  mounted() {},
  methods: {
    onSaveStory() {
      const resp = this.$store.dispatch("model/createStory", this.getDialogModel);
      if (resp !== undefined && resp !== null) {
        resp.then(() => {
          this.$q.notify({ color: "positive", message: this.$t("succesfully_saved")});
          this.$store.commit("ui/hideDashboardDialog");
          this.getSecureStorage.removeItem("my-stories");
          this.$store.dispatch("model/fetchAuthorStories");
        });
      }
    },
    onCreateStory() {
      this.$store.commit("ui/resetFormModel");
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("create_story"),
        schema: storySchema,
        events: {
          onSave: () => {
            this.onSaveStory();
          },
        },
      });
    },
  },
  computed: {
    ...mapGetters({
      getDialogForm: "ui/getDialogForm",
    }),
    getDialogTitle() {
      return this.getDialogForm.title;
    },
    getDialogSchema() {
      return this.getDialogForm.schema;
    },
    getDialogModel() {
      return this.getDialogForm.model;
    },
    getDialogEvent() {
      return this.getDialogForm.events;
    },
  },
};
</script>
