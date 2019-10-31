import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { colors } from "../../utils/constants";

const options = [
  { key: "m", text: "Gratuit", value: true },
  { key: "f", text: "Payant", value: false }
];
const SubprodForm = ({
  subprod,
  index,
  setFieldValue,
  arrayHelpers,
  inputName
}) => {
  return (
    <div>
      <Form.Group widths="2">
        <Form.Input
          value={subprod.name}
          readOnly
          style={{ textAlign: "center", color: "green" }}
        />
        <Form.Input value={subprod.price} readOnly />
        <Form.Select
          id={inputName}
          name={inputName}
          basic
          options={options}
          defaultValue={
            subprod.free_choice ? options[0].value : options[1].value
          }
          onChange={async (_, { name, value }) => {
            await setFieldValue(inputName, value);
          }}
        />
        <Icon
          style={{ fontSize: 20, color: colors.RED, marginTop: 10 }}
          name="delete"
          onClick={async () => await arrayHelpers.remove(index)}
        />
      </Form.Group>
    </div>
  );
};

export default SubprodForm;
