import gql from "graphql-tag";

export const findUsersCompanyQuery = gql`
  query findUsersCompany(
    $name: String
    $skip: Int
    $take: Int
    $company_id: String
  ) {
    findUsersCompany(
      name: $name

      skip: $skip
      take: $take
      company_id: $company_id
    ) {
      total
      skip
      take
      data {
        id
        name
        lastname
        phone
        picture
        email

        created_at
        updated_at
      }
    }
  }
`;
