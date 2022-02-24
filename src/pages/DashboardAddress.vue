<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-lg-6 col-12">
        <Widget
          :title="$t('addresses')"
          :action="onAddAddress"
          :actionLabel="$t('add_address')"
        >
          <div v-if="isNotEmpty(getAddress)">
            <div v-for="(item, idx) in getAddress" :key="idx" class="row q-col-gutter-md">
              <div class="col q-mb-md">
                <FormPreview
                  :data="item"
                  :enableDelete="true"
                  :onEdit="onEditAddress"
                  :onDelete="onDeleteAddress"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <q-card flat bordered>
              <q-card-section class="text-center">
                {{ $t("no_data") }}
              </q-card-section>
            </q-card>
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
import { addressSchema } from "components/forms/user-form";

export default {
  name: "DashboardAddress",
  components: { Widget, FormPreview },
  methods: {
    onAddAddress() {
      this.edit = false;
      this.$store.dispatch("model/fetchUserAddress");
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("add_address"),
        schema: addressSchema,
        events: {
          onSave: this.onSaveAddress,
        },
      });
    },
    populateFormModel(item) {
      if (!this.isNil(item)) {
        addressSchema.address.value = item.address;
        addressSchema.city.value = item.city;
        addressSchema.country.value = item.country;
        addressSchema.postal_code.value = item.postal_code;
        addressSchema.state.value = item.state
      }
    },
    onDeleteAddress(test) {
      const resp = this.$store.dispatch("model/deleteAddress", {
        id: test.id,
      });
      console.log(resp);
      if (resp !== undefined && resp !== null) {
        resp.then(() => {
          this.$q.notify({ color: "positive", message: this.$t("succesfully_saved") });
          this.$store.commit("ui/hideDashboardDialog");
        });
      }
    },
    onEditAddress(item) {
      console.log(item);
      this.edit = true;
      this.id = item.id;
      this.populateFormModel(item);
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("edit_address"),
        schema: addressSchema,
        events: {
          onSave: this.onSaveAddress,
        },
      });
    },
    onSaveAddress() {
      let vars = Object.assign({}, this.getDialogModel);
      if(this.edit){
        vars["id"] = this.id;
      }
      const resp = this.$store.dispatch(this.edit ? "model/updateAddress" : "model/createAddress", vars);
      if (resp !== undefined && resp !== null) {
        resp.then(() => {
          this.$q.notify({
            color: "positive",
            message: this.$t("succesfully_saved"),
          });
          this.$store.commit("ui/hideDashboardDialog");
          // this.$store.commit("model/setAddress", null);
          // this.initProfile();
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch("model/fetchUserAddress");
  },
  data(){
    return {
      edit: false,
      id: null
    }
  },
  computed: {
    ...mapGetters({
      getAddress: "model/getAddress",
    }),
  },
};
</script>
