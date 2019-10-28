import React, { useState } from "react";
import { FieldArray } from "formik";
import { Form, Button, Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import FieldError from "../FieldError";
import { colors } from "../../utils/constants";

function ChoiceInput({ values, handleChange, errors, open, cancel }) {
  return (
    <FieldArray
      name="sizes"
      render={arrayHelpers => {
        console.log("values.sizes", values.sizes);
        return (
          <div style={{ textAlign: "center" }}>
            <div>
              <Button
                floated="left"
                icon="plus"
                style={{ color: colors.VIOLET, marginBottom: 20 }}
                onClick={async () => {}}
                content={<FormattedMessage id="add_options" />}
              />
            </div>

            <br />
            {values && values.length > 0 ? (
              values.map((size, index) => (
                <Form.Group
                  widths="equal"
                  key={index}
                  style={{ marginTop: 20 }}
                >
                  <Form.Input
                    label={<FormattedMessage id="name" />}
                    name={`choices.${index}.name`}
                    value={size.name}
                    onChange={handleChange}
                    error={
                      errors && errors[index] && errors[index].name ? (
                        <FieldError message={errors[index].name} />
                      ) : null
                    }
                  />

                  <Icon
                    style={{ fontSize: 20, color: colors.RED, marginTop: 25 }}
                    name="delete"
                    onClick={async () => await arrayHelpers.remove(index)}
                  />
                </Form.Group>
              ))
            ) : (
              <FieldError
                message={<FormattedMessage id="options_required" />}
              />
            )}
          </div>
        );
      }}
    />
  );
}

export default ChoiceInput;
