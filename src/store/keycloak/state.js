export default function () {
  return {
    isAuthenticated: false,
    hasFailed: false,
    isPending: false,
    token: "",
    decodedToken: {},
    username: "",
    roles: [],
  };
}
