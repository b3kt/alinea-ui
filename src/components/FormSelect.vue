<template>
  <div>
    <label :for="uuid" v-html="labelHtml" />
    <select
      :value="modelValue"
      :required="required"
      :id="uuid"
      @input="update($event.target.value)"
    >
      <option v-if="!disableNoSelection">-</option>
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    modelValue: { required: true },
    required: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => {},
    },
    uuid: {
      type: Number,
      default: 0,
    },
    label: { type: String, required: true },
    options: { type: Array, required: true },
    disableNoSelection: { type: Boolean, default: false },
    validations: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    labelHtml() {
      const requiredHtml =
        this.validations._exclusive && this.validations._exclusive.required
          ? ' <span class="label--required">*</span>'
          : "";
      return this.label + requiredHtml;
    },
  },
  methods: {
    update(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
