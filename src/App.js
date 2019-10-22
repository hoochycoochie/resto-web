import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import messages from "./i18n";
import { IntlProvider } from "react-intl";
import { Login, NotFound } from "./containers";
import { GuestRoute, AuthRoute } from "./routes";
import { Route } from "react-router-dom";
import Command from "./containers/Command";
import { USER_STORAGE } from "./utils/static_constants";
import { addUserMutation, currentUserQuery } from "./graphql/state/user";

class App extends React.Component {
  componentWillMount = async () => {
    
    const user = await localStorage.getItem(USER_STORAGE);
    const currentUser = JSON.parse(user);
    if (currentUser) {
      await this.props.setUser({
        variables: {
          user: {
            ...currentUser
          }
        }
      });
    }
    console.log("componentWillMount");
  };
  render() {
    console.log("this.props", this.props);
    return (
      <IntlProvider locale={"en"} messages={messages[("en", "fr")]}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/notfound" component={NotFound} />

            <GuestRoute exact path="/" component={Login} />
            <Route exact path="/restaurant" component={Command} />
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}
export default compose(
  graphql(addUserMutation, { name: "setUser" }),
  graphql(currentUserQuery, { name: "onlineUser" })
)(App);
