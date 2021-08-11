import gql from "graphql-tag";

export function fetchMenusQuery(vars, contextHeaders) {
  return {
    query: gql`
      query fetchUserMenu($role: String!, $childrole: String!) {
        menus: role_menus(
          where: {
            menu: { _or: { parent_id: { _is_null: true } } }
            user: { role: { _eq: $role } }
          }
          order_by: { menu: { sequence: asc } }
        ) {
          menu {
            icon
            label
            target_url
            js_event
            children(
              where: { role_menus: { role: { code: { _eq: $childrole } } } }
            ) {
              icon
              label
              target_url
              js_event
            }
          }
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}
