<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
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
  </q-page>
</template>

<script>
import Widget from "components/Widget";
import ProfileCard from "components/ProfileCard";

export default {
  name: "DashboardProfile",
  components: { Widget, ProfileCard },
};
</script>
