<template>
  <div>
    <q-dialog v-model="dashboardDialog1">
      <q-card class="my-card">
        <!-- <q-img lazy src="https://cdn.quasar.dev/img/chicken-salad.jpg" height="150px" /> -->
        <q-card-section>
          <q-uploader flat bordered :url="config.dmsUploadURL" :label="$t('cover')" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row mt-5">
            <div class="col-6">
              <dynamic-form
                :id="testForm.id"
                :fields="testForm.fields"
                @change="valuesChanged"
              />
            </div>
            <div class="col-6">
              <pre>{{ formData }}</pre>
              <pre>{{ testForm }}</pre>
            </div>
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  TextField,
  EmailField,
  PasswordField,
  passwordValidator,
} from "@asigloo/vue-dynamic-forms";

export default {
  name: "DashboardDialog",
  setup() {
    return {
      dashboardDialog1: true,
      formData: {},
      testForm: {
        id: "my-awesome-form",
        fields: {
          name: TextField({
            label: "Name",
          }),
          email: EmailField({
            label: "Email",
          }),
          password: PasswordField({
            label: "Password",
            autocomplete: "current-password",
            validations: [passwordValidator],
          }),
        },
      },
    };
  },
};
</script>
