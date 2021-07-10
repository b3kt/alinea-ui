import { apolloClientInstance } from "boot/apollo";
import { secureStorage, getContextHeaders } from "boot/app";
import gql from "graphql-tag";

const session = secureStorage.getItem("session");

export function fetchMenus(context) {
  return apolloClientInstance
    .query({
      query: gql`
        query fetchUserMenu {
          menus: role_menus(
            where: { menu: { parent_id: { _is_null: true } } }
            order_by: { menu: { sequence: asc } }
          ) {
            menu {
              icon
              label
              target_url
              js_event
              children {
                icon
                label
                target_url
                js_event
              }
            }
          }
        }
      `,
      context: getContextHeaders(),
    })
    .then((response) => {
      if (response.data.menus !== undefined && response.data.menus !== null) {
        context.commit("setMenus", response.data.menus);
        console.log(response.data.menus);
      }
    });
}

export function switchView(context, param) {
  return apolloClientInstance.mutate({
    mutation: gql`
      mutation switchMode($role: String!, $uuid: String!) {
        update_user_attribute(
          _set: { value: $role }
          where: { user_id: { _eq: $uuid } }
        ) {
          affected_rows
        }
      }
    `,
    context: getContextHeaders(),
    variables: param,
    update: (store, { data: { update_user_attribute } }) => {
      if (update_user_attribute.affected_rows) {
        console.log("updated");
      }
    },
  });
}
