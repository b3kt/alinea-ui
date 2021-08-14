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
  state.roles = content.resource_access["alinea-ui"].roles;
  state.username = content.preferred_username;

  secureStorage.setItem('session', Object.assign({},state));
  if(secureStorage.getItem("current_role") === undefined){
    secureStorage.setItem("current_role", 'user');
  }
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
