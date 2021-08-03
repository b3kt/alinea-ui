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
    populateFormModel () {
      if(!this.isNil(this.getStory)){
        storySchema.title.value = this.getStory.title;
        storySchema.intro.value = this.getStory.description;
      }
    },
    getUID(){
      return this.$route.params.story_uid.split("&state=")[0];
    },
    onSaveStory() {
      if(this.getDialogModel.title !== undefined && this.getDialogModel.intro !== undefined){
        const vars = {
          title: this.getDialogModel.title,
          desc: this.getDialogModel.intro,
          uid: this.getUID()
        };
        console.log(vars);
        const resp = this.$store.dispatch("model/updateStory", vars);
        if (resp !== undefined && resp !== null) {
          resp.then(() => {
            this.$q.notify({ color: "positive", message: this.$t("succesfully_saved") });
            this.$store.commit("ui/hideDashboardDialog");
            this.getSecureStorage.removeItem("my-stories");
            this.$store.dispatch("model/fetchAuthorStories");
          });
        }
      }
    },
    onAddChapter() {
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("create_chapter"),
        schema: chapterSchema,
        events: {
          onSave: () => {
            this.onSaveChapter();
          },
        },
      });
    },
    onEditStory() {
      this.populateFormModel ();

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
    onSaveChapter() {
      alert('ayuy');
    }
  },
  computed: {
    ...mapGetters({
      getStory: "model/getStory",
      getDialogForm: "ui/getDialogForm",
    }),
    getDialogModel(){
      return this.getDialogForm.model;
    }
  },
};
</script>
