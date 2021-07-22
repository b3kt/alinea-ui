export default function () {
  return {
    requireLogin: false,
    dialog: {
      login: false,
      dashboard: false,
      form: {
        title: null,
        schema: {},
        model: {}
      }
    },
    keycloakInstance: null
  };
}
