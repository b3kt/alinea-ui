import { shallowRef, ref } from "vue";
import FormText from "components/FormText";
import FormFile from "components/FormFile";

const formText = shallowRef(FormText);
const formFile = shallowRef(FormFile);

const chapterSchema = {
  title: {
    component: formText,
    label: "Title",
    name: "title",
    required: true,
    type: "text",
  },
  intro: {
    component: formText,
    label: "Intro",
    name: "intro",
    type: "textarea",
  },
  cover: {
      component: formFile,
      label: "Cover",
      name: "cover",
      type: "file",
  },
};

export default chapterSchema;
