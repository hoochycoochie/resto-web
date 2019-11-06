import React from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import { Grid, Header } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { graphql, compose } from "react-apollo";
import { loginCompanyMutation } from "../graphql/mutation/user";
import { LOGIN_USER_MUTATION } from "../graphql/store/query-mutation/user";

import {
  USER_STORAGE,
  TOKEN_NAME,
  RESTAURANT_ROOT_PATH
} from "../utils/static_constants";
import { Redirect } from "react-router-dom";
import Layout from "./layout";
import Login from "../components/Login";

const LoginView = props => (
  <Layout>
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <FormattedMessage id="login" />
        </Header>

        <Login {...props} />
      </Grid.Column>
    </Grid>
  </Layout>
);

const loginSchema = Yup.object().shape({
  identifiant: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .required(<FormattedMessage id="required" />),
  reference: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .required(<FormattedMessage id="required" />),
  password: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .required(<FormattedMessage id="required" />)
});
export default compose(
  graphql(loginCompanyMutation, { name: "loginUser" }),
  graphql(LOGIN_USER_MUTATION, { name: "setUser" }),

  withFormik({
    validationSchema: loginSchema,
    mapPropsToValues: () => ({ identifiant: "", password: "", reference: "" }),
    handleSubmit: async (
      { identifiant, password, reference },
      { props: { loginUser, setUser }, setSubmitting, setFieldError }
    ) => {
      try {
        const response = await loginUser({
          variables: { identifiant, password, reference }
        });

        const {
          ok,
          token,
          user,
          errors,
          roles,
          company
        } = response.data.loginCompany;

        if (ok) {
          const currentUser = {
            authenticated: true,
            user,
            roles,
            company
          };
          await setUser({
            variables: {
              currentUser
            }
          });

          setSubmitting(false);
          await localStorage.setItem(USER_STORAGE, JSON.stringify(currentUser));
          await localStorage.setItem(TOKEN_NAME, token);
          return <Redirect to={RESTAURANT_ROOT_PATH} />;
        } else {
          errors.forEach(error => {
            const message = <FormattedMessage id={error.message} />;
            setFieldError(error.path, message);
            setSubmitting(false);
          });
        }
      } catch (error) {
        console.log("error login user", error);
      }
    }
  })
)(LoginView);
