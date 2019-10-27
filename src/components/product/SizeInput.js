import React from "react";
import { FieldArray } from "formik";
import { Form, Button, Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import FieldError from "../FieldError";
import { colors } from "../../utils/constants";

const SizeInput = ({ values, handleChange, errors, touched }) => {
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
                onClick={() => arrayHelpers.push({ name: "", price: null })}
                content={<FormattedMessage id="add_sizes_type" />}
              />
            </div>
            <br />
            {values.sizes && values.sizes.length > 0 ? (
              values.sizes.map((size, index) => (
                <Form.Group
                  widths="equal"
                  key={index}
                  style={{ marginTop: 20 }}
                >
                  <Form.Input
                    label={<FormattedMessage id="name" />}
                    name={`sizes.${index}.name`}
                    value={size.name}
                    onChange={handleChange}
                    error={
                      errors.sizes &&
                      errors.sizes[index] &&
                      errors.sizes[index].name ? (
                        <FieldError message={errors.sizes[index].name} />
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
                      errors.sizes &&
                      errors.sizes[index] &&
                      errors.sizes[index].price ? (
                        <FieldError message={errors.sizes[index].price} />
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
              <FieldError message={<FormattedMessage id="sizes_required" />} />
            )}
          </div>
        );
      }}
    />
  );
};

export default SizeInput;
