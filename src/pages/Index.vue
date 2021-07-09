<template>
  <q-page class="x-default-maxwidth q-mx-auto">
    <Carousel />

    <SectionPanel :title="$t('recommended_stories')" moreUrl="stories">
      TEST
    </SectionPanel>

    <SectionPanel :title="$t('recommended_stories')" moreUrl="stories">
      TEST
    </SectionPanel>
    <!-- <q-card>
      <q-card-section> [{{ isAuthenticated }}] </q-card-section>
    </q-card> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Carousel from "components/Carousel";
import SectionPanel from "components/SectionPanel";

export default defineComponent({
  name: "PageIndex",
  components: { Carousel, SectionPanel },
  mounted() {},
  computed: {
    isAuthenticated() {
      return this.$keycloak !== undefined && this.$keycloak !== null
        ? this.$keycloak.authenticated
        : false;
    },
  },
});
</script>
