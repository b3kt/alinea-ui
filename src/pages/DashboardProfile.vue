<template>
  <q-page padding>
    <div class="row q-col-gutter-md" v-if="getCurrentRole === 'author'">
      <div class="col-lg-6 col-12">
        <Widget :title="$t('author_profile')">
          <ProfileCard />
        </Widget>
      </div>
      <div class="col-lg-6 col-12">
        <Widget :title="$t('my_chapter_draft')">
          <!-- <ChapterDraftList /> -->
        </Widget>
      </div>
    </div>
    <div class="row q-col-gutter-md" v-else>
      <div class="col-lg-6 col-12">
        <Widget :title="$t('personal_information')">
          <FormPreview :data="getProfile"/>
        </Widget>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import Widget from "components/Widget";
import ProfileCard from "components/ProfileCard";
import FormPreview from "components/FormPreview";

export default {
  name: "DashboardProfile",
  components: { Widget, ProfileCard, FormPreview },
  mounted() {
    this.$store.dispatch("model/fetchProfile");
  },
  computed: {
    ...mapGetters({
      getProfile: "model/getProfile",
    }),
  },
};
</script>
