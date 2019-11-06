import React from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import { Grid, Header } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { graphql, compose } from "react-apollo";
import { signCompanyOwnerMutation } from "../graphql/mutation/user";

import Layout from "./layout";
import Register from "../components/Register";

const RegisterView = props => (
  <Layout>
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <FormattedMessage id="login" />
        </Header>

        <Register {...props} />
      </Grid.Column>
    </Grid>
  </Layout>
);

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  phone: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  email: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(300, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  lastname: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  password: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />)
});
export default compose(
  graphql(signCompanyOwnerMutation, { name: "registerUser" }),

  withFormik({
    validationSchema: registerSchema,
    mapPropsToValues: () => ({
      email: "",
      password: "",
      phone: "",
      name: "",
      lastname: ""
    }),
    handleSubmit: async (
      { email, phone, password, name, lastname },
      { props: { registerUser }, setSubmitting, setFieldError }
    ) => {
      try {
        const variables = { email, phone, password, name, lastname };
        console.log("variables", variables);
        const response = await registerUser({
          variables
        });

        const { ok, errors } = response.data.signCompanyOwner;

        if (ok) {
          await setSubmitting(false);
        } else {
          errors.forEach(error => {
            const message = <FormattedMessage id={error.message} />;
            setFieldError(error.path, message);
            setSubmitting(false);
          });
        }
      } catch (error) {
        console.log("error registerUser user", error);
      }
    }
  })
)(RegisterView);
