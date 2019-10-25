import React, { useState } from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import Layout from "../layout/layoutadmin";
import SubcatList from "../../components/subcat/SubcatList";
import { compose, graphql } from "react-apollo";
import { findSubcatQuery } from "../../graphql/query/subcat";
import { COMPANY_ID_STORAGE } from "../../utils/static_constants";
import Loading from "../../components/Loading";
import { Header } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
import SubcatSearch from "../../components/subcat/SubcatSearch";
import SubcatCreate from "../../components/subcat/SubcatCreate";
import { createSubcatMutation } from "../../graphql/mutation/subcat";

function SubcatViewList({
  subcats: { loading, fetchMore, ...rest },
  handleSubmit: handleSubmit2,
  ...secondRest
}) {
  const [activePage, setActivePage] = useState(1);
  const [name, setName] = useState("");
  const [createModal, setCreateModal] = useState(false);

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

        const { findSubcat } = fetchMoreResult;
        return Object.assign({}, prev, {
          findSubcat
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
    if (search.trim().length == 0) {
      await load({});
    }
  };
  const handleSubmit = async () => {
    try {
      console.log("secondRest", secondRest);
      const {
        values: { name },
        setSubmitting,
        setFieldError,
        handleReset,
        save
      } = secondRest;

      const company_id = await JSON.parse(
        localStorage.getItem(COMPANY_ID_STORAGE)
      );
      const response = await save({
        variables: { name, company_id },
        update: (
          proxy,
          {
            data: {
              createSubcat: { subcat }
            }
          }
        ) => {
          let data = proxy.readQuery({ query: findSubcatQuery });
          console.log("data", data);
          data.unshift(subcat);
          proxy.writeQuery({ query: findSubcatQuery, data });
        }
      });

      const { ok, errors } = response.data.createSubcat;

      if (ok) {
        await setSubmitting(false);
        await handleReset();
        await setCreateModal(false);
      } else {
        errors.forEach(error => {
          const message = <FormattedMessage id={error.message} />;
          setFieldError(error.path, message);
          setSubmitting(false);
        });
      }
    } catch (error) {
      console.log("error login user", error);
    }
  };
  const {
    findSubcat: { data, skip, take, total }
  } = rest;

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
          {<FormattedMessage id="subcat_list" />}
        </Header>
        <Header
          floated="left"
          size="medium"
          style={{
            color: colors.VIOLET,
            textAlign: "center",
            fontStyle: "italic"
          }}
        >
          total : {total}
        </Header>
      </div>

      <SubcatSearch
        modal={async () => await setCreateModal(true)}
        name={name}
        disabled={!name || name.trim().length == 0}
        onClick={onSearch}
        onChange={onSearchChange}
      />

      <SubcatList
        onPageChange={onPageChange}
        activePage={activePage}
        data={data}
        skip={skip}
        total={total}
        loading={loading}
        take={take}
      />
      <SubcatCreate
        {...secondRest}
        handleSubmit={handleSubmit}
        open={createModal}
        cancel={async () => await setCreateModal(false)}
      />
    </Layout>
  );
}
const createSubcatSchema = Yup.object().shape({
  name: Yup.string().required(<FormattedMessage id="required" />)
});

export default compose(
  graphql(createSubcatMutation, { name: "save" }),
  graphql(findSubcatQuery, {
    name: "subcats",

    options: () => ({
      variables: {
        company_id: JSON.parse(localStorage.getItem(COMPANY_ID_STORAGE))
      },
      fetchPolicy: "cache-and-network"
    })
  }),
  withFormik({
    validationSchema: createSubcatSchema,
    mapPropsToValues: () => ({ name: "" })

    // handleSubmit: async (
    //   { name },
    //   { props: { save }, setSubmitting, setFieldError }
    // ) => {
    //   try {
    //     const company_id = await JSON.parse(
    //       localStorage.getItem(COMPANY_ID_STORAGE)
    //     );
    //     const response = await save({
    //       variables: { name, company_id },
    //       update: (
    //         proxy,
    //         {
    //           data: {
    //             createSubcat: { subcat }
    //           }
    //         }
    //       ) => {
    //         let data = proxy.readQuery({ query: findSubcatQuery });
    //         data.unshift(subcat);
    //         proxy.writeQuery({ query: findSubcatQuery, data });
    //       }
    //     });

    //     const { ok, errors } = response.data.createSubcat;

    //     if (ok) {
    //       setSubmitting(false);
    //       await SubcatViewList.setCreateModal(false);
    //     } else {
    //       errors.forEach(error => {
    //         const message = <FormattedMessage id={error.message} />;
    //         setFieldError(error.path, message);
    //         setSubmitting(false);
    //       });
    //     }
    //   } catch (error) {
    //     console.log("error login user", error);
    //   }
    // }
  })
)(SubcatViewList);
