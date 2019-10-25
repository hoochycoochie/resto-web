import React from "react";
import { FormattedMessage } from "react-intl";
import { Form, Input, Message, Button } from "semantic-ui-react";
import { colors } from "../utils/constants";

const FormField = Form.Field;

const Login = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  return (
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
  );
};

export default Login;
