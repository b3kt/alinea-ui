<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-lg-6 col-12">
        <Widget :title="$t('addresses')" :action="onAddAddress" :actionLabel="add_address">
          <div v-for="(item,idx) in getAddress" :key="idx" class="row q-col-gutter-md">
            <div class="col q-mb-md">
              <FormPreview :data="item" :enableDelete="true"/>
            </div>
          </div>
        </Widget>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import Widget from "components/Widget";
import FormPreview from "components/FormPreview";
export default {
  name: "DashboardAddress",
  components: { Widget, FormPreview },
  methods: {
    onAddAddress() {
      this.$store.dispatch("model/fetchUserAddress")
    },
  },
  mounted() {
    this.$store.dispatch("model/fetchUserAddress")
  },
  computed: {
    ...mapGetters({
      getAddress: "model/getAddress",
    }),
  },
};
</script>
