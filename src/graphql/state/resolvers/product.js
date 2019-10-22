import {productsQuery} from '../product';

export const getProducts = async (_obj, params, {cache}) => {
  const query = productsQuery;
  const {products} = await cache.readQuery({query});

  return products;
};

export const removeProduct = async (_obj, params, {cache}) => {
  const {id} = params;
  if (!id) {
    throw new Error('id undefined');
  }
  const query = productsQuery;
  const {products} = await cache.readQuery({query});
  let updatedProducts = products;

  const productIndex = products.findIndex(
    p => p.id.toString() == id.toString(),
  );

  if (productIndex > -1) {
    updatedProducts.splice(productIndex, 1);
  }
  await cache.writeQuery({
    query,
    data: {products: updatedProducts},
  });
  await getProducts({variables: {}});

  return null;
};
export const addProduct = (_obj, {product}, {cache}) => {
  const query = productsQuery;
  const {products} = cache.readQuery({query});
  const updatedProducts = products.concat(product);
  cache.writeQuery({query, data: {products: updatedProducts}});
  return updatedProducts;
};

export const clearProducts = (_obj, _args, {cache}) => {
  cache.writeQuery({query: productsQuery, data: {products: []}});
  return null;
};
