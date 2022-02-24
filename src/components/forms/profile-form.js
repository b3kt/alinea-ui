import { shallowRef, ref } from "vue";
import FormText from "components/FormText.vue";
import { SchemaForm, useSchemaForm } from "formvuelate";

const formText = shallowRef(FormText);
const profileSchema = {
  name: {
    component: formText,
    label: "Name",
    name: "name",
    required: true,
    type: "text",
  },
  bio: {
    component: formText,
    label: "Bio",
    name: "bio",
    type: "textarea",
  },
  phone: {
    component: formText,
    label: "Phone",
    name: "phone",
    type: "phone",
  },
  // email: {
  //   component: formText,
  //   label: "Email",
  //   name: "email",
  //   type: "email",
  //   value: null,
  // },
  website: {
    component: formText,
    label: "Website",
    name: "website",
    type: "text",
    value: null,
  },
};

export default profileSchema ;
