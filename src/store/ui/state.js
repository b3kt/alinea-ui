export default function () {
  return {
    requireLogin: false,
    dialog: {
      login: false,
      dashboard: false,
      activation: false,
      form: {
        title: null,
        schema: {},
        model: {},
        events: {},
      }
    },
    keycloakInstance: null
  };
}
