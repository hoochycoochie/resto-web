import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { subcatsQuery } from "../../graphql/query/subcat";
import { COMPANY_ID_STORAGE } from "../../utils/static_constants";

const SubcatListInput = ({
  cats: { loading, subcats },
  setFieldValue,
  error,
  inputName
}) => {
  const [currentName, setName] = useState("");
  const options =
    subcats && subcats.length
      ? subcats.map(cat => ({
          key: cat.id,
          value: cat.id,
          text: cat.name
        }))
      : [];
  const currentValue =
    options.length > 0
      ? options.find(c => c.key.toString() === currentName.toString())
      : null;
  return (
    <div>
      <Dropdown
        error={error}
        loading={loading}
        fluid
        search
        selection
        value={currentValue}
        name={inputName}
        id={inputName}
        onChange={async (_, { name, value }) => {
          await setName(name);
          await setFieldValue(inputName, value);
        }}
        options={options}
      />
    </div>
  );
};

export default graphql(subcatsQuery, {
  name: "cats",
  options: () => ({
    variables: {
      company_id: JSON.parse(localStorage.getItem(COMPANY_ID_STORAGE))
    },
    fetchPolicy: "cache"
  })
})(SubcatListInput);
