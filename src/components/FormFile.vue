<template>
  <FormField :label="label" :required="required">
    <q-file
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
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <p v-show="validation.errorMessage" v-text="validation.errorMessage"></p>
  </FormField>
</template>

<script>
import FormField from "components/FormField";
export default {
  name: "FormFile",
  components: { FormField },
  props: {
    // modelValue: { required: true },
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
