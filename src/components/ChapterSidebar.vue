<template>
  <div class="chapter-sidebar">
    <q-card flat bordered class="my-card" v-if="!isNil(data)">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

      <q-card-section>
         <q-btn
          fab
          icon="la la-camera"
          class="absolute bg-white text-primary"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />
        <div class="row no-wrap items-center">
          <div class="col title ellipsis">
            {{ data.title }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-caption text-grey">
          {{ data.intro }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat color="primary"> Reserve </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ChapterSidebar",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      stars: ref(4),
    };
  },
};
</script>
