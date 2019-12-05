import React, { useState } from "react";
import Layout from "../layout/layoutadmin";
import { compose, graphql } from "react-apollo";
import { COMPANY_ID_STORAGE } from "../../utils/static_constants";
import Loading from "../../components/Loading";
import { Header } from "semantic-ui-react";
import { colors } from "../../utils/constants";

import { findCommandCompanyQuery } from "../../graphql/query/command";
import CommandList from "../../components/command/CommandList";

function CommandViewList({
  prods: { loading, fetchMore, findCommandCompany },
  history
}) {
  const [activePage, setActivePage] = useState(1);

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

    await fetchMore({
      variables: {
        ...variables,
        company_id
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const { findCommandCompany } = fetchMoreResult;
        return Object.assign({}, prev, {
          findCommandCompany
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

      await load(variables);
    } catch (error) {
      console.log("error", error);
    }
  };

  const { data, skip, take, total } = findCommandCompany;

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
          Liste des commandes
        </Header>
      </div>

      <CommandList
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
  // graphql(findCommandCompanyQuery, {
  //   name: "prods",
  //   options: () => ({
  //     variables: {
  //       company_id: JSON.parse(localStorage.getItem(COMPANY_ID_STORAGE))
  //     },
  //     fetchPolicy: "cache"
  //   })
  // }),

  graphql(findCommandCompanyQuery, {
    name: "prods",

    options: () => ({
      variables: {
        company_id: JSON.parse(localStorage.getItem(COMPANY_ID_STORAGE)),
        skip: 0,
        take: 10
      },
      fetchPolicy: "cache-and-network"
    })
  })
)(CommandViewList);
