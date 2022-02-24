<template>
  <div>
    <q-dialog v-model="activationDialog" @before-hide="onResetFormData()">
      <q-card style="min-height: 400px">
        <q-stepper
          class="bg-transparent"
          flat
          v-model="step"
          ref="stepper"
          animated
          alternative-labels
          done-color="secondary"
          active-color="primary"
          inactive-color="grey"
          @input="onStepLoaded"
        >
          <q-step :name="1" icon="settings" :title="$t('confirmation')" :done="step > 1">
            <div class="row q-col-gutter-lg">
              <div class="col-12 text-h4 text-center text-secondary">
                {{ $t("one_step_closer_to_inspiring_the_world") }}
              </div>
              <div class="col-6 text-center q-mx-auto">
                <q-img src="~assets/become_author.png" />
              </div>
              <div class="col-12 text-h6 text-center text-secondary">
                <div class="q-mx-auto" style="max-width: 400px">
                  {{ $t("by_continue_agreements") }}
                </div>
              </div>
            </div>
          </q-step>

          <q-step
            :name="2"
            :caption="$t('optional')"
            icon="las la-user-circle"
            :title="$t('set_avatar')"
            :done="step > 2"
          >
            <div class="row q-col-gutter-md">
              <div class="col-12 text-h4 text-center text-secondary q-mb-lg">
                {{ $t("complete_author_profile") }}
              </div>
              <SchemaForm :schema="getDialogSchema" class="q-mx-auto"/>
            </div>
          </q-step>

          <q-step :name="3" :title="$t('complete_profile')" icon="las la-check-circle">
            <div class="row">
              <div class="col text-h4 text-center">
                {{ $t("complete_author_profile_2") }}
              </div>
            </div>
            <div class="row">
              <div class="col text-center">completed!</div>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="text-center">
              <q-btn
                v-if="step === 1"
                outline
                color="primary"
                :label="$t('cancel')"
                class="q-mx-xs"
                @click="onCloseDialog()"
              />
              <q-btn
                v-if="step > 1"
                outline
                color="primary"
                @click="$refs.stepper.previous()"
                label="Back"
                class="q-mx-xs"
              />
              <q-btn
                @click="onConfirm(step)"
                color="primary"
                class="q-mx-xs"
                :label="step === 3 ? 'Create' : 'Continue'"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <!-- <q-card-action> TEST </q-card-action> -->
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { shallowRef, ref } from "vue";
import { SchemaForm, useSchemaForm } from "formvuelate";
import { mapGetters } from "vuex";
export default {
  name: "ActivationDialog",
  components: { SchemaForm },
  data() {
    return {
      step: 1,
    };
  },
  setup() {
    const userData = ref({});
    useSchemaForm(userData);
    return {
      userData
    };
  },
  computed: {
    ...mapGetters({
      activationDialog: "ui/getActivationDialog",
      getDialogForm: "ui/getDialogForm",
    }),
     getDialogSchema () {
      return this.getDialogForm.schema;
    },
    getDialogModel () {
      return this.getDialogForm.model;
    }
  },
  methods: {
    onCloseDialog() {
      this.$store.commit("ui/hideActivationDialog");
    },
    onStepLoaded(value) {
      if (value === 2) {
      } else if (value === 3) {
        // this.fetchAuthorInfo();
      }
    },
    onValidate() {
      return true;
    },
    onConfirm(step) {
      if (step === 1) {
        this.$refs.stepper.next();
      } else if (step === 2) {
        this.$refs.stepper.next();
      } else if (step === 3) {
        if (this.onValidate()) {
          const resp = this.$store.dispatch("model/enableAuthor");
          if(resp !== undefined){
            resp.then((resp) => {
              this.doLogout();
            })
          }
        } else {
          alert("invalid");
        }
      } else {
        this.$refs.stepper.next();
      }
    },
  },
};
</script>
