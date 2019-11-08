import React from "react";
import { Dropdown } from "semantic-ui-react";

const RoleListInput = ({ setFieldValue, error, inputName }) => {
  const handleChange = async (e, { value }) => {
    let val = value;

    await setFieldValue(inputName, val);
  };
  const options = [
    { key: "admin", value: "admin", text: "ADMIN" },
    { key: "manager", value: "manager", text: "MANAGER" }
  ];

  return (
    <div>
      <Dropdown
        error={error}
        fluid
        multiple
        search
        selection
        defaultUpward={true}
        onChange={handleChange}
        name={inputName}
        id={inputName}
        options={options}
      />
    </div>
  );
};

export default RoleListInput;
