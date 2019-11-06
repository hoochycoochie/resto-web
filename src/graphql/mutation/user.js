import gql from "graphql-tag";

export const loginCompanyMutation = gql`
  mutation loginCompany(
    $identifiant: String!
    $reference: String
    $password: String!
  ) {
    loginCompany(
      identifiant: $identifiant
      reference: $reference
      password: $password
    ) {
      ok
      errors {
        path
        message
      }

      user {
        id
        email
        lastname

        name
        phone
        picture
      }
      roles {
        member_id
        role_id
        name
        company_id
      }
      company {
        name
        id
      }
      token
    }
  }
`;

export const signCompanyOwnerMutation = gql`
  mutation signCompanyOwner(
    $phone: String!
    $password: String!
    $name: String!
    $lastname: String!
    $email: String!
  ) {
    signCompanyOwner(
      phone: $phone
      password: $password
      name: $name
      lastname: $lastname
      email: $email
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
