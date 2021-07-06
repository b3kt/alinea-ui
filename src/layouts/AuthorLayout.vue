<template>
  <q-layout view="lHr LpR lFr">
    <Header channel="app">
      <q-resize-observer @resize="onResize" />
    </Header>
    <FooterDashboard />
    <DialogDashboard :saveListener="onSave">
      <FormRenderer :model="model" />
    </DialogDashboard>

    <q-page-container class="bg-grey-2">
      <q-page-sticky expand position="top" style="z-index: 99 !important">
        <q-card square class="shadow-1 full-width bg-white text-grey">
          <q-resize-observer @resize="onResizeToolbar" />
          <q-toolbar>
            <q-btn flat round dense @click="leftDrawer = !leftDrawer">
              <q-avatar>
                <q-img basic :src="getAvatarUrl()" />
              </q-avatar>
            </q-btn>
            <q-toolbar-title>
              {{ $t("hi") }} {{ userInfo.name }}
            </q-toolbar-title>
            <q-space />
            <q-btn-group flat>
              <!-- <q-btn
                v-if="isChapterMode"
                icon="la la-plus"
                class="bg-teal-5 text-white"
                :label="getIsMobile ? null : $t('create_chapter')"
                @click="onCreateChapter()"
              >
                <q-tooltip>
                  {{ $t("create_chapter") }}
                </q-tooltip>
              </q-btn> -->
              <q-btn
                v-if="!isChapterMode"
                icon="la la-plus"
                class="bg-teal-5 text-white"
                :label="getIsMobile ? null : $t('create_story')"
                @click="onCreateStory()"
              >
                <q-tooltip>
                  {{ $t("create_story") }}
                </q-tooltip>
              </q-btn>
              <q-btn-dropdown
                auto-close
                flat
                icon="la la-coins"
                :label="getIsMobile ? null : $t('balance')"
                class="bg-yellow text-primary"
              >
                <q-list>
                  <q-item clickable @click="tab = 'movies'">
                    <q-item-section>Movies</q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>Photos</q-item-section>
                  </q-item>
                </q-list>
                <q-tooltip>
                  {{ $t("view_wallet") }}
                </q-tooltip>
              </q-btn-dropdown>
              <q-btn icon="la la-close" @click="rightDrawer = !rightDrawer">
                <q-tooltip>
                  {{ $t("toggle_drawer") }}
                </q-tooltip>
              </q-btn>
            </q-btn-group>
          </q-toolbar>
        </q-card>
      </q-page-sticky>
      <div class="row q-mt-xl">
        <div class="col">
          <router-view />
        </div>
      </div>
    </q-page-container>

    <q-drawer side="right" v-model="rightDrawer" content-class="bg-grey-3">
      <div class="q-pa-md">
        <Widget :title="$t('ewallet')">
          <WalletPanel />
        </Widget>
        <Widget :title="$t('my_cart')" :hasMore="true">
          <div v-for="i in 3" v-bind:key="i">
            <CartItem />
          </div>
        </Widget>
      </div>
    </q-drawer>
  </q-layout>
</template>
<script>
import DialogDashboard from "components/DialogDashboard";
import FormRenderer from "components/FormRenderer";
import FooterDashboard from "components/FooterDashboard";
import WalletPanel from "components/WalletPanel";
import Header from "components/Header";
import Widget from "components/Widget";
import CartItem from "components/CartItem";
import gql from "graphql-tag";
import { mapGetters } from "vuex";
export default {
  name: "DashboardLayout",
  components: {
    CartItem,
    Widget,
    Header,
    WalletPanel,
    FormRenderer,
    FooterDashboard,
    DialogDashboard,
  },
  apollo: {
    user_files: {
      query: gql`
        query fetchUserFile($field: String) {
          user_files(where: { entity_field: { _eq: "author_avatar" } }) {
            url
            field: entity_field
          }
        }
      `,
    },
    categories: {
      query: gql`
        query fetchCategories {
          categories(limit: 10) {
            name
            id
          }
        }
      `,
    },
  },
  data() {
    return {
      dlgTitle: null,
      // createDlg: false,
      story: {
        form: [
          {
            id: "title",
            name: "title",
            type: "text",
            label: this.$t("title"),
            length: 50,
            required: true,
            styleClass: "col-12",
            onChange: () => {
              return true;
            },
          },
          {
            id: "intro",
            name: "intro",
            type: "textarea",
            label: this.$t("intro"),
            length: 500,
            required: false,
            styleClass: "col-12",
            onChange: () => {
              return true;
            },
          },
          {
            id: "story_image",
            name: "story_image",
            type: "file",
            required: false,
            label: this.$t("story_image"),
            length: 500,
            onChange: (file) => {
              this.$store.commit("ui/setModelDataFile", {
                field: "story_image",
                file: file[0]
              });
            },
          },
        ],
        action: {
          onSave: () => {
            this.onSaveStory();
          },
        },
        data: {
          title: null,
          // category: null,
          intro: null,
          story_image: {
            file: null,
            id: null,
            name: "story",
            field: "story_image",
            url: null,
          },
        },
        options: {
          categories: [],
        },
      },
      chapter: {
        form: [
          {
            id: "title",
            name: "title",
            type: "text",
            label: this.$t("title"),
            styleClass: "col-12",
            length: 50,
            onChange: () => {
              return true;
            },
          },
          {
            id: "chapter_image",
            name: "chapter_image",
            type: "file",
            label: this.$t("chapter_image"),
            length: 500,
            onChange: (file) => {
              this.$store.commit("ui/setModelDataFile", {
                field: "chapter_image",
                file: file[0]
              });
            },
          },
        ],
        action: [],
        data: {
          title: null,
          chapter_image: {
            file: null,
            id: null,
            name: "chapter",
            field: "chapter_image",
            url: null,
          },
          story_id: this.$store.getters["story/getStory"].id,
        },
        options: {
          // categories: [],
        },
      },
      header: "",
      toolbar: "",
      margin: "",
      rightDrawer: false,
    };
  },
  methods: {
    genUuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    filterCategory(val, update) {
      if (this.story.data.categories !== null) {
        update(() => {
          this.$apollo.queries.categories.refetch();

          const results = [];
          this.categories.forEach((item) => {
            results.push(item.name);
          });
          this.story.options.categories = results;
        });
      }
    },
    onCreateStory() {
      this.chapter.data = {
        title: null,
        intro: null,
        story_image: null,
      };

      this.$store.commit("ui/setTitle", this.$t("create_story"));
      this.$store.commit("ui/setModel", this.story);
      this.$store.commit("ui/showDialog");
    },
    onCreateChapter() {
      this.chapter.data = {
        title: null,
        chapter_image: null,
        story_id: this.$store.getters["story/getStory"].id,
      };

      this.$store.commit("ui/setTitle", this.$t("create_chapter"));
      this.$store.commit("ui/setModel", this.chapter);
      this.$store.commit("ui/showDialog");
    },
    getAvatarUrl() {
      if (this.user_files !== null && this.user_files !== undefined) {
        const result = this.user_files.find((obj) => {
          return obj.field === "author_avatar";
        });
        return result !== null && result !== undefined
          ? result.url
          : this.config.defaultImageURL;
      } else {
        return this.config.defaultImageURL;
      }
    },
    onResize(size) {
      this.header = size;
    },
    onResizeToolbar(size) {
      this.toolbar = size;
    },
    onValidate() {
      return (
        Object.keys(this.story.data).filter((v) => {
          return this.story.content.forEach((v1) => {
            if (v1.id === v) {
              return this.story.data[v] === null || this.story.data[v] === "";
            }
          });
        }).length === 0
      );
    },
    toSlug(str) {
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      const to = "aaaaeeeeiiiioooouuuunc------";
      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

      return str;
    },
    onSaveStory() {
      const params = {
        instance: this,
        data: this.getDialogModelData,
      };

      console.log(params);
      this.$store
        .dispatch("story/createStory", params)
        .then(() => {
          this.$root.$emit("reloadStories");
        });
      this.$store.commit("ui/hideDialog");
    },
    onSave() {
      if (this.onValidate()) {
        if (this.isChapterMode) {
          const story = this.$store.getters["story/getStory"];
          this.$store
            .dispatch("story/createChapter", {
              instance: this,
              data: {
                story_id: story.id,
                title: this.chapter.data.title,
                slug: this.toSlug(this.chapter.data.title),
                uuid: this.genUuid(),
              },
              file: this.chapter.data.chapter_image,
            })
            .then(() => {
              this.$root.$emit("reloadStories");
            });
          this.$store.commit("ui/setAuthorDialog", false);
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      getDialogModel: "ui/getDialogModel",
      getDialogModelData: "ui/getDialogModelData",
    }),
    model: {
      set(model) {
        this.$store.commit("ui/setModelData", model);
      },
      get() {
        return this.getDialogModel;
      },
    },
    getIsMobile() {
      return this.$q.screen.lt.sm;
    },
    getMargin() {
      return this.toolbar.height;
    },
    isChapterMode() {
      return this.$route.params.slug !== null && this.$route.params.slug !== undefined;
    },
  },
  created() {
    this.dlgTitle = this.isChapterMode
      ? this.$t("create_chapter")
      : this.$t("create_story");
  },
};
</script>
