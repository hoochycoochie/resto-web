import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ROOT_PATH, LOGIN_PATH } from "../utils/static_constants";
import { FormattedMessage } from "react-intl";
import Layout from "./layout";

const Home = ({ children }) => (
  <Layout>
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for
        single column layouts.
      </p>

      <Image
        src="/images/wireframe/media-paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
    </Container>
  </Layout>
);

export default Home;
