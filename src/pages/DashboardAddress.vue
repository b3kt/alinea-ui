<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-lg-6 col-12">
        <Widget :title="$t('addresses')" :action="onAddAddress" :actionLabel="$t('add_address')">
          <div v-for="(item,idx) in getAddress" :key="idx" class="row q-col-gutter-md">
            <div class="col q-mb-md">
              <FormPreview :data="item" :enableDelete="true" :onEdit="onEditAddress" :onDelete="onDeleteAddress"/>
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
import addressSchema from "components/forms/user-form";

export default {
  name: "DashboardAddress",
  components: { Widget, FormPreview },
  data() {},
  methods: {
    onAddAddress() {
      // this.$store.dispatch("model/fetchUserAddress");
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("add_address"),
        schema: addressSchema,
        events: {
          onSave: () => {
            this.onSaveAddress();
          },
        },
      });
    },
    populateFormModel() {
      if (!this.isNil(this.getAddress)) {
        // authorProfileSchema.name.value = this.getAddress.name;
        // authorProfileSchema.bio.value = this.getAddress.bio;
        // authorProfileSchema.email.value = this.getAddress.email;
        // authorProfileSchema.phone.value = this.getAddress.phone;
        // authorProfileSchema.website.value = this.getAddress.website;
      }
    },
    onDeleteAddress(test) {

      console.log("------------")
      console.log(test)
      console.log("------------")
      const resp = this.$store.dispatch("model/deleteAddress", {
        id: test.id
      });
      console.log(resp);
      if (resp !== undefined && resp !== null) {
        resp.then(() => {
          this.$q.notify({ color: "positive", message: this.$t("succesfully_saved") });
          this.$store.commit("ui/hideDashboardDialog");
        });
      }
    },
    onEditAddress() {
      // this.populateFormModel();
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("edit_address"),
        schema: addressSchema,
        events: {
          onSave: this.onSaveAddress,
        },
      });
    },
    onSaveAddress() {
      alert('on svae address')
    }
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
