import { shallowRef, ref } from "vue";
import FormText from "components/FormText.vue";
import { SchemaForm, useSchemaForm } from "formvuelate";

const formText = shallowRef(FormText);
const formFile = shallowRef(FormFile);

const addressSchema = {
    address: {
        component: formText,
        label: "address",
        type: "textarea",
        name: "address",
        required: true,
        value: null
    },
    city: {
        component: formText,
        label: "city",
        type: "text",
        name: "city",
        required: true,
        value: null
    },
    state: {
        component: formText,
        label: "state",
        type: "text",
        name: "state",
        required: true,
        value: null
    },
    country: {
        component: formText,
        label: "country",
        type: "text",
        name: "country",
        required: true,
        value: null
    },
    postal_code: {
        component: formText,
        label: "postal_code",
        type: "text",
        name: "postal_code",
        required: true,
        value: null
    },
    is_default: {
        component: formText,
        label: "is_default",
        type: "text",
        name: "is_default",
        required: true,
        value: null
    },
};

export default addressSchema;