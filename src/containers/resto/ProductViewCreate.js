import React from "react";

import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";

import Layout from "../layout/layoutadmin";
import ProductCreate from "../../components/product/ProductCreate";
import { createProductMutation } from "../../graphql/mutation/product";
import createProductSchema from "../../components/product/createProductSchema";

function ProductViewCreate(props) {
  return (
    <Layout>
      <ProductCreate {...props} />
    </Layout>
  );
}

export default compose(
  graphql(createProductMutation, { name: "save" }),
  withFormik({
    validationSchema: createProductSchema,
    mapPropsToValues: () => ({
      meal_type: null,
      name: "",
      description: "",
      price: null,
      file: null,
      has_choice_size: false,
      sizes: []
    })
  })
)(ProductViewCreate);
