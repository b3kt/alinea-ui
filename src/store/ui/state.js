export default function () {
  return {
    requireLogin: false,
    dialog: {
      login: false,
      dashboard: false,
    },
    keycloakInstance: null
  };
}
