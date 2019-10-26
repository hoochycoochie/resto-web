import React from "react";
import Layout from "../layout/layoutadmin";
import { Grid, Image } from "semantic-ui-react";
const CompanySettingsView = props => {
  return (
    <Layout>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src="/images/wireframe/paragraph.png" />
          </Grid.Column>
          <Grid.Column>
            <Image src="/images/wireframe/paragraph.png" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default CompanySettingsView;
