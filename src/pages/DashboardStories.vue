<template>
  <div>
    <q-toolbar class="bg-grey-3 shadow-1">
      <q-btn flat round dense>
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title> Toolbar </q-toolbar-title>
      <q-btn flat round dense>
        <q-icon name="more_vert" />
      </q-btn>
    </q-toolbar>
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
            />
            <q-space/>
            <q-btn color="secondary" class="align-end" flat>
              {{$t('create_story')}}
            </q-btn>
          </q-tabs>
          <q-list bordered class="rounded-borders">
            <!-- <q-item-label header>Friends</q-item-label> -->

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Brunch this weekend?</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold">Janet</span>
                  -- I'll be in your neighborhood doing errands this weekend. Do you want
                  to grab brunch?
                </q-item-label>
              </q-item-section>

              <q-item-section side top> 1 min ago </q-item-section>
            </q-item>

            <q-separator inset="item" />

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Linear Project</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold">John</span>
                  -- Can we schedule a call for tomorrow?
                </q-item-label>
              </q-item-section>

              <q-item-section side top> 1 min ago </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </Widget>
    </q-page>
  </div>
</template>

<script>
import Widget from "components/Widget";
export default {
  name: "DashboardStories",
  components: {
    Widget,
  },
  data() {
    return {
      tabs: [
        { id: "STORY_STATUS_ALL", label: this.$t("my_stories") },
        { id: "STORY_STATUS_DRAFT", label: this.$t("my_draft") },
        // { id: "STORY_STATUS_SUBMITTED", label: this.$t("submitted") },
        // { id: "STORY_STATUS_SCHEDULED", label: this.$t("scheduled") },
        { id: "STORY_STATUS_RELEASED", label: this.$t("released") },
      ],
      tab: "STORY_STATUS_ALL",
    };
  },
};
</script>
