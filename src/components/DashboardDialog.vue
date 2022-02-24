<template>
  <q-dialog v-model="dashboardDialog" persistent :maximized="maximized" @before-hide="onResetFormData()" transition-show="slide-up" transition-hide="slide-down">
    <q-card class="my-card">
      <q-bar class="my-bar bg-grey-4 no-bottom-radius">
        <q-space />
        <q-btn dense flat icon="las la-stop" @click="maximize()" v-if="!maximized">
          <q-tooltip>{{ $t("tooltip_maximize") }}</q-tooltip>
        </q-btn>
        <q-btn class="gt-sm" dense flat icon="las la-minus" @click="minimize()" v-else>
          <q-tooltip>{{ $t("tooltip_minimize") }}</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="las la-times" @click="close()">
          <q-tooltip>{{ $t("close") }}</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-title text-h6">{{getDialogTitle}}</div>
        </q-card-section>
        <q-space />
        <q-card-section>
          <q-btn
            flat
            type="submit"
            :label="$q.screen.gt.sm ? $t('save') : ''"
            icon="la la-save"
            class="q-ml-sm bg-primary text-white"
            @click.prevent="getDialogEvent.onSave()"
          >
            <q-tooltip>{{ $t("tooltip_save") }}</q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row mt-5">
          <div class="col-12">
            <SchemaForm :schema="getDialogSchema" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { shallowRef, ref } from "vue";
import { SchemaForm, useSchemaForm } from "formvuelate";
import { mapGetters } from "vuex";

export default {
  name: "DashboardDialog",
  components: { SchemaForm },
  setup() {
    const userData = ref({});
    useSchemaForm(userData);
    return {
      userData
    };
  },
  data() {
    return {
      maximized: this.$q.screen.xs,
    };
  },
  methods: {
    onSave() {
    },
    maximize() {
      this.maximized = true;
    },
    minimize() {
      this.maximized = false;
    },
    close() {
      this.$store.commit("ui/hideDashboardDialog");
    },
  },
  computed: {
    ...mapGetters({
        getDialogForm: "ui/getDialogForm",
    }),
    getDialogTitle () {
      return this.getDialogForm.title;
    },
    getDialogSchema () {
      return this.getDialogForm.schema;
    },
    getDialogModel () {
      return this.getDialogForm.model;
    },
    getDialogEvent () {
      return this.getDialogForm.events;
    } 
  }
};
</script>

<style scoped>
.q-dialog__inner--minimized > div {
  min-width: 600px !important;
}
.no-bottom-radius {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.no-top-radius {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.my-bar {
  max-height: 32px;
}
</style>
