import React from "react";
import { Dropdown } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { categoriesQuery } from "../../graphql/query/category";

const CategoryListInput = ({
  cats: { loading, categories },
  setFieldValue,
  error
}) => {
  return (
    <Dropdown
    style={{width:300}}
      loading={loading}
      fluid
      search
      selection
      error={error}
      name="category_id"
      onChange={async (_, { name, value }) => {
       // console.log("value cat id", value);
        await setFieldValue("category_id", value);
      }}
      options={
        categories && categories.length
          ? categories.map(cat => ({
              key: cat.id,
              value: cat.id,
              text: cat.name
            }))
          : []
      }
    />
  );
};

export default graphql(categoriesQuery, {
  name: "cats",
  options: { fetchPolicy: "cache-first" }
})(CategoryListInput);
