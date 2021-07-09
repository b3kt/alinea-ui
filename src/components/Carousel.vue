<template>
  <q-card class="q-mt-md">
    <q-carousel arrows animated v-model="slide" height="400px">
      <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Second stop</div>
          <div class="text-subtitle1">Famous City</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Third stop</div>
          <div class="text-subtitle1">Famous Bridge</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-card>
</template>

<script>
// import gql from "graphql-tag";
import { defineComponent } from "vue-demi";
import { ref } from "vue";

export default defineComponent({
  name: "Carousel",
  setup() {
    return {
      slide: "first",
    };
  },
  // apollo: {
  //   banners: {
  //     query: gql`
  //       query fetchBanners {
  //         banners {
  //           title
  //           subtitle
  //           content
  //           image_url
  //           target_url
  //           btn_label
  //         }
  //       }
  //     `,
  //   },
  // },
  methods: {
    goto(url) {
      window.location.href = url;
    },
    onResize(size) {
      this.banner = size;
    },
  },
  computed: {
    getFontSize() {
      return this.$q.screen.sm || this.$q.screen.xs ? 0.6 : this.banner.width / 1500;
    },
    getMaxHeight() {
      return 480;
    },
    getBannerRatio() {
      if (this.$q.screen.sm || this.$q.screen.xs) {
        return 5 / 8;
      } else if (this.$q.screen.md) {
        return 5 / 2;
      } else {
        return 5 / 1;
      }
    },
    getTextAlign() {
      return this.$q.screen.sm || this.$q.screen.xs ? " text-center " : "";
    },
    getLineHeight() {
      return this.$q.screen.sm || this.$q.screen.xs
        ? "line-height: 1.5rem  !important; padding-bottom: 16px;"
        : "";
    },
  },
});
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
