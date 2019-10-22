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
      roles{
          member_id
          role_id
          name
          company_id
      }
      company{
        name
        id
      }
      token
    }
  }
`;
