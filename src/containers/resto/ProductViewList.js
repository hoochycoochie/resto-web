import React, { useState } from "react";
import Layout from "../layout/layoutadmin";
import { compose, graphql } from "react-apollo";
import {
  COMPANY_ID_STORAGE,
  RESTAURANT_CREATE_PRODUCT_PATH
} from "../../utils/static_constants";
import Loading from "../../components/Loading";
import { Header } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
import { findProdQuery } from "../../graphql/query/product";
import ProductSearch from "../../components/product/ProductSearch";
import ProductList from "../../components/product/ProductList";

function ProductViewList({ prods: { loading, fetchMore, findProd }, history }) {
  const [activePage, setActivePage] = useState(1);
  const [name, setName] = useState("");

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  const load = async variables => {
    const company_id = await JSON.parse(
      localStorage.getItem(COMPANY_ID_STORAGE)
    );
    console.log("variables", variables);
    await fetchMore({
      variables: {
        ...variables,
        company_id
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const { findProd } = fetchMoreResult;
        return Object.assign({}, prev, {
          findProd
        });
      }
    });
  };
  const onPageChange = async ({ activePage, skip, take }) => {
    try {
      await setActivePage(activePage);

      const variables = {
        skip,
        take
      };
      if (name && name.trim().length > 0) {
        variables.name = name;
      }
      await load(variables);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSearch = async e => {
    e.preventDefault();
    await load({ name });
  };
  const onSearchChange = async e => {
    const search = e.target.value;

    await setName(search);
    if (search.trim().length === 0) {
      await load({});
    }
  };

  const { data, skip, take, total } = findProd;

  return (
    <Layout>
      <div>
        <Header
          size="medium"
          style={{
            color: colors.VIOLET,
            textAlign: "center",
            fontStyle: "italic"
          }}
        >
          {<FormattedMessage id="product_list" />}
        </Header>
        <Header
          floated="left"
          size="medium"
          style={{
            color: colors.VIOLET,
            textAlign: "center",
            fontStyle: "italic"
          }}
        ></Header>
      </div>

      <ProductSearch
        modal={async () => {
          await history.push(RESTAURANT_CREATE_PRODUCT_PATH);
        }}
        name={name}
        disabled={!name || name.trim().length === 0}
        onClick={onSearch}
        onChange={onSearchChange}
      />

      <ProductList
        onPageChange={onPageChange}
        activePage={activePage}
        data={data}
        skip={skip}
        total={total}
        loading={loading}
        take={take}
      />
    </Layout>
  );
}

export default compose(
  graphql(findProdQuery, {
    name: "prods",
    options: () => ({
      variables: {
        company_id: JSON.parse(localStorage.getItem(COMPANY_ID_STORAGE))
      },
      fetchPolicy: "cache"
    })
  })
)(ProductViewList);
