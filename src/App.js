import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import messages from "./i18n";
import { IntlProvider } from "react-intl";
import { Login, NotFound } from "./containers";
import { GuestRoute, AuthRoute } from "./routes";
import { Route } from "react-router-dom";

import { LOGIN_USER_MUTATION } from "./graphql/store/query-mutation/user";
import Home from "./containers/Home";
import {
  ROOT_PATH,
  LOGIN_PATH,
  RESTAURANT_ROOT_PATH,
  RESTAURANT_TEAM_PATH,
  NOT_FOUND_PATH,
  USER_STORAGE,
  RESTAURANT_SUBCAT_PATH,
  RESTAURANT_PRODUCT_PATH,
  RESTAURANT_SUBPROD_PATH,
  RESTAURANT_COMMAND_PATH,
  RESTAURANT_CREATE_PRODUCT_PATH
} from "./utils/static_constants";
import { GET_CURRENT_LANG_QUERY } from "./graphql/store/query-mutation/settings";
import {
  CommandViewList,
  TeamViewList,
  SubcatViewList,
  ProductViewList,
  SubprodViewList,
  CompanySettingsView
} from "./containers/resto";
import ProductViewCreate from "./containers/resto/ProductViewCreate";

class App extends React.Component {
  componentWillMount = async () => {
    const user = await localStorage.getItem(USER_STORAGE);

    if (user) {
      const currentUser = JSON.parse(user);
      await this.props.setUser({
        variables: {
          currentUser
        }
      });
    }
  };
  render() {
    const locale =
      this.props.lang && this.props.lang.lang && this.props.lang.lang.lang
        ? this.props.lang.lang.lang
        : "fr";
    return (
      <IntlProvider locale={locale} messages={messages[("en", "fr")]}>
        <BrowserRouter>
          <Switch>
            <GuestRoute exact path={ROOT_PATH} component={Home} />
            <Route exact path={NOT_FOUND_PATH} component={NotFound} />

            <GuestRoute exact path={LOGIN_PATH} component={Login} />

            <AuthRoute
              exact
              path={RESTAURANT_ROOT_PATH}
              component={CompanySettingsView}
            />

            <AuthRoute
              exact
              path={RESTAURANT_COMMAND_PATH}
              component={CommandViewList}
            />
            <AuthRoute path={RESTAURANT_TEAM_PATH} component={TeamViewList} />
            <AuthRoute
              path={RESTAURANT_SUBCAT_PATH}
              component={SubcatViewList}
            />
            <AuthRoute
              path={RESTAURANT_PRODUCT_PATH}
              component={ProductViewList}
            />
            <AuthRoute
              path={RESTAURANT_SUBPROD_PATH}
              component={SubprodViewList}
            />

            <AuthRoute
              path={RESTAURANT_CREATE_PRODUCT_PATH}
              component={ProductViewCreate}
            />
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}
export default compose(
  graphql(LOGIN_USER_MUTATION, { name: "setUser" }),
  graphql(GET_CURRENT_LANG_QUERY, { name: "lang" })
)(App);
