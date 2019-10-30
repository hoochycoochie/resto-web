import React from "react";
import { FieldArray } from "formik";
import { Form, Button, Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import FieldError from "../FieldError";
import { colors } from "../../utils/constants";

const SizeInput = ({ values, handleChange, errors }) => {
  return (
    <FieldArray
      name="sizes"
      render={arrayHelpers => {
        return (
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 50 }}>
              <Button
                floated="left"
                icon="plus"
                style={{
                  backgroundColor: colors.PINK,
                  color: colors.VIOLET,
                  marginBottom: 50
                }}
                onClick={() =>
                  arrayHelpers.push({ name: "", price: undefined })
                }
                content={<FormattedMessage id="add_sizes_type" />}
              />
            </div>
            <br />
            <br />

            {values.length > 0 ? (
              values.map((size, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center"
                  }}
                >
                  <div size="tiny" style={{ padding: 10 }}>
                    <Form.Group
                      widths="equal"
                      key={index}
                      style={{ marginTop: 40 }}
                    >
                      <Form.Input
                        label={<FormattedMessage id="name" />}
                        name={`sizes.${index}.name`}
                        value={size.name}
                        onChange={handleChange}
                        error={
                          errors && errors[index] && errors[index].name ? (
                            <FieldError message={errors[index].name} />
                          ) : null
                        }
                      />

                      <Form.Input
                        label={<FormattedMessage id="price" />}
                        type="number"
                        name={`sizes.${index}.price`}
                        value={size.price}
                        onChange={handleChange}
                        error={
                          errors && errors[index] && errors[index].price ? (
                            <FieldError message={errors[index].price} />
                          ) : null
                        }
                      />

                      <Icon
                        style={{
                          fontSize: 20,
                          color: colors.RED,
                          marginTop: 25
                        }}
                        name="delete"
                        onClick={async () => await arrayHelpers.remove(index)}
                      />
                    </Form.Group>
                  </div>
                </div>
              ))
            ) : (
              <FieldError message={<FormattedMessage id="sizes_required" />} />
            )}
          </div>
        );
      }}
    />
  );
};

export default SizeInput;
