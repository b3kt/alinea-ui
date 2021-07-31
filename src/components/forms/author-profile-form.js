import { shallowRef, ref } from "vue";
import FormText from "components/FormText.vue";
import FormFile from "components/FormFile.vue";
import FormSelect from "components/FormSelect.vue";
import { SchemaForm, useSchemaForm } from "formvuelate";

const authorProfileSchema = {
  name: {
    component: FormText,
    label: "Name",
    name: "name",
    required: true,
    config: {
      type: "text",
    },
  },
  bio: {
    component: FormText,
    label: "Bio",
    name: "bio",
    config: {
      type: "textarea",
    },
  },
  cover: {
    component: FormFile,
    label: "Cover",
    name: "cover",
    config: {
      type: "file",
    },
  },
  avatar: {
    component: FormFile,
    label: "Avatar",
    name: "avatar",
    config: {
      type: "file",
    },
  },
};

export default authorProfileSchema;