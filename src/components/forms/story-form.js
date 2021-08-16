import { shallowRef, ref } from "vue";
import FormText from "components/FormText.vue";
import FormFile from "components/FormFile.vue";
import FormSelect from "components/FormSelect.vue";
import { SchemaForm, useSchemaForm } from "formvuelate";

const storySchema = {
  title: {
    component: FormText,
    label: "Title",
    name: "title",
    required: true,
    config: {
      type: "text",
    },
    value: null
  },
  intro: {
    component: FormText,
    label: "Intro",
    name: "intro",
    config: {
      type: "textarea",
    },
    value: null
  },
  cover: {
    component: FormFile,
    label: "Cover",
    name: "cover",
    config: {
      type: "file",
    },
    value: null,
  },
  // work: {
  //   component: SchemaForm,
  //   schema: {
  //     address: {
  //       component: FormText,
  //       label: "Work address",
  //     },
  //     phone: {
  //       component: FormText,
  //       label: "Work phone",
  //     },
  //     details: {
  //       component: SchemaForm,
  //       schema: {
  //         position: {
  //           component: FormText,
  //           label: "Work position",
  //         },
  //         employees: {
  //           component: FormSelect,
  //           label: "Number of employees",
  //           options: ["1", "2", "3", "4+"],
  //         },
  //       },
  //     },
  //   },
  // },
};

export default storySchema;