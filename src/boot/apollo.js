import { ApolloClient } from "@apollo/client/core";
import { ApolloClients } from "@vue/apollo-composable";
import { boot } from "quasar/wrappers";
import { getClientOptions } from "src/apollo";

const options = /* await */ getClientOptions(/* {app, router ...} */);
const apolloClientInstance = new ApolloClient(options);

export default boot(
  /* async */ ({ app }) => {
    // Default client.
    const apolloClients = {
      default: apolloClientInstance,
    };
    app.provide(ApolloClients, apolloClients);
    app.config.globalProperties.$apollo = apolloClientInstance;
  }
);

export { apolloClientInstance }
