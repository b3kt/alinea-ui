<template>
  <FormField :label="label" :required="required">
    <q-file
      v-if="isNil(value)"
      :name="name"
      :type="config.type"
      v-model="modelValue"
      :required="required"
      :id="uuid"
      :disabled="readOnly"
      @update:model-value="update"
      dense
      outlined
      :label="label"
      counter
      :counter-label="counterLabelFn"
      max-files="3"
      :multiple="false"
      style="max-width: 300px"
    >
      <template v-slot:prepend>
        <q-icon name="las la-paperclip" />
      </template>
    </q-file>
    <q-card v-else style="width: 120px" flat bordered>
      <q-img :src="value.thumbnail_url" :ratio="2 / 3" />
      <q-card-section class="q-pa-none text-right">
        <q-btn
          flat
          class="full-width"
          icon="la la-trash"
          @click.stop="onDeleteImageEvent()"
        />
      </q-card-section>
    </q-card>
    <p v-show="validation.errorMessage" v-text="validation.errorMessage"></p>
  </FormField>
</template>

<script>
import { axiosUploadInstance } from "boot/axios";
import FormField from "components/FormField";
export default {
  name: "FormFile",
  components: { FormField },
  props: {
    value: { required: true },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    config: {
      type: Object,
      default: () => ({ type: "text" }),
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    uuid: {
      type: Number,
      default: 0,
    },
    validation: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: "text",
    },
    validations: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      modelValue: null,
    };
  },
  computed: {
    // labelHtml() {
    //   const requiredHtml =
    //     this.validations._exclusive && this.validations._exclusive.required
    //       ? ' <span class="label--required">*</span>'
    //       : "";
    //   return this.label + requiredHtml;
    // },
  },
  methods: {
    onDeleteImage() {
      const session = this.$secureStorage.getItem("session");
      const fileUUID = this.value.file_uuid;
      return axiosUploadInstance.delete("/delete/" + fileUUID, {
        headers: {
          Authorization: "Bearer " + session.token,
        },
      });
    },
    onDeleteImageEvent() {
      this.$q
        .dialog({
          title: this.$t("delete_confirm"),
          message: this.$t("delete_confirm_msg"),
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.onDeleteImage().then((response) => {
            if (
              response !== undefined &&
              response !== null &&
              response.data !== undefined &&
              response.data !== null
            ) {
              this.$store
                .dispatch("model/deleteImage", {
                  uuid: this.value.file_uuid,
                })
                .then((resp) => {
                  this.$q.notify({
                    color: "positive",
                    message: this.$t("succesfully_deleted"),
                  });
                  this.$store.commit("ui/setFormData", {
                    name: this.name,
                    value: null,
                  });
                });

              // this.$q.notify({
              //   color: response.data.code === 200 ? "positive" : "negative",
              //   message:
              //     response.data.code === 200
              //       ? this.$t("succesfully_deleted")
              //       : this.$t("unable_to_delete"),
              // });

              // if (response.data.code === 200) {
              //   this.$store.commit("ui/setFormData", {
              //     name: this.name,
              //     value: null,
              //   });
              // }
            }
          });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    update(file) {
      this.getBase64(file).then((data) => {
        this.$store.commit("ui/setFormData", {
          name: this.name,
          value: file,
        });
      });
    },
    counterLabelFn({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`;
    },
  },
};
</script>
