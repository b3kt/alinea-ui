import gql from "graphql-tag";

export function updateProfileMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation updateProfile(
        $uid: uuid!
        $name: String!
        $bio: String!
        $phone: String!
        $website: String!
      ) {
        update_user_profiles(
          _set: {
            name: $name
            bio: $bio
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

export function updateAddressMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation updateAddress(
        $id: Int!
        $address: String!
        $city: String!
        $country: String!
        $postal_code: String!
        $state: String!
      ) {
        update_user_address(
          where: { id: { _eq: $id } }
          _set: {
            address: $address
            city: $city
            country: $country
            postal_code: $postal_code
            state: $state
          }
        ) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}

export function createProfileMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation createProfile(
        $name: String!
        $bio: String!
        $email: String!
        $phone: String!
        $website: String!
      ) {
        insert_user_profiles(
          objects: {
            name: $name
            bio: $bio
            email: $email
            phone: $phone
            website: $website
          }
        ) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}

export function createAddressMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation createAddress(
        $address: String!
        $city: String!
        $country: String!
        $postal_code: String!
        $state: String!
      ) {
        insert_user_address(
          objects: {
            address: $address
            city: $city
            country: $country
            postal_code: $postal_code
            state: $state
          }
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

export function enableUserMutation(contextHeaders) {
  return {
    mutation: gql`
      mutation enableUserRole {
        insert_user_roles(objects: { role: "user" }) {
          affected_rows
        }
      }
    `,
    context: contextHeaders,
  };
}


export function enableAuthorMutation(contextHeaders) {
  return {
    mutation: gql`
      mutation enableUserRole {
        insert_user_roles(objects: { role: "author" }) {
          affected_rows
        }
      }
    `,
    context: contextHeaders,
  };
}
