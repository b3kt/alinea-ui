<template>
  <div>
    <q-list
      dense
      bordered
      padding
      class="rounded-borders"
      v-if="data !== undefined && data !== null"
    >
      <q-item clickable v-ripple v-for="(item, idx) in data" :key="idx">
        <q-item-section style="max-width:24px">
          {{ idx + 1 }}.
        </q-item-section>
        <q-item-section class="text-capitalize">
          {{ item.title }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "ChapterList",
  props: {
    data: {
      type: Array,
      dafault: [],
    },
  },
  setup() {
    return {};
  },
};
</script>
