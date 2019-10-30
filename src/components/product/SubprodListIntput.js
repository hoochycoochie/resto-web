import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { graphql } from "react-apollo";

import { subprodsQuery } from "../../graphql/query/subprod";

const SubprodListInput = ({
  prods: { loading, subprods },
  setFieldValue,
  error,
  inputName,
  values
}) => {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

  const handleChange = async (e, { value }) => {
    let val = value;

    const subprods_selected = [];

    if (val && val.length && subprods && subprods.length) {
      val.forEach(el => {
        subprods.filter(prod => {
          if (prod.id.toString() === el) {
            subprods_selected.push({
              subprod_id: prod.id,
              name: prod.name,
              free_choice: false,
              price: prod.price
            });
          }
        });
      });
    }
    setFieldValue(inputName, subprods_selected);
  };
  const options =
    subprods && subprods.length
      ? subprods.map(cat => ({
          key: cat.id,
          value: cat.id,
          text: cat.name
        }))
      : [];
  const selectedValues =
    values && values.length > 0 ? values.map(cat => cat.subprod_id) : [];

  return (
    <div>
      <Dropdown
        error={error}
        loading={loading}
        fluid
        multiple
        search
        selection
        defaultUpward={true}
        value={selectedValues}
        onChange={handleChange}
        name={inputName}
        id={inputName}
        options={options}
      />
    </div>
  );
};

export default graphql(subprodsQuery, {
  name: "prods",
  options: ({ subcat_id }) => ({
    variables: {
      subcat_id
    },
    fetchPolicy: "cache"
  })
})(SubprodListInput);
