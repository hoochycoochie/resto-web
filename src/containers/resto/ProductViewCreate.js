import React, { useState } from "react";

import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";

import Layout from "../layout/layoutadmin";
import ProductCreate from "../../components/product/ProductCreate";
import { createProductMutation } from "../../graphql/mutation/product";
import createProductSchema from "../../components/product/createProductSchema";

function ProductViewCreate(props) {
  const [openOptionModale, setOpenOptionModale] = useState(false);
  return (
    <Layout>
      <ProductCreate
        {...props}
        open={async () => {
          await setOpenOptionModale(true);
        }}
        cancel={async () => {
          await setOpenOptionModale(false);
        }}
      />
    </Layout>
  );
}

export default compose(
  graphql(createProductMutation, { name: "save" }),
  withFormik({
    validationSchema: createProductSchema,
    mapPropsToValues: () => ({
      name: "",
      description: "",
      category_id: "",
      price: null,
      file: null,
      has_choice_size: false,
      has_choice: false,
      sizes: [],
      choice: []
    })
  })
)(ProductViewCreate);
