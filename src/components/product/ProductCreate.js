import React from "react";
import {
  Button,
  Grid,
  Form,
  Input,
  Image,
  TextArea,
  Checkbox
} from "semantic-ui-react";
import { colors } from "../../utils/constants";
import FieldError from "../FieldError";
import { FormattedMessage } from "react-intl";
import { FieldArray, Field } from "formik";
import SizeInput from "./SizeInput";
const FormField = Form.Field;

const ProductCreate = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  isSubmitting
}) => {
  console.log("errors", errors);

  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Form loading={isSubmitting} onSubmit={handleSubmit}>
            <FormField required>
              <label>
                <FormattedMessage id="name" />
              </label>

              <Input
                // icon="setting"
                value={values.name}
                name="name"
                
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />

              {touched.name && errors.name && (
                <FieldError message={errors.name} />
              )}
            </FormField>

            <FormField>
              <Checkbox
                name="has_choice_size"
                id="has_choice_size"
                toggle
                onChange={handleChange}
                checked={values.has_choice_size}
                label={
                  <label>
                    <FormattedMessage id="has_choice_size" />
                  </label>
                }
              />
              )
              {/* {touched.sizes && errors.sizes && (
                <FieldError message={errors.sizes} />
              )}
              {errors.sizes && typeof errors.sizes === "string" && (
                <FieldError message={errors.sizes} />
              )} */}
            </FormField>

            {values.has_choice_size && (
              <SizeInput
                values={values}
                errors={errors}
                handleChange={handleChange}
                touched={touched}
              />
            )}

            <FormField required>
              <label>
                <FormattedMessage id="description" />
              </label>

              <TextArea
                icon="setting"
                value={values.description}
                name="description"
                fluid={true}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.description && errors.description && (
                <FieldError message={errors.description} />
              )}
            </FormField>

            <FormField>
              <label>
                <FormattedMessage id="picture" />
              </label>

              <Input
                type="file"
                name="file"
                //  onChange={handleChange}
                onChange={async ({
                  target: {
                    validity,
                    files: [file]
                  }
                }) => {
                  await setFieldValue("file", file);
                  //  await handleSubmit();
                }}
                fluid
                onBlur={handleBlur}
              />

              {touched.file && errors.file && (
                <FieldError message={errors.file} />
              )}
            </FormField>
            {values.file && (
              <FormField>
                <img
                  src={URL.createObjectURL(values.file)}
                  alt="toto"
                  width="100"
                  height="100"
                />
              </FormField>
            )}
            <Button
              type="submit"
              style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
            >
              <FormattedMessage id="create" />
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          {values.file && <Image src={URL.createObjectURL(values.file)} />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProductCreate;
