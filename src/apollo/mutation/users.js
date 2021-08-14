import gql from "graphql-tag";

export function updateProfileMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation updateProfile(
        $uid: uuid!
        $name: String!
        $bio: String!
        $email: String!
        $phone: String!
        $website: String!
      ) {
        update_user_profiles(
          _set: {
            name: $name
            bio: $bio
            email: $email
            phone: $phone
            website: $website
          }
          where: { user_uid: { _eq: $uid } }
        ) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}

export function deleteAddressMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation deleteAddress($id: Int!) {
        delete_user_address_by_pk(id: $id) {
          id
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}
