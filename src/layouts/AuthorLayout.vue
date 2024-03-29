<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header class="bg-secondary">
      <q-toolbar>
        <q-btn flat round dense icon="las la-bars" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <UserBadge :avatar="getAuthorAvatar" :name="getAuthorName"/>
        </q-toolbar-title>
        <div class="q-ml-md">
          <q-btn class="gt-sm q-ml-sm" outline @click="onCreateStory()">
            {{ $t("create_story") }}
            <q-tooltip>
              {{ $t("explore_stories") }}
            </q-tooltip>
          </q-btn>
          <q-btn class="gt-sm q-ml-sm" outline>
            {{ $t("sales_balance") }}
            <q-tooltip>
              {{ $t("explore_books") }}
            </q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
      <Toolbar />
    </q-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-2">
      <EssentialLink />
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
// import storySchema from "components/forms/story-form";
// import EssentialLink from "components/EssentialLink";
// import UserBadge from "components/UserBadge";
// import Toolbar from "components/Toolbar";

const EssentialLink = defineAsyncComponent(() =>
  import("components/EssentialLink")
)
const UserBadge = defineAsyncComponent(() =>
  import("components/UserBadge")
)
const Toolbar = defineAsyncComponent(() =>
  import("components/Toolbar")
)
const storySchema = defineAsyncComponent(() =>
  import("components/forms/story-form")
)

export default {
  name: "AuthorLayout",
  components: {
    EssentialLink,
    Toolbar,
    UserBadge
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
  mounted() {
    this.$store.dispatch('model/fetchProfile');
  },
  methods: {
    onSaveStory() {
      const resp = this.$store.dispatch("model/createStory", this.getDialogModel);
      if (resp !== undefined && resp !== null) {
        resp.then(() => {
          this.$q.notify({ color: "positive", message: this.$t("succesfully_saved") });
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
