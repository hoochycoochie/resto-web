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
import SizeInput from "./SizeInput";
import ChoiceInput from "./ChoiceInput";
import CategoryListInput from "./CategoryListInput";
const FormField = Form.Field;

const ProductCreate = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  setFieldError,
  isSubmitting,
  open,
  openModal,
  cancel
}) => {
  //console.log("values", values);
  const isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

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

            <FormField required>
              <label>
                <FormattedMessage id="category" />
              </label>

              <CategoryListInput
                error={
                  touched &&
                  touched.errors &&
                  touched.errors.category_id &&
                  errors &&
                  errors.category_id
                }
                setFieldValue={setFieldValue}
              />

              {touched.category_id && errors.category_id && (
                <FieldError message={errors.category_id} />
              )}
            </FormField>
            {!values.has_choice_size && (
              <FormField required>
                <label>
                  <FormattedMessage id="price" />
                </label>

                <Input
                  type="number"
                  label={{ basic: true, content: "cfa" }}
                  labelPosition="right"
                  value={values.price}
                  name="price"
                  fluid
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.price && errors.price && (
                  <FieldError message={errors.price} />
                )}
              </FormField>
            )}
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
            </FormField>

            {values.has_choice_size && (
              <SizeInput
                values={values.sizes}
                errors={errors && errors.sizes ? errors.sizes : null}
                handleChange={handleChange}
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
                fluid={1}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.description && errors.description && (
                <FieldError message={errors.description} />
              )}
            </FormField>

            <FormField>
              <Checkbox
                name="has_choice"
                id="has_choice"
                toggle
                onChange={handleChange}
                checked={values.has_choice}
                label={
                  <label>
                    <FormattedMessage id="has_choice" />
                  </label>
                }
              />
            </FormField>

            {values.has_choice && (
              <ChoiceInput
                open={open}
                cancel={cancel}
                values={values.choices}
                errors={errors && errors.choices ? errors.choices : null}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                touched={touched}
                openModal={openModal}
              />
            )}
            <FormField>
              <label>
                <FormattedMessage id="picture" />
              </label>

              <Input
                type="file"
                name="file"
                onChange={async ({
                  target: {
                    validity,
                    files: [file]
                  }
                }) => {
                  await setFieldValue("file", file);
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
              disabled={isEmpty(errors) ? false : true}
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
