<template>
  <FormField :label="label" :required="required">
    <q-editor
      :name="name"
      v-model="modelValue"
      :required="required"
      :id="uuid"
      outline
      content-class="grey-2"
      toolbar-text-color="grey-8"
      toolbar-toggle-color="primary"
      :dense="$q.screen.lt.md"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['fullscreen', 'removeFormat']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
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
    // modelValue: { required: true },
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
    config: {
      type: Object,
      default: () => ({ type: "text" })
    },
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
    return {
      modelValue: null
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
