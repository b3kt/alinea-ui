<template>
  <div>
    <q-page padding>
      <!-- content -->
      <Widget :title="$t('my_story')">
        <q-card bordered flat>
          <q-card-section>
            <BookItem
              :data="getStory"
              mode="detail"
              :onEdit="onEditStory"
              :onDelete="onDeleteStory"
              :onAddChapter="onAddChapter"
            />
          </q-card-section>
        </q-card>
      </Widget>
      <div class="row q-col-gutter-md">
        <div class="col-md-6 col-xs-12">
          <Widget
            :title="$t('chapters')"
            :action="onAddChapter"
            :actionLabel="$t('add_chapter')"
          >
            <ChapterList :data="getChapters" />
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
import BookItem from "components/BookItem";
import storySchema from "components/forms/story-form";
import chapterSchema from "components/forms/chapter-form";
import ChapterList from "components/ChapterList";
import CommentList from "components/CommentList";
import { mapGetters } from "vuex";

export default {
  name: "DashboardStory",
  components: { Widget, BookItem, ChapterList, CommentList },
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
    populateFormModel() {
      if (!this.isNil(this.getStory)) {
        storySchema.title.value = this.getStory.title;
        storySchema.intro.value = this.getStory.description;
        storySchema.cover.value = this.getStory.cover_img[0];
      }
    },
    getUID() {
      return this.$route.params.story_uid.split("&state=")[0];
    },
    onSaveStory() {
      if (
        this.getDialogModel.title !== undefined &&
        this.getDialogModel.intro !== undefined
      ) {
        const vars = {
          title: this.getDialogModel.title,
          desc: this.getDialogModel.intro,
          uid: this.getUID(),
        };
        const resp = this.$store.dispatch("model/updateStory", vars);
        if (resp !== undefined && resp !== null) {
          resp.then(() => {
            this.$q.notify({ color: "positive", message: this.$t("succesfully_saved") });
            this.$store.commit("ui/hideDashboardDialog");
            this.$store.commit("model/setStory", null);
            this.initStory();
          });
        }
      }

      if(this.getDialogModel.cover !== undefined){
        this.doUpload({
          file: this.getDialogModel.cover,
          name: 'story',
          field: 'cover',
          id: this.getStory.story_uid
        }).then(() => {
          this.$store.commit("ui/hideDashboardDialog");
          this.$store.commit("model/setStory", null);
          this.initStory();
        });
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
      this.populateFormModel();

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
    onDeleteStory() {
      this.$q
        .dialog({
          title: this.$t("delete_confirm"),
          message: this.$t("delete_confirm_msg"),
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          // console.log('>>>> OK')
          alert('deleted')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    onSaveChapter() {
      if (
        this.getDialogModel.title !== undefined &&
        this.getDialogModel.intro !== undefined
      ) {
        const vars = {
          title: this.getDialogModel.title,
          desc: this.getDialogModel.intro,
          uid: this.sanitize(this.$route.params.story_uid),
        };
        const resp = this.$store.dispatch("model/createChapter", vars);
        if (resp !== undefined && resp !== null) {
          resp.then(() => {
            this.$q.notify({ color: "positive", message: this.$t("succesfully_saved") });
            this.$store.commit("ui/hideDashboardDialog");
          });
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      getStory: "model/getStory",
      getDialogForm: "ui/getDialogForm",
    }),
    getDialogModel() {
      return this.getDialogForm.model;
    },
    getChapters() {
      return this.getStory !== undefined && this.getStory !== null
        ? this.getStory.chapters
        : null;
    },
  },
};
</script>
