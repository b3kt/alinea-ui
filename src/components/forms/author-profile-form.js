import { shallowRef, ref } from "vue";
import FormText from "components/FormText";
import FormFile from "components/FormFile";
// import { SchemaForm, useSchemaForm } from "formvuelate";

const formText = shallowRef(FormText);
const formFile = shallowRef(FormFile);

const authorProfileSchema = {
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
  email: {
    component: formText,
    label: "Email",
    name: "email",
    type: "email",
    value: null,
  },
  website: {
    component: formText,
    label: "Website",
    name: "website",
    type: "text",
    value: null,
  },


  // cover: {
  //   component: formFile,
  //   label: "Cover",
  //   name: "cover",
  //   type: "text",
  //   value: null,
  //   readOnly: false
  // },

  // avatar: {
  //   component: formFile,
  //   label: "Avatar",
  //   name: "avatar",
  //   type: "text",
  //   value: null,
  //   readOnly: false
  // },
};

export default authorProfileSchema ;
