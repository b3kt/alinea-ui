<template>
  <div class="row q-pb-md">
    <div class="col-12">
      <span class="text-weight-light text-primary text-capitalize">{{getLabel}}</span>
      <span v-if="isRequired" class="text-weight-bold text-red q-mx-xs">*</span>
    </div>
    <div class="col-12">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    label: {
      required: true,
      default: '',
      type: String
    },
    required: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  setup () {
    return {}
  },
  computed: {
    getLabel(){
      return this.label;
    },
    isRequired () {
      return this.required;
    }
  }
}
</script>
