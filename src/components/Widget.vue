<template>
  <div>
    <q-card flat class="bg-transparent">
      <q-card-section v-if="getTitle != null" horizontal class="row q-mt-sm">
        <q-card-section class="col q-px-none">
          <div class="text-primary title text-weight-light text-h6">
            {{ getTitle }}
          </div>
        </q-card-section>
        <q-card-section class="col-1" v-if="getHasMore">
          <a href="#"> more.. </a>
        </q-card-section>
        <q-card-section class="q-px-none" v-if="action !== undefined && action !== null">
          <q-btn color="primary" class="q-px-md" icon="la la-plus" dense outline @click="action()">
            {{ actionLabel }}
          </q-btn>
        </q-card-section>
      </q-card-section>
      <q-card-section class="q-py-sm q-pa-none">
        <q-card flat class="bg-transparent">
          <q-card-section class="q-px-none q-py-none q-pb-lg">
            <slot></slot>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Widget",
  props: {
    title: String,
    classes: String,
    hasMore: { type: Boolean, default: false },
    action: { type: Function, default: null },
    actionLabel: { type: String, default: "add" },
  },
  setup() {
    return {};
  },
  computed: {
    getTitle() {
      return this.title;
    },
    getClasses() {
      return this.classes;
    },
    getHasMore() {
      return this.hasMore;
    },
  },
};
</script>
