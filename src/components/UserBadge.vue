<template>
  <div>
    <q-avatar size="36px" v-if="avatar !== null" cover>
      <img :alt="name" :src="avatar" class="cover" />
    </q-avatar>
    <span class="q-px-sm text-capitalize">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "UserBadge",
  props: {
    avatar: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
  setup() {
    return {};
  },
};
</script>
