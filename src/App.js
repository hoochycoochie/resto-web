import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import messages from "./i18n";
import { IntlProvider } from "react-intl";
import { Login, NotFound } from "./containers";
import { GuestRoute, AuthRoute } from "./routes";
import { Route } from "react-router-dom";
import Command from "./containers/Command";
import {
  LOGIN_USER_MUTATION,
  GET_CURRENT_USER_QUERY
} from "./graphql/store/query-mutation/user";
import Home from "./containers/Home";
import {
  ROOT_PATH,
  LOGIN_PATH,
  RESTAURANT_ROOT_PATH,
  NOT_FOUND_PATH
} from "./utils/static_constants";

class App extends React.Component {
  render() {
    //console.log("this.props", this.props);
    return (
      <IntlProvider locale={"en"} messages={messages[("en", "fr")]}>
        <BrowserRouter>
          <Switch>
            <GuestRoute exact path={ROOT_PATH} component={Home} />
            <Route exact path={NOT_FOUND_PATH} component={NotFound} />

            <GuestRoute exact path={LOGIN_PATH} component={Login} />

            <AuthRoute exact path={RESTAURANT_ROOT_PATH} component={Command} />
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}
export default compose(
  graphql(LOGIN_USER_MUTATION, { name: "setUser" }),
  graphql(GET_CURRENT_USER_QUERY, { name: "onlineUser" })
)(App);
