<template>
  <div class="fullscreen bg-secondary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>
      <div class="text-h4" style="opacity: 0.4">Oops. Nothing here...</div>
      <div>{{$t('redirecting_in')}} {{count}}</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        :label="$t('go_home')"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  data() {
    return {
      count: 1,
    };
  },
  mounted() {
    if (this.count > 0) {
      setTimeout(() => {
        this.count--;
      }, 1000);
    }
  },
  updated() {
    if (this.count > 0) {
      setTimeout(() => {
        this.count--;
      }, 1000);
    } else {
      this.$store.commit('ui/hideLoginDialog');
      // this.$router.push("/");
    }
  }
};
</script>
