<template>
  <q-card class="my-card x-card-tile q-my-lg bg-transparent" flat>
    <q-card-section v-if="!isNil(getTitle)" horizontal class="row">
      <q-card-section class="col-11">
        <div class="text-h5 text-primary text-weight-bold text-capitalize">
          {{ getTitle }}
        </div>
      </q-card-section>
      <q-card-section class="text-right " v-if="getMoreURL !== undefined">
        <q-btn flat :to="getMoreURL" dense :aria-label="getTitle">
            <span>
              <q-icon name="las la-ellipsis-h" class="text-secondary" size="sm" />
            </span>
            <q-tooltip>
              {{ $t("more") }}
            </q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card-section>
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "SectionPanel",
  props: {
    title: String,
    moreUrl: String,
  },
  setup() {
    return {};
  },
  computed: {
    getTitle() {
      return this.title;
    },
    getMoreURL() {
      return this.moreUrl;
    },
  },
});
</script>
