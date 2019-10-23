import React, { Component } from "react";
import { Icon, Image, Label, Menu } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import Notification from "./Notification";
import {
  TOGGLE_MENU_MUTATION,
  GET_CURRENT_USER_QUERY
} from "../../graphql/store/query-mutation/user";
import { colors } from "../../utils/constants";
import { userInfo } from "os";

class TopMenu extends Component {
  render() {
    console.log("this.props TopMenu", this.props);
    return (
      <Menu
        fixed="top"
        className="top-menu"
        style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
      >
        <Menu.Item
          color="yellow"
          className="no-border"
          onClick={async () => {
            console.log("client", this.props.client);
            await this.props.toggle();
            //   await this.props.menu.refetch();
            // console.log(" this.props.menu", );
          }}
        >
          <Icon name="bars" color="yellow" />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item className="no-border" position="right">
            <Notification />
            <Label
              className="label-on-corner"
              color="teal"
              size={"mini"}
              floating
              circular
            >
              22
            </Label>
          </Menu.Item>
          <Menu.Item className="no-border" position="right">
            <div className="display-inline">
              <Image
                circular
                size={"mini"}
                src={this.props.user.currentUser.user.picture}
              />
              Albiona
            </div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default compose(
  graphql(TOGGLE_MENU_MUTATION, { name: "toggle" }),
  graphql(GET_CURRENT_USER_QUERY, { name: "user" })
)(TopMenu);
