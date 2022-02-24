<template>
  <div>
    <q-page padding>
      <Widget :title="$t('my_stories')">
        <q-card bordered flat>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab
              v-for="tb in tabs"
              v-bind:key="tb.id"
              :name="tb.id"
              :label="tb.label"
              @click="onChangeTab(tb.id)"
            />
          </q-tabs>
          <q-separator />
          <q-card-section class="q-pa-md">
            <q-input
              v-model="text"
              input-class="text-left"
              standout="bg-grey text-white"
              @change="onFilter(text)"
              :placeholder="$t('type_keyword_to_filter')"
            >
              <template v-slot:prepend>
                <q-icon v-if="isNil(text)" name="las la-search" />
              </template>
              <template v-slot:append>
                <q-icon
                  v-if="!isNil(text)"
                  name="las la-times"
                  class="cursor-pointer"
                  @click="onFilter(null)"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-separator />
          <div
            bordered
            class="rounded-borders q-col-gutter-lg fit row inline wrap justify-start items-start content-start q-pr-none q-pl-md q-py-md"
          >
            <div v-for="(story, idx) in this.getStories" v-bind:key="idx" class="">
              <BookItem :data="story" :to="'/author/story/' + story.story_uid" />
            </div>
          </div>
        </q-card>
      </Widget>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Widget from "components/Widget";
import BookItem from "components/BookItem";
import { secureStorage } from "boot/app";
import { shallowRef, ref } from "vue";

export default {
  name: "DashboardStories",
  components: {
    Widget,
    BookItem,
  },
  data() {
    return {
      text: null,
      tabs: [
        { id: "STORY_STATUS_ALL", label: this.$t("all_stories") },
        { id: "STORY_STATUS_DRAFT", label: this.$t("my_draft") },
        // { id: "STORY_STATUS_SUBMITTED", label: this.$t("submitted") },
        // { id: "STORY_STATUS_SCHEDULED", label: this.$t("scheduled") },
        { id: "STORY_STATUS_RELEASED", label: this.$t("released") },
      ],
      tab: "STORY_STATUS_ALL",
      stories: [],
    };
  },
  methods: {
    onFilter(searchQry) {
      if (!this.isNil(searchQry)) {
        if (this.isNotEmpty(this.getStories)) {
          const filtered = this.getStories.filter(function (el) {
            return el.title.toLowerCase().includes(searchQry.toLowerCase());
          });
          this.$store.commit("model/setStories", filtered);
        }
      } else {
        this.text = null;
        this.$store.dispatch("model/fetchAuthorStories");
      }
    },
    onChangeTab(tab) {
      this.$store.dispatch("model/fetchAuthorStories").then((resp) => {
        if (tab !== "STORY_STATUS_ALL") {
          console.log(resp);
          const filtered = this.getStories.filter(function (el) {
            return el.status.code.toLowerCase().includes(tab.toLowerCase());
          });
          this.$store.commit("model/setStories", filtered);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("model/fetchAuthorStories");
  },
  computed: {
    ...mapGetters({
      getStories: "model/getStories",
    }),
  },
};
</script>
