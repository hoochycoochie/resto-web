import React from "react";
import { Container, Header, Image } from "semantic-ui-react";
import Layout from "./layout";
import android from "./android.png";
const Home = ({ children }) => (
  <Layout>
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Senresto</Header>
      <p>
        senresto est une application de senyobante uniquement dédiée aux
        restaurateurs inscrits chez senyobante, et permet à ces derniers de
        recevoir en temps réels les commandes faites par les clients
      </p>
      
      <a
        href="https://play.google.com/store/apps/details?id=com.senresto"
        target="_blank"
      >
        <Image src={android} style={{ marginTop: "2em" }} />
      </a>
      {/* 
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} /> */}
    </Container>
  </Layout>
);

export default Home;
