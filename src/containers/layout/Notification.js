import React, { Component } from "react";
import { Popup, Icon } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import NotificationContent from "./NotificationContent";
import { GET_CURRENT_USER_QUERY } from "../../graphql/store/query-mutation/user";

class Notification extends Component {
  render() {
    console.log("Notification props", this.props);
    return (
      <Popup
        hoverable
        trigger={<Icon size="large" name="mail outline" color="grey" />}
        position="bottom right"
        verticalOffset={18}
        size="small"
      >
        <NotificationContent />
      </Popup>
    );
  }
}

export default compose(graphql(GET_CURRENT_USER_QUERY, { name: "user" }))(
  Notification
);
