import gql from "graphql-tag";

export function fetchMenusQuery(vars, contextHeaders) {
  return {
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
    variables: vars,
    context: contextHeaders,
  };
}
