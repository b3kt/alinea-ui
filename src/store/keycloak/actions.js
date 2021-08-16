import { apolloClientInstance } from "boot/apollo";
import { secureStorage, getContextHeaders } from "boot/app";
import gql from "graphql-tag";

const session = secureStorage.getItem("session");

export function assignRole(context, rolecode) {
  if (session !== undefined && session !== null) {
    const userUID = session.decodedToken.sub;
    const contextHeaders = getContextHeaders();

    if (
      rolecode !== null &&
      contextHeaders !== undefined &&
      contextHeaders !== null
    ) {
      const existingRoles = apolloClientInstance.query({
        query: gql`
          query fetchRoles($role: String!) {
            user_roles(where: { role: { _eq: $role } }) {
              role
            }
          }
        `,
        variables: {
          role: rolecode,
        },
        context: contextHeaders,
      });

      existingRoles.then((response) => {
        if (
          response.data.user_roles !== undefined &&
          response.data.user_roles !== null
        ) {
          apolloClientInstance.mutate({
            mutation: gql`
              mutation assignRole($uid: uuid!, $role: String!) {
                insert_user_roles_one(object: { role: $role, user_uid: $uid }) {
                  role
                }
              }
            `,
            variables: {
              uid: userUID,
              role: rolecode,
            },
            context: contextHeaders,
            update: (store, { data: { insert_user_roles_one } }) => {
              console.log(insert_user_roles_one);
            },
            errorPolicy: "ignore",
          });
        }
      });
    }
  }
}
