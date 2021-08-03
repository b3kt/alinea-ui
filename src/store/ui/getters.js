export function getLoginDialog (state) {
    return state.dialog.login;
}
export function getActivationDialog (state) {
    return state.dialog.activation;
}
export function getDashboardDialog (state) {
    return state.dialog.dashboard;
}
export function getRequireLogin (state) {
    return state.requireLogin;
}
export function getKeycloakInstance (state) {
    return state.keycloakInstance;
}
export function getDialogForm (state) {
    return state.dialog.form;
}
export function getDialogModel (state) {
    return state.dialog.form.model;
}

