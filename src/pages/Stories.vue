<template>
  <q-page padding class="q-mx-auto x-default-maxwidth">
    <Widget :title="$t('recommended')">
      <q-virtual-scroll
        :items="getStories"
        virtual-scroll-horizontal
        class="hide-native-scrollbar"
      >
        <template v-slot="{ item }">
          <BookItem :data="item" mode="simple" :readonly="true" classes="q-mr-md" :to="'/story/' + item.story_uid" />
        </template>
      </q-virtual-scroll>
    </Widget>

    <Widget :title="$t('refined_search')">
       <q-virtual-scroll
        :items="getStories"
        virtual-scroll-horizontal
        class="hide-native-scrollbar"
      >
        <template v-slot="{ item }">
          <BookItem :data="item" mode="simple" :readonly="true" classes="q-mr-md" />
        </template>
      </q-virtual-scroll>
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
