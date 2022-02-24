<template>
  <q-page padding>
    <section id="story" class="q-mx-auto x-default-maxwidth">
      <SectionPanel moreUrl="stories">
        <BookItem :data="getStory" mode="detail" :readonly="true" />
      </SectionPanel>
      <q-separator class="q-mb-lg"/>
      <ChapterList :data="getChapters" :readonly="true" />
    </section>
  </q-page>
</template>

<script>
import SectionPanel from "components/SectionPanel";
import BookItem from "components/BookItem";
import ChapterList from "components/ChapterList";
import { mapGetters } from "vuex";
export default {
  name: "Story",
  components: { SectionPanel, BookItem, ChapterList },
  created() {
    this.initStory();
  },
  methods: {
    initStory() {
      if (!this.isNil(this.$route.params.story_uid)) {
        const raw = this.$route.params.story_uid.split("&state=")[0];
        this.$store.dispatch("model/findStoryByUid", raw);
      }
    },
  },
  computed: {
    ...mapGetters({
      getStory: "model/getStory",
    }),
    getChapters() {
      return this.getStory !== undefined && this.getStory !== null
        ? this.getStory.chapters
        : null;
    },
  },
};
</script>
