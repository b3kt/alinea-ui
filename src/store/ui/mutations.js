export function showLoginDialog(state) {
  state.dialog.login = true;
}
export function hideLoginDialog(state) {
  state.dialog.login = false;
}
export function showActivationDialog(state) {
  state.dialog.activation = true;
}
export function hideActivationDialog(state) {
  state.dialog.activation = false;
}
export function showDashboardDialog(state, params) {
  if (params !== undefined && params !== null) {
    Object.assign(state.dialog.form, params);
  }
  state.dialog.dashboard = true;
}
export function hideDashboardDialog(state) {
  state.dialog.dashboard = false;
}
export function setRequireLogin(state, isRequired) {
  state.requireLogin = isRequired;
}
export function setKeycloakInstance(state, keycloakInstance) {
  state.keycloakInstance = keycloakInstance;
}
export function setFormData(state, formFieldObj){
  if(formFieldObj.name !== undefined && formFieldObj.value !== undefined){
    state.dialog.form.model[formFieldObj.name] = formFieldObj.value;
  }
}
export function setFormSchema(state, schemaObj){
  if(schemaObj !== undefined && schemaObj !== undefined){
    state.dialog.form.schema = schemaObj;
  }
}
export function resetFormModel(state){
  state.dialog.form.model = {};
}
export function setFormModel(state, modelObj){
  state.dialog.form.model = modelObj;
}
