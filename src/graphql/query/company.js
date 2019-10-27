import gql from "graphql-tag";

export const oneCompanyQuery = gql`
  query oneCompany($company_id: String) {
    oneCompany(company_id: $company_id) {
      id
      name
      description
      reference
      picture
      created_at
      updated_at
    }
  }
`;
