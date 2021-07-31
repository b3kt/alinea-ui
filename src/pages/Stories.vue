<template>
  <q-page padding>
    <Widget :title="$t('recommended')">
      <div class="row q-col-gutter-md">
        <div v-for="(story, idx) in getStories" v-bind:key="idx">
          <BookItem :data="story" />
        </div>
      </div>
    </Widget>

    <Widget :title="$t('refined_search')">
      <div class="row q-col-gutter-md">
        <div v-for="(story, idx) in getStories" v-bind:key="idx">
          <BookItem :data="story" />
        </div>
      </div>
    </Widget>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import Widget from "components/Widget";
import BookItem from "components/BookItem";
export default {
  name: "Stories",
  components: { Widget, BookItem },
  mounted() {
    this.$store.dispatch("model/fetchStories");
  },
  computed: {
    ...mapGetters({
      getStories: "model/getStories",
    }),
  },
};
</script>
