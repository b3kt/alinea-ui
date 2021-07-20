import jwtDecode from "jwt-decode";
import { secureStorage } from "boot/app";

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}
const jwtDecode__default = /*#__PURE__*/ _interopDefaultLegacy(jwtDecode);

export function setToken(state, token) {
  state.token = token;
  const content = jwtDecode__default["default"](state.token);
  state.decodedToken = content;
  state.roles = content.realm_access.roles;
  state.username = content.preferred_username;

  secureStorage.setItem('session', Object.assign({},state));
}

export function hasFailed(state, value) {
  state.hasFailed = value;
}
export function isPending(state, value) {
  state.isPending = value;
}
export function isAuthenticated(state, value) {
  state.isAuthenticated = value;
}
