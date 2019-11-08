import React, { useState } from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import Layout from "../layout/layoutadmin";
import { compose, graphql } from "react-apollo";

import { COMPANY_ID_STORAGE } from "../../utils/static_constants";
import Loading from "../../components/Loading";
import { Header } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";

import {
  SubprodCreate,
  SubprodList,
  SubprodSearch
} from "../../components/subprod";
import { createSubprodMutation } from "../../graphql/mutation/subprod";
import { findSubprodQuery } from "../../graphql/query/subprod";
import ApolloCacheUpdater from "apollo-cache-updater";
function SubprodViewList({
  subprods: { loading, fetchMore, ...rest },
  subcat,
  handleSubmit: handleSubmit2,
  ...secondRest
}) {
  const [activePage, setActivePage] = useState(1);
  const [name, setName] = useState("");
  const [createModal, setCreateModal] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const load = async variables => {
    const company_id = await JSON.parse(
      localStorage.getItem(COMPANY_ID_STORAGE)
    );

    await fetchMore({
      variables: {
        ...variables,
        subcat_id: subcat.id,
        company_id
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const { findSubprod } = fetchMoreResult;
        return Object.assign({}, prev, {
          findSubprod
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
  const handleSubmit = async () => {
    try {
      const {
        values: { name, price, file },
        setSubmitting,
        setFieldError,
        handleReset,
        save
      } = secondRest;

      const company_id = await JSON.parse(
        localStorage.getItem(COMPANY_ID_STORAGE)
      );

      const response = await save({
        variables: { name, company_id, price, subcat_id: subcat.id, file },
        update: async (
          proxy,
          {
            data: {
              createSubprod: { subprod }
            }
          }
        ) => {
          const mutationResult = subprod; // mutation result to pass into the updater
          const updates = ApolloCacheUpdater({
            proxy, // apollo proxy
            queriesToUpdate: [findSubprodQuery], // queries you want to automatically update
            searchVariables: {},
            mutationResult,
            operation: {
              type: "ADD",
              add: ({ data: { data, total, ...rest } }) => {
                return {
                  ...rest,
                  total: total + 1,
                  data: [{ ...mutationResult }, ...data]
                };
              }
            }
          });
          console.log("updates", updates);
        }
      });

      const { ok, errors } = response.data.createSubprod;

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
    findSubprod: { data, skip, take, total }
  } = rest;

  return (
    <div>
      <div>
        <Header
          size="medium"
          style={{
            color: colors.VIOLET,
            textAlign: "center",
            fontStyle: "italic"
          }}
        >
          {<FormattedMessage id="subproduct_list" />}
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

      <SubprodSearch
        modal={async () => await setCreateModal(true)}
        name={name}
        disabled={!name || name.trim().length === 0}
        onClick={onSearch}
        onChange={onSearchChange}
      />

      <SubprodList
        onPageChange={onPageChange}
        activePage={activePage}
        data={data}
        skip={skip}
        total={total}
        loading={loading}
        take={take}
      />
      <SubprodCreate
        {...secondRest}
        handleSubmit={handleSubmit}
        open={createModal}
        cancel={async () => await setCreateModal(false)}
      />
    </div>
  );
}

const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const createSubprodSchema = Yup.object().shape({
  price: Yup.number().required(<FormattedMessage id="required" />),
  name: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(100, <FormattedMessage id="max_100_characters" />)
    .required(<FormattedMessage id="required" />),

  file: Yup.mixed()
    .required(<FormattedMessage id="required" />)
    .test("fileFormat", <FormattedMessage id="not_supported" />, value => {
      if (value) {
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
      return true;
    })
    .test("fileSize", <FormattedMessage id="file_too_large" />, value => {
      if (value) {
        return value && value.size <= FILE_SIZE;
      }
      return true;
    })
});
export default compose(
  graphql(createSubprodMutation, { name: "save" }),
  graphql(findSubprodQuery, {
    name: "subprods",
    options: ({ subcat }) => {
      return {
        variables: {
          subcat_id: subcat.id,
          company_id: JSON.parse(localStorage.getItem(COMPANY_ID_STORAGE))
        },
        fetchPolicy: "cache"
      };
    }
  }),
  withFormik({
    validationSchema: createSubprodSchema,
    mapPropsToValues: () => ({ name: "", price: "", file: null })
  })
)(SubprodViewList);
