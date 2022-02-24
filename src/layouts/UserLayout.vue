<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header bordered>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <UserBadge :avatar="config.defaultImageURL" :name="getUserFullname"/>
        </q-toolbar-title>
        <div class="q-ml-md">
          <q-btn class="q-ml-sm" outline>
            {{ $t("wallet") }}
            <q-tooltip>
              {{ $t("explore_books") }}
            </q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
      <Toolbar /> 
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-2">
      <EssentialLink />
    </q-drawer>

    <DashboardDialog />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

const EssentialLink = defineAsyncComponent(() =>
  import("components/EssentialLink")
)
const DashboardDialog = defineAsyncComponent(() =>
  import("components/DashboardDialog")
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
    DashboardDialog,
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
