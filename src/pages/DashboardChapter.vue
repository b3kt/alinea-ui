<template>
  <q-page padding>
    <Widget :title="getChapterTitle" :actions="actions" :actionLabel="$t('add_chapter')">
      <div class="row q-col-gutter-md">
        <div >
          <ChapterSidebar :data="getChapter"/>
        </div>
        <div class="col">
          <q-editor
            v-model="qeditor"
            :dense="this.$q.screen.lt.md"
            :toolbar="toolbars"
            :fonts="fonts"
          />
        </div>
      </div>
    </Widget>
  </q-page>
</template>

<script>
import chapterSchema from "components/forms/chapter-form";
import { ref } from "vue";
import Widget from "components/Widget";
import ChapterSidebar from "components/ChapterSidebar";
import { mapGetters } from "vuex";
export default {
  name: "DashboardChapter",
  components: {
    Widget,
    ChapterSidebar,
  },
  data() {
    return {
      qeditor: null,
      actions: [
        { name: "edit", icon: "la la-edit", action: this.onEditChapter },
        { name: "save", icon: "la la-save", action: this.onSaveChapter },
        { name: "submit", icon: "la la-send", action: () => {} },
      ],
      toolbars: [
        [
          {
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            list: "only-icons",
            options: ["left", "center", "right", "justify"],
          }
        ],
        ["bold", "italic", "strike", "underline", "subscript", "superscript"],
        ["token", "hr", "link"],
        ["fullscreen"],
        [
          {
            label: this.$q.lang.editor.formatting,
            icon: this.$q.iconSet.editor.formatting,
            list: "no-icons",
            options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"],
          },
          {
            label: this.$q.lang.editor.fontSize,
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: "no-icons",
            options: [
              "size-1",
              "size-2",
              "size-3",
              "size-4",
              "size-5",
              "size-6",
              "size-7",
            ],
          },
          {
            label: this.$q.lang.editor.defaultFont,
            icon: this.$q.iconSet.editor.font,
            fixedIcon: true,
            list: "no-icons",
            options: [
              "default_font",
              "arial",
              "arial_black",
              "comic_sans",
              "courier_new",
              "impact",
              "lucida_grande",
              "times_new_roman",
              "verdana",
            ],
          },
        ],
        ["quote", "unordered", "ordered", "outdent", "indent"],

        ["undo", "redo"],
      ],
      fonts: {
        arial: "Arial",
        arial_black: "Arial Black",
        comic_sans: "Comic Sans MS",
        courier_new: "Courier New",
        impact: "Impact",
        lucida_grande: "Lucida Grande",
        times_new_roman: "Times New Roman",
        verdana: "Verdana",
      },
    };
  },
  mounted() {
    this.initChapter();
  },
  methods: {
    getUID() {
      return this.$route.params.chapter_uid.split("&state=")[0];
    },
    populateFormModel() {
      if (!this.isNil(this.getChapter)) {
        chapterSchema.title.value = this.getChapter.title;
        chapterSchema.intro.value = this.getChapter.intro;
        // chapterSchema.cover.value = this.getChapter.cover_img[0];
      }
    },
    onEditChapter() {
      this.populateFormModel();
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("edit_chapter"),
        schema: chapterSchema,
        events: {
          onSave: () => {
            this.onSaveChapter();
          },
        },
      });
    },
    onSaveChapter() {
      const vars = {
          title: this.isNil(this.getDialogModel.title) ? this.getChapter.title : this.getDialogModel.title,
          desc: this.isNil(this.getDialogModel.intro) ? this.getChapter.intro : this.getDialogModel.intro,
          content: this.qeditor,
          uid: this.sanitize(this.$route.params.chapter_uid),
        };
        const resp = this.$store.dispatch("model/updateChapter", vars);
        if (resp !== undefined && resp !== null) {
          resp.then(() => {
            this.$q.notify({ color: "positive", message: this.$t("succesfully_saved") });
            this.$store.commit("ui/hideDashboardDialog");
            this.initChapter();
          });
        }
    },
    initChapter() {
      const uid = this.getUID();
      if (!this.isNil(uid)) {
        this.$store.dispatch("model/findChapterByUid", uid)
          .then((resp) => {
            this.qeditor = ref(this.getChapterContent);
          });
      }
    },
  },
  computed: {
    ...mapGetters({
      getChapter: "model/getChapter",
    }),
    getChapterTitle() {
      return !this.isNil(this.getChapter) ? this.getChapter.title : null ;
    },
    getChapterContent() {
      return !this.isNil(this.getChapter) ? this.getChapter.content_md : null ;
    },
  },
};
</script>
