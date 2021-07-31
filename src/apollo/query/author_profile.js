import gql from "graphql-tag";

export function fetchSelfProfileQuery(contextHeaders) {
  return {
    query: gql`
      query fetchSelfProfile {
        user_profiles {
          name
          bio
          address
          email
        }
      }
    `,
    context: contextHeaders,
  };
}

export function saveProfile(vars, contextHeaders) {
  return {
    mutation: gql``,
    variables: vars,
    context: contextHeaders,
  };
}
