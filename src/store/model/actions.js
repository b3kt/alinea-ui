import { apolloClientInstance } from "boot/apollo";
import { secureStorage, getContextHeaders } from "boot/app";
import gql from "graphql-tag";

const session = secureStorage.getItem("session");

export function fetchMenus(context) {
  const current_role = secureStorage.getItem("current_role");
  const contextHeaders = getContextHeaders();
  if (contextHeaders !== undefined && contextHeaders !== null) {
    return apolloClientInstance
      .query({
        query: gql`
          query fetchUserMenu($role: String!) {
            menus: role_menus(
              where: {
                menu: { parent_id: { _is_null: true } }
                user: { role: { _eq: $role } }
              }
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
        variables:{
          role: current_role
        },
        context: contextHeaders,
      })
      .then((response) => {
        if (response.data.menus !== undefined && response.data.menus !== null) {
          context.commit("setMenus", response.data.menus);
        }
      });
  }
}

export function switchView(context, param) {
  return new Promise((resolve, reject) => {
    if (param !== undefined && param !== null) {
      console.log("switched to " + param.role);
      secureStorage.setItem("current_role", param.role);
      resolve(param.role);
    } else {
      reject("param is empty");
    }
  });
}
