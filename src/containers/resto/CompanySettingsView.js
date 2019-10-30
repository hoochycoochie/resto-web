import React from "react";
// import * as Yup from "yup";
// import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import Layout from "../layout/layoutadmin";
import { Grid, Image, Card, Icon } from "semantic-ui-react";
import { oneCompanyQuery } from "../../graphql/query/company";
import {
  COMPANY_ID_STORAGE,
  NOT_FOUND_PATH
} from "../../utils/static_constants";
import { Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import DisplayDate from "../../components/DisplayDate";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";

function CompanySettingsView(props) {
  console.log("props company", props);
  const {
    company: { loading, oneCompany: company }
  } = props;

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  if (!loading && !company) {
    return <Redirect to={NOT_FOUND_PATH} />;
  }
  return (
    <Layout>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src={company.picture} />
          </Grid.Column>
          <Grid.Column>
            <Card
              style={{ width: "100%", textAlign: "center" }}
              image={company.picture}
              he
              header={
                <p
                  style={{
                    width: "100%",
                    height: 30,
                    backgroundColor: colors.PINK,
                    color: colors.VIOLET,
                    textAlign: "center"
                  }}
                >
                  <Icon
                    name="chess queen"
                    size="large"
                    style={{ color: colors.VIOLET }}
                  />
                  {company.name}
                </p>
              }
              meta="Friend"
              extra={
                <a>
                  <Icon
                    name="chess queen"
                    size="large"
                    style={{ color: colors.PINK }}
                  />
                  {company.name}
                </a>
              }
            />
            <p>
              <span>
                <FormattedMessage id="created_at" />
                {" : "}
              </span>
              <DisplayDate id={company.created_at} />
            </p>
            <p>{company.description}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

export default compose(
  graphql(oneCompanyQuery, {
    name: "company",
    options: () => {
      const company_id = JSON.parse(localStorage.getItem(COMPANY_ID_STORAGE));
      return {
        variables: {
          company_id
        },
        fetchPolicy: "cache"
      };
    }
  })
)(CompanySettingsView);
