import { shallowRef, ref } from "vue";
import FormText from "components/FormText";
import FormFile from "components/FormFile";
import FormSelect from "components/FormSelect";
import FormEditor from "components/FormEditor";
import { SchemaForm, useSchemaForm } from "formvuelate";

const chapterSchema = {
  title: {
    component: FormText,
    label: "Title",
    name: "title",
    required: true,
    config: {
      type: "text",
    },
  },
  intro: {
    component: FormText,
    label: "Intro",
    name: "intro",
    config: {
      type: "textarea",
    },
  },
  // content: {
  //     component: FormEditor,
  //     label: "Intro",
  //     name: "intro",
  //     config: {
  //         type: "editor",
  //     },
  // },
  // cover: {
  //     component: FormFile,
  //     label: "Cover",
  //     name: "cover",
  //     config: {
  //         type: "file",
  //     },
  // },
};

export default chapterSchema;
