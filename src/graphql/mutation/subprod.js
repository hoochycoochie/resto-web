import gql from "graphql-tag";

export const createSubprodMutation = gql`
  mutation createSubprod(
    $name: String
    $company_id: String
    $subcat_id: String
    $price: Int,
    $file:Upload
  ) {
    createSubprod(
      name: $name
      company_id: $company_id
      subcat_id: $subcat_id
      price: $price
      file:$file
    ) {
      ok
      subprod {
        id
        name
        company_id
        price
        subcat_id
        picture
        author {
          id
          name
          lastname
          picture
        }

        created_at
        updated_at
      }
      errors {
        path
        message
      }
    }
  }
`;
