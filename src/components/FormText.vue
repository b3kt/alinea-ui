<template>
  <FormField :label="label" :required="required">
    <q-input outlined dense
      :name="name"
      :type="type"
      v-model="modelValue"
      :required="required"
      :id="uuid"
      :disabled="readOnly"
      @blur="update($event)"
    />
    <p v-show="validation.errorMessage" v-text="validation.errorMessage"></p>
  </FormField>
</template>

<script>
import FormField from "components/FormField"
export default {
  name: 'FormText',
  components: { FormField },
  props: {
    value: { required: true },
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    // config: {
    //   type: Object,
    //   default: () => ({ type: "text" })
    // },
    readOnly: {
      type: Boolean,
      default: false
    },
    uuid: {
      type: Number,
      default: 0
    },
    validation: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: "text"
    },
    validations: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const val = this.value;
    return {
      modelValue: val
    }
  },
  computed: {
    labelHtml() {
      const requiredHtml =
        this.validations._exclusive && this.validations._exclusive.required
          ? ' <span class="label--required">*</span>'
          : "";
      return this.label + requiredHtml;
    }
  },
  methods: {
    update(evt) {
      this.$store.commit('ui/setFormData', {
        name: evt.target.name,
        value: this.modelValue,
      })
    }
  }
};
</script>
