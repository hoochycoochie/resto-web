import React from "react";
import { FormattedMessage } from "react-intl";
import { Form, Input, Button } from "semantic-ui-react";
import { colors } from "../utils/constants";
import FieldError from "./FieldError";

const FormField = Form.Field;

const Register = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  console.log("values", values);
  return (
    <Form loading={isSubmitting} onSubmit={handleSubmit}>
      <FormField required>
        <label>
          <FormattedMessage id="name" />
        </label>

        <Input
          icon="user"
          value={values.name}
          name="name"
          fluid
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name ? true : false}
        />

        {touched.name && errors.name && <FieldError message={errors.name} />}
      </FormField>

      <FormField required>
        <label>
          <FormattedMessage id="lastname" />
        </label>

        <Input
          icon="user"
          value={values.lastname}
          name="lastname"
          fluid
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastname && errors.lastname ? true : false}
        />

        {touched.lastname && errors.lastname && (
          <FieldError message={errors.lastname} />
        )}
      </FormField>
      <FormField required>
        <label>
          <FormattedMessage id="email" />
        </label>

        <Input
          icon="at"
          value={values.email}
          name="email"
          fluid
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email ? true : false}
        />

        {touched.email && errors.email && <FieldError message={errors.email} />}
      </FormField>

      <FormField required>
        <label>
          <FormattedMessage id="phone" />
        </label>

        <Input
          icon="phone"
          value={values.phone}
          name="phone"
          fluid
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && errors.phone ? true : false}
        />

        {touched.phone && errors.phone && <FieldError message={errors.phone} />}
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
          error={touched.password && errors.password ? true : false}
        />

        {touched.password && errors.password && (
          <FieldError message={errors.password} />
        )}
      </FormField>
      <Button
        type="submit"
        style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
      >
        <FormattedMessage id="register" />
      </Button>
    </Form>
  );
};

export default Register;
