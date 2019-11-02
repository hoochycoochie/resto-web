import React, { useState } from "react";
import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import Layout from "../layout/layoutadmin";
import ProductCreate from "../../components/product/ProductCreate";
import { createProductMutation } from "../../graphql/mutation/product";
import createProductSchema from "../../components/product/createProductSchema";
import { COMPANY_ID_STORAGE } from "../../utils/static_constants";
import { FormattedMessage } from "react-intl";

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
      name: "",
      description: "",
      category_id: "",
      price: "",
      file: "",
      has_choice_size: false,
      has_choice: false,
      sizes: [],
      choices: []
    }),
    handleSubmit: async (
      {
        name,
        description,
        price,
        file,
        has_choice,
        has_choice_size,
        choices,
        sizes,
        category_id
      },
      { props: { save, history }, setSubmitting, setFieldError }
    ) => {
      try {
        const company_id = await JSON.parse(
          localStorage.getItem(COMPANY_ID_STORAGE)
        );
        console.log("category_id", category_id);
        let variables = {
          product: {
            name,
            description,
            has_choice,
            has_choice_size,
            category_id
          },
          company_id
        };
        if (file) {
          variables.product.file = file;
        }
        if (!has_choice_size) {
          variables.product.price = price;
        } else {
          variables.product.sizes = sizes;
        }
        if (has_choice) {
          variables.product.choices = choices;
        }

        console.log("variables.category_id", variables.category_id);

        const response = await save({ variables });

        const { ok, errors } = response.data.createProduct;
        if (ok) {
          await setSubmitting(false);
          // await handleReset();
          // await setCreateModal(false);
        } else {
          errors.forEach(error => {
            const message = <FormattedMessage id={error.message} />;
            setFieldError(error.path, message);
            setSubmitting(false);
          });
        }
      } catch (error) {
        console.log("error saving product", error);
      }
    }
  })
)(ProductViewCreate);
