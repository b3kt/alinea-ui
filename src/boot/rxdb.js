import { boot } from "quasar/wrappers";

import rxdb from "@sowell/rxdb";
import schema from "schema/schema"; // import your schema file
import { todoPullQueryBuilder } from "./todoQueryBuilder "; // import your pullQueryBuilder file
import subscriptionTodoQuery from "./subTodoQuery"; // import your subscriptionTodoQuery file

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  const { initRxdb } = rxdb();
  //init queryBuilders
  let queries = [];
  queries["todos"] = [
    { pull: todoPullQueryBuilder },
    { push: todoPushQueryBuilder },
    { sub: subscriptionTodoQuery },
  ];
  initRxdb(queries, schema);
});
