import React from "react";
import { Button, Modal, Form, Input, Message } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
const FormField = Form.Field;

const SubcatCreate = ({
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
  >
    <Modal.Header>
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
              icon="at"
              value={values.name}
              name="name"
              fluid
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.name && errors.name && (
              <Message color="red">{errors.name}</Message>
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

export default SubcatCreate;
