import React from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Input
} from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { graphql, compose } from "react-apollo";
import { loginCompanyMutation } from "../graphql/mutation/user";
import {
  LOGIN_USER_MUTATION,
  GET_CURRENT_USER_QUERY
} from "../graphql/store/query-mutation/user";
import { colors } from "../utils/constants";
import {
  USER_STORAGE,
  TOKEN_NAME,
  RESTAURANT_ROOT_PATH
} from "../utils/static_constants";
import { Redirect } from "react-router-dom";
import Layout from "./layout";

const FormField = Form.Field;

const Login = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Layout>
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <FormattedMessage id="login" />
        </Header>

        <Form loading={isSubmitting} onSubmit={handleSubmit}>
          <FormField required>
            <label>
              <FormattedMessage id="identifiant" />
            </label>

            <Input
              icon="at"
              value={values.identifiant}
              name="identifiant"
              fluid
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.identifiant && errors.identifiant && (
              <Message color="red">{errors.identifiant}</Message>
            )}
          </FormField>

          <FormField required>
            <label>
              <FormattedMessage id="reference" />
            </label>

            <Input
              icon="key"
              value={values.reference}
              name="reference"
              fluid
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.reference && errors.reference && (
              <Message color="red">{errors.reference}</Message>
            )}
          </FormField>

          <FormField required>
            <label>
              <FormattedMessage id="password" />
            </label>

            <Input
              icon="lock"
              type="password"
              value={values.password}
              name="password"
              fluid
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <Message color="red">{errors.password}</Message>
            )}
          </FormField>
          <Button
            type="submit"
            style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
          >
            <FormattedMessage id="login" />
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  </Layout>
);

const loginSchema = Yup.object().shape({
  identifiant: Yup.string().required(<FormattedMessage id="required" />),
  reference: Yup.string().required(<FormattedMessage id="required" />),
  password: Yup.string().required(<FormattedMessage id="required" />)
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
)(Login);
