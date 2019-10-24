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
const logo =
  "https://cdn1.vectorstock.com/i/1000x1000/13/80/organic-food-restaurant-logo-vector-17131380.jpg";
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
        src={logo}
        style={{ marginTop: "2em" }}
      />
      <Image
        src={logo}
        style={{ marginTop: "2em" }}
      />
      <Image
       src={logo}
        style={{ marginTop: "2em" }}
      />
      <Image
       src={logo}
        style={{ marginTop: "2em" }}
      />
      <Image
       src={logo}
        style={{ marginTop: "2em" }}
      />
      <Image
       src={logo}
        style={{ marginTop: "2em" }}
      />
      <Image
       src={logo}
        style={{ marginTop: "2em" }}
      />
    </Container>
  </Layout>
);

export default Home;
