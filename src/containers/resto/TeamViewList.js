import React, { useState } from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import Layout from "../layout/layoutadmin";
import { compose, graphql } from "react-apollo";
import Loading from "../../components/Loading";
import { Header } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
import ApolloCacheUpdater from "apollo-cache-updater";
import { findUsersCompanyQuery } from "../../graphql/query/user";
import TeamCreate from "../../components/team/TeamCreate";
import TeamList from "../../components/team/TeamList";
import TeamSearch from "../../components/team/TeamSearch";
import { createTeamMemberCompanyMutation } from "../../graphql/mutation/user";
import { COMPANY_ID_STORAGE } from "../../utils/static_constants";

function TeamViewList({
  users: { loading, fetchMore, ...rest },
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
  const isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  const load = async variables => {
    await fetchMore({
      variables: {
        ...variables
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const { findUsersCompany } = fetchMoreResult;
        return Object.assign({}, prev, {
          findUsersCompany
        });
      }
    });
  };
  const onPageChange = async ({ activePage, skip, take }) => {
    try {
      await setActivePage(activePage);
      const company_id = await JSON.parse(
        localStorage.getItem(COMPANY_ID_STORAGE)
      );
      const variables = {
        skip,
        take,
        company_id
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
        values: { email, phone, password, name, lastname, role_ids },
        setSubmitting,
        setFieldError,
        handleReset,
        save
      } = secondRest;
      if (
        !email ||
        !phone ||
        !password ||
        !name ||
        !lastname ||
        role_ids.length == 0
      )
        return;
      await setSubmitting(true);
      const company_id = await JSON.parse(
        localStorage.getItem(COMPANY_ID_STORAGE)
      );
      const variables = {
        email,
        phone,
        password,
        name,
        lastname,
        role_ids,
        company_id
      };

      const response = await save({
        variables,
        update: async (proxy, { data }) => {
          console.log("data", data);
          const mutationResult = data.createTeamMemberCompany.user; // mutation result to pass into the updater
          const updates = ApolloCacheUpdater({
            proxy, // apollo proxy
            queriesToUpdate: [findUsersCompanyQuery], // queries you want to automatically update
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

      const { ok, errors } = response.data.createTeamMemberCompany;

      if (ok) {
        await setSubmitting(false);
        await handleReset();
        await setCreateModal(false);
      } else {
        await setSubmitting(false);
        errors.forEach(async error => {
          const message = <FormattedMessage id={error.message} />;
          await setFieldError(error.path, message);
        });
      }
    } catch (error) {
      await secondRest.setSubmitting(false);
      console.log("error login user", error);
    }
  };

  const {
    findUsersCompany: { data, skip, take, total }
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
          Personnel
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

      <TeamSearch
        modal={async () => await setCreateModal(true)}
        name={name}
        disabled={!name || name.trim().length === 0}
        onClick={onSearch}
        onChange={onSearchChange}
      />

      <TeamList
        onPageChange={onPageChange}
        activePage={activePage}
        data={data}
        skip={skip}
        total={total}
        loading={loading}
        take={take}
      />
      <TeamCreate
        {...secondRest}
        disabled={isEmpty(secondRest.errors) ? false : true}
        handleSubmit={handleSubmit}
        open={createModal}
        cancel={async () => await setCreateModal(false)}
      />
    </Layout>
  );
}
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  phone: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  email: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(300, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  lastname: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  password: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),
  role_ids: Yup.array().required(<FormattedMessage id="required" />)
});
export default compose(
  graphql(createTeamMemberCompanyMutation, { name: "save" }),
  graphql(findUsersCompanyQuery, {
    name: "users",
    options: () => {
      return {
        variables: {
          company_id: JSON.parse(localStorage.getItem(COMPANY_ID_STORAGE))
        },
        fetchPolicy: "cache"
      };
    }
  }),
  withFormik({
    validationSchema: registerSchema,
    mapPropsToValues: () => ({
      email: "",
      password: "",
      phone: "",
      name: "",
      lastname: "",
      role_ids: []
    })
  })
)(TeamViewList);
