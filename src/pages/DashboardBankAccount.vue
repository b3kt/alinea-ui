<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-lg-6 col-12">
        <Widget :title="$t('bank_account')" :action="onAddBank" :actionLabel="$t('add_bank_account')">
          <div v-for="(item,idx) in getBank" :key="idx" class="row q-col-gutter-md">
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
  name: "DashboardBank",
  components: { Widget, FormPreview },
  methods: {
    onAddBank() {
      this.$store.dispatch("model/fetchUserBank")
    },
  },
  mounted() {
    this.$store.dispatch("model/fetchUserBank")
  },
  computed: {
    ...mapGetters({
      getBank: "model/getBanks",
    }),
  },
};
</script>
