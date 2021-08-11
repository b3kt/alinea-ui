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
              @blur="onFilter()"
              :placeholder="$t('type_keyword_to_filter')"
            >
              <template v-slot:prepend>
                <q-icon v-if="text === ''" name="search" />
              </template>
              <template v-slot:append>
                <q-icon v-if="text !== ''" name="clear" class="cursor-pointer" @click="text = ''" />
              </template>
            </q-input>
          </q-card-section>
          <q-separator />
          <div
            bordered
            class="rounded-borders q-col-gutter-lg fit row inline wrap justify-start items-start content-start q-pr-none q-pl-md q-py-md"
          >
            <div v-for="(story, idx) in getStories" v-bind:key="idx" class="">
              <BookItem :data="story" :to="'/author/story/'+story.story_uid"/>
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
    };
  },
  methods: {
    onFilter() {
      // alert('asdasda');
    },
    onChangeTab(tab){

    }
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
