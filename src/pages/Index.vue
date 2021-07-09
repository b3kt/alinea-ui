<template>
  <q-page class="x-default-maxwidth q-mx-auto">
    <Carousel class="q-ma-sm"/>

    <SectionPanel :title="$t('recommended_stories')" moreUrl="stories">
      TEST
    </SectionPanel>

    <SectionPanel :title="$t('recommended_stories')" moreUrl="stories">
      TEST
    </SectionPanel>
    
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Carousel from "components/Carousel";
import SectionPanel from "components/SectionPanel";

export default defineComponent({
  name: "PageIndex",
  components: { Carousel, SectionPanel },
  mounted() {
    this.$feeds.setItem('test', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  },
  computed: {
    isAuthenticated() {
      return this.$keycloak !== undefined && this.$keycloak !== null
        ? this.$keycloak.authenticated
        : false;
    },
  },
});
</script>
