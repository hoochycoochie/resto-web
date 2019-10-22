import gql from "graphql-tag";

export const productsQuery = gql`
  query getProducts {
    products @client
  }
`;

export const addProductMutation = gql`
  mutation addProduct($product: ProductInput) {
    addProduct(product: $product) @client
  }
`;

export const removeProductMutation = gql`
  mutation removeProduct($id: Int) {
    removeProduct(id: $id) @client
  }
`;
export const clearProductsMutation = gql`
  mutation clearProducts {
    clearProducts @client
  }
`;
