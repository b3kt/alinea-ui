<template>
  <div>
    <Toolbar />
    <q-page padding>
      <!-- content -->
      <Widget :title="$t('my_stories')">
        <q-card bordered flat>
          <q-card-section>
            <BookItem
              :data="getStory"
              mode="detail"
              :onEdit="onEditStory"
              :onAddChapter="onAddChapter"
            />
          </q-card-section>
          <!-- <q-separator />
           -->

          <!-- <q-card-section class="q-pa-md">
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
                <q-icon
                  v-if="text !== ''"
                  name="clear"
                  class="cursor-pointer"
                  @click="text = ''"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-separator /> -->
          <!-- <div
            bordered
            class="rounded-borders q-col-gutter-lg fit row inline wrap justify-start items-start content-start q-pr-none q-pl-md q-py-md"
          >
            <div v-for="(story, idx) in getStories" v-bind:key="idx" class="">
              <BookItem :data="story" :to="'/author/story/' + story.story_uid" />
            </div>
          </div> -->
        </q-card>
      </Widget>
      <div class="row q-col-gutter-md">
        <div class="col-md-6 col-xs-12">
          <Widget :title="$t('chapters')">
            <ChapterList />
          </Widget>
        </div>
        <div class="col-md-6 col-xs-12">
          <Widget :title="$t('comments')">
            <CommentList />
          </Widget>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import Widget from "components/Widget";
import Toolbar from "components/Toolbar";
import BookItem from "components/BookItem";
import storySchema from "components/forms/story-form";
import chapterSchema from "components/forms/chapter-form";
import ChapterList from "components/ChapterList";
import CommentList from "components/CommentList";
import { mapGetters } from "vuex";

export default {
  name: "DashboardStory",
  components: { Widget, Toolbar, BookItem, ChapterList, CommentList },
  mounted() {
    this.initStory();
  },
  methods: {
    initStory() {
      if (!this.isNil(this.$route.params.story_uid)) {
        const raw = this.$route.params.story_uid.split("&state=")[0];
        this.$store.dispatch("model/findStoryByUid", raw);
      }
    },
    onSaveStory() {
      const resp = this.$store.dispatch("model/saveStory", this.getDialogModel);
      if (resp !== undefined && resp !== null) {
        resp.then(() => {
          this.$q.notify({ color: "positive", message: this.$t("succesfully_saved") });
          this.$store.commit("ui/hideDashboardDialog");
          this.getSecureStorage.removeItem("my-stories");
          this.$store.dispatch("model/fetchAuthorStories");
        });
      }
    },
    onAddChapter() {
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("create_chapter"),
        schema: chapterSchema,
        events: {
          onSave: () => {
            this.onSaveStory();
          },
        },
      });
    },
    onEditStory() {
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("edit_story"),
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
      getStory: "model/getStory",
    }),
  },
};
</script>
