<template>
  <q-page>
    <Carousel class="q-ma-sm q-mx-auto x-default-maxwidth" />

    <section id="quicklink" class="q-mx-auto x-default-maxwidth" v-if="isAuthenticated">
      <Quicklink/>
    </section>

    <section id="stories" class="q-mx-auto x-default-maxwidth">
      <SectionPanel :title="$t('recommended_stories')" moreUrl="stories">
        <q-virtual-scroll
          :items="getTopStories"
          virtual-scroll-horizontal
          class="hide-native-scrollbar"
        >
          <template v-slot="{ item }">
            <BookItem :data="item" mode="detail" :readonly="true" />
          </template>
        </q-virtual-scroll>
      </SectionPanel>

      <SectionPanel :title="$t('new_stories')" moreUrl="stories">
        <q-virtual-scroll
          :items="getNewStories"
          virtual-scroll-horizontal
          class="hide-native-scrollbar"
        >
          <template v-slot="{ item }">
            <BookItem :data="item" mode="simple" :readonly="true" classes="q-mr-md" />
          </template>
        </q-virtual-scroll>
      </SectionPanel>

      <SectionPanel :title="$t('stories_on_sale')" moreUrl="stories">
        <q-virtual-scroll
          :items="getSaleStories"
          virtual-scroll-horizontal
          class="hide-native-scrollbar"
        >
          <template v-slot="{ item }">
            <BookItem :data="item" mode="simple" :readonly="true" classes="q-mr-md" />
          </template>
        </q-virtual-scroll>
      </SectionPanel>
    </section>

    <section id="books" class="bg-orange-1 q-py-lg">
      <div class="q-mx-auto x-default-maxwidth">
        <SectionPanel :title="$t('recommended_stories')" moreUrl="stories">
          <q-virtual-scroll
            :items="getTopStories"
            virtual-scroll-horizontal
            class="hide-native-scrollbar"
          >
            <template v-slot="{ item }">
              <BookItem :data="item" mode="detail" :readonly="true" />
            </template>
          </q-virtual-scroll>
        </SectionPanel>

        <SectionPanel :title="$t('new_stories')" moreUrl="stories">
          <q-virtual-scroll
            :items="getNewStories"
            virtual-scroll-horizontal
            class="hide-native-scrollbar"
          >
            <template v-slot="{ item }">
              <BookItem :data="item" mode="simple" :readonly="true" classes="q-mr-md" />
            </template>
          </q-virtual-scroll>
        </SectionPanel>

        <SectionPanel :title="$t('stories_on_sale')" moreUrl="stories">
          <q-virtual-scroll
            :items="getSaleStories"
            virtual-scroll-horizontal
            class="hide-native-scrollbar"
          >
            <template v-slot="{ item }">
              <BookItem :data="item" mode="simple" :readonly="true" classes="q-mr-md" />
            </template>
          </q-virtual-scroll>
        </SectionPanel>
      </div>
    </section>

    <section id="downloadBtn" class="q-pa-lg bg-grey-2">
      <div class="row q-col-gutter-sm q-mx-auto x-default-maxwidth">
        <div class="col-6">
          <div class="text-h6 text-left text-primary">
            asytdrays dtrsa dtas ydtas rydtsa dyats dya dyas tdya dstya tdsya
            tdsrytsadryts
          </div>
        </div>
        <div class="col-3 text-center">
          <q-btn size="lg" class="q-mx-auto bg-primary text-white">{{
            $t("sell_via_alinea")
          }}</q-btn>
        </div>
        <div class="col-3 text-center">
          <q-btn size="lg" class="q-mx-auto bg-primary text-white">{{
            $t("sell_via_alinea")
          }}</q-btn>
        </div>
      </div>
    </section>

    <section id="postItem" class="q-pa-md">
      <div class="row q-col-gutter-sm q-mx-auto x-default-maxwidth">
        <div class="col-8 text-right vertical-middle">
          <q-card class="" flat>
            <q-card-section>
              <div class="text-h6">asytdrays dtrsa dtas ydtas rydtsa dyats dya dyas</div>
              <div class="q-py-md">
                asytdrays dtrsa dtas ydtas rydtsa dyats dya dyas asytdrays dtrsa dtas
                ydtas rydtsa dyats dya dyasasytdrays dtrsa dtas ydtas rydtsa dyats dya
                dyasasytdrays dtrsa dtas ydtas rydtsa dyats dya dyasasytdrays dtrsa dtas
                ydtas rydtsa dyats dya dyas
              </div>
              <q-btn size="lg" class="q-mx-auto bg-primary text-white">{{
                $t("sell_via_alinea")
              }}</q-btn>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4 text-center">
          <q-card
            class="book-item bg-transparent q-mx-auto"
            flat
            style="max-width: 200px"
          >
            <q-card-section>
              <q-img
                :src="config.defaultImageURL"
                :ratio="2 / 3"
                class="book-item-img rounded-img"
                clickable
                v-ripple
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <section id="features" class="q-pa-md bg-grey-2">
      <div class="row q-col-gutter-sm q-mx-auto x-default-maxwidth">
        <div class="col-12 text-center text-primary text-h5">
          {{ $t("advantage_writing_in_alinea") }}
        </div>
        <div class="col-4">
          <FeatureItem color="primary" icon="la la-laptop" :title="$t('multi_device')" />
        </div>
        <div class="col-4">
          <FeatureItem
            color="primary"
            icon="la la-upload"
            :title="$t('easy_to_publish')"
          />
        </div>
        <div class="col-4">
          <FeatureItem color="primary" icon="la la-coins" :title="$t('great_income')" />
        </div>
      </div>
    </section>

    <section id="offers" class="q-pa-lg bg-secondary">
      <div class="row q-col-gutter-sm q-mx-auto x-default-maxwidth">
        <div class="col-8">
          <div class="text-h6 text-right text-white">
            asytdrays dtrsa dtas ydtas rydtsa dyats dya dyas tdya dstya tdsya
            tdsrytsadryts
          </div>
        </div>
        <div class="col-4 text-center">
          <q-btn size="lg" class="q-mx-auto bg-primary text-white">{{
            $t("sell_via_alinea")
          }}</q-btn>
        </div>
      </div>
    </section>

    <section id="features2" class="q-pa-md bg-grey-2">
      <div class="row q-col-gutter-sm q-mx-auto x-default-maxwidth">
        <div class="col-12 text-center text-secondary text-h5">
          {{ $t("advantage_sell_via_alinea") }}
        </div>
        <div class="col-4">
          <FeatureItem
            color="secondary"
            icon="las la-chart-line"
            :title="$t('double_profit')"
          />
        </div>
        <div class="col-4">
          <FeatureItem
            color="secondary"
            icon="las la-chart-pie"
            :title="$t('digital_rent')"
          />
        </div>
        <div class="col-4">
          <FeatureItem
            color="secondary"
            icon="las la-tachometer-alt"
            :title="$t('great_dashboard')"
          />
        </div>
      </div>
    </section>

    <section id="footerMenu" class="q-pt-xl">
      <div class="q-mx-auto x-default-maxwidth">
        <FooterMenu />
      </div>
    </section>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import Carousel from "components/Carousel";
import SectionPanel from "components/SectionPanel";
import BookItem from "components/BookItem";
import FooterMenu from "components/FooterMenu";
import FeatureItem from "components/FeatureItem";
import Quicklink from "components/Quicklink";

export default defineComponent({
  name: "PageIndex",
  components: { Quicklink, Carousel, SectionPanel, BookItem, FooterMenu, FeatureItem },
  mounted() {
    this.$store.dispatch("model/fetchStoriesByCriteria", "topStories");
    this.$store.dispatch("model/fetchStoriesByCriteria", "newStories");
    this.$store.dispatch("model/fetchStoriesByCriteria", "saleStories");
  },
  computed: {
    isAuthenticated() {
      return this.$keycloak !== undefined && this.$keycloak !== null
        ? this.$keycloak.authenticated
        : false;
    },
    ...mapGetters({
      getFeeds: "model/getFeeds",
    }),
    getTopStories() {
      return this.getFeeds.topStories;
    },
    getNewStories() {
      return this.getFeeds.newStories;
    },
    getSaleStories() {
      return this.getFeeds.saleStories;
    },
  },
});
</script>
