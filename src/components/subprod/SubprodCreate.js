import React from "react";
import { Button, Modal, Form, Input } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
import FieldError from "../FieldError";
const FormField = Form.Field;

const SubprodCreate = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  open,
  cancel
}) => (
  <Modal
    open={open}
    closeOnEscape={open}
    closeOnDimmerClick={open}
    onClose={cancel}
    centered={false}
  >
    <Modal.Header
      style={{ textAlign: "center", fontSize: 14, color: colors.VIOLET }}
    >
      <FormattedMessage id="subcat_creation" />
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Form loading={isSubmitting} onSubmit={handleSubmit}>
          <FormField required>
            <label>
              <FormattedMessage id="name" />
            </label>

            <Input
              icon="setting"
              value={values.name}
              name="name"
              fluid
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.name && errors.name && (
              <FieldError message={errors.name} />
            )}
          </FormField>

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

          <Button
            type="submit"
            style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
          >
            <FormattedMessage id="create" />
          </Button>
        </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default SubprodCreate;
