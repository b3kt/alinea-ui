<template>
  <q-page padding>
    <q-card flat bordered>
      <q-tabs
        v-model="tab"
        align="left"
        active-color="primary"
        class="text-grey"
        indicator-color="primary"
      >
        <q-tab name="my-library" icon="la la-book" :label="$t('my_library')" />
        <q-tab name="my-bookmark" icon="la la-bookmark" :label="$t('my_bookmark')" />
        <q-tab name="picked-for-you" icon="movie" :label="$t('my_rent')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="my-library" class="q-pa-none">
          <q-tabs
            v-model="subtab"
            dense
            class="text-grey"
            active-color="secondary"
            indicator-color="secondary"
            align="left"
          >
            <q-tab name="all" :label="$t('all')" />
            <q-tab
              v-for="(item, idx) in getLibraries"
              :key="idx"
              :name="item.library_uid"
              :label="$t(item.name)"
            />
            <!--<q-tab name="movies" label="Movies" /> -->
            <q-space />
            <q-btn
              class="no-border-radius"
              color="primary"
              icon="la la-plus"
              :label="$t('add_library')"
            />
          </q-tabs>

          <q-separator />
          <q-card flat>
            <q-card-section>
              <div class="text-h6">All</div>
              <div>lorem ipsum</div>
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="my-bookmark" class="q-pa-none">
          <q-card flat>
            <q-card-section>
              <div class="text-h6">All</div>
              <div>lorem ipsum</div>
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="picked-for-you" class="q-pa-none">
          <q-card flat>
            <q-card-section>
              <div class="text-h6">All</div>
              <div>lorem ipsum</div>
            </q-card-section>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DashboardLibrary",
  data() {
    return {
      tab: "my-library",
      subtab: "all",
    };
  },
  mounted() {
    this.$store.dispatch("model/fetchUserLibrary");
  },
  computed: {
    ...mapGetters({
      getLibraries: "model/getLibraries",
    }),
  },
};
</script>
