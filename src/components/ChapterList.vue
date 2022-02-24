<template>
  <div>
    <q-list
      dense
      padding
      class="rounded-borders"
      v-if="data !== undefined && data !== null"
    >
      <q-item
        clickable
        v-ripple
        v-for="(item, idx) in data"
        :key="idx"
        @click="goto(item.chapter_uid)"
      >
        <q-item-section style="max-width: 24px"> {{ idx + 1 }}. </q-item-section>
        <q-item-section class="text-capitalize q-py-sm">
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label
            caption
            lines="2"
            class="text-small text-weight-light text-grey"
            >{{ item.intro }}</q-item-label
          >
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
    readonly: {
      type: Boolean,
      dafault: false,
    },
    
  },
  setup() {
    return {};
  },
  methods: {
    goto(uid) {

      this.$router.push(this.readonly ? ("/read/chapter/" + uid) : ("/author/chapter/" + uid) );
    },
  },
};
</script>
