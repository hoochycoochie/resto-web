import gql from "graphql-tag";

export const searchProductsQuery = gql`
  query getSearchProducts {
    searchProducts @client
  }
`;

export const searchCompaniesQuery = gql`
  query getSearchCompanies {
    searchCompanies @client
  }
`;
export const searchNameQuery = gql`
  query getSearchName {
    searchName @client
  }
`;

export const addSearchProductsMutation = gql`
  mutation addSearchProducts($products: [ProductInput]) {
    addSearchProducts(products: $products) @client
  }
`;
export const addSearchNameMutation = gql`
  mutation addSearchName($name: String) {
    addSearchName(name: $name) @client
  }
`;

export const addSearchCompaniesMutation = gql`
  mutation addSearchCompanies($companies: [CompanyInput]) {
    addSearchCompanies(companies: $companies) @client
  }
`;
export const clearSearchMutation = gql`
  mutation clearSearch {
    clearSearch @client
  }
`;
// export const removeProductMutation = gql`
//   mutation removeProduct($id: Int) {
//     removeProduct(id: $id) @client
//   }
// `;
