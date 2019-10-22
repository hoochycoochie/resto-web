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
import { addUserMutation } from "../graphql/state/user";
import { colors } from "../utils/constants";
import { USER_STORAGE, TOKEN_NAME } from "../utils/static_constants";

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
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        <FormattedMessage id="login" />
      </Header>

      <Form loading={isSubmitting} onSubmit={handleSubmit}>
        <FormField>
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

        <FormField>
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

        <FormField>
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
      <Message>
        New to us? <a href="#">Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
);

const loginSchema = Yup.object().shape({
  identifiant: Yup.string().required(<FormattedMessage id="required" />),
  reference: Yup.string().required(<FormattedMessage id="required" />),
  password: Yup.string().required(<FormattedMessage id="required" />)
});
export default compose(
  graphql(loginCompanyMutation, { name: "loginUser" }),
  graphql(addUserMutation, { name: "setUser" }),
  withFormik({
    validationSchema: loginSchema,
    mapPropsToValues: () => ({ identifiant: "", password: "", reference: "" }),
    handleSubmit: async (
      { identifiant, password, reference },
      { props: { loginUser, history, setUser }, setSubmitting, setFieldError }
    ) => {
      try {
        const response = await loginUser({
          variables: { identifiant, password, reference }
        });
        console.log("response", response);
        const {
          ok,
          token,
          user,
          errors,
          roles,
          company
        } = response.data.loginCompany;

        if (ok) {
          const connectedUser = { ...user, roles, company };
          await setUser({
            variables: {
              user: {
                connectedUser
              }
            }
          });
          setSubmitting(false);
          localStorage.setItem(USER_STORAGE, JSON.stringify(connectedUser));
          localStorage.setItem(TOKEN_NAME, token);
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
