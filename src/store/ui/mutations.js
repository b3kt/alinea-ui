export function showLoginDialog (state) {
    state.dialog.login = true;
}
export function hideLoginDialog (state) {
    state.dialog.login = false;
}
export function setRequireLogin (state, isRequired) {
    state.requireLogin = isRequired;
}


