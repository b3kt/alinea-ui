import gql from "graphql-tag";

export function fetchUserAddressQuery(contextHeaders) {
  return {
    query: gql`
      query fetchUserAddress {
        user_address {
          id
          address
          city
          state
          country
          postal_code
          is_default
        }
      }
    `,
    context: contextHeaders,
  };
}

export function fetchUserBankQuery(contextHeaders) {
  return {
    query: gql`
      query fetchUserBank {
        user_banks {
          bank_account_name
          bank_account_no
          bank_name
          bank_branch
          is_default
        }
      }
    `,
    context: contextHeaders,
  };
}

export function fetchUserLibraryQuery(contextHeaders) {
  return {
    query: gql`
      query fetchUserLibrary {
        user_libraries {
          name
          description
          is_private
          library_uid
        }
      }
    `,
    context: contextHeaders,
  };
}
