import gql from 'graphql-tag';

export const findCommandCompanyQuery = gql`
  query findCommandCompany($company_id: String, $skip: Int, $take: Int) {
    findCommandCompany(company_id: $company_id, skip: $skip, take: $take) {
      total
      skip
      take
      data {
        id
        reference
        price
        company_name
        company_id
        created_at
        updated_at
      }
    }
  }
`;

export const findOneCommandQuery = gql`
  query findOneCommand($id: String) {
    findOneCommand(id: $id) {
      id
      price
      company_name
      company_id
      created_at
      updated_at
      author {
        name
        lastname
      }
      products {
        id
        command_id
        name
        description
        price
        quantity
        picture

        created_at
        updated_at
        subprods {
          id
          name
          product_command_id
          description
          price
          quantity
          picture

          created_at
          updated_at
        }
      }
      subprods {
        id
        command_id
        name
        description
        price
        quantity
        picture

        created_at
        updated_at
      }
    }
  }
`;
