import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TextIcon from "./TextIcon";
import { graphql, compose } from "react-apollo";
import { GET_CURRENT_MENU_QUERY } from "../../graphql/store/query-mutation/user";

function SideMenu({ children, menu: { loading, ...rest } }) {
  const smallMenu =
    rest.smallMenu && rest.smallMenu.smallMenu
      ? rest.smallMenu.smallMenu
      : false;
  return (
    <div className="parent">
      <div className={(smallMenu ? "small-side " : "") + "side"}>
        <Menu
          fixed="left"
          borderless
          className={(smallMenu ? "small-side" : "") + " side"}
          vertical
        >
          <Menu.Item
            as={Link}
            to={"/"}
            name="dashboard"
            // active={activeItem === "dashboard"}
          >
            <TextIcon hideText={smallMenu} color="teal" name="home">
              Dashboard
            </TextIcon>
          </Menu.Item>

          <Menu.Item
            as={Link}
            to={"/"}
            name="appointments"
            // active={activeItem === "appointments"}
          >
            <TextIcon hideText={smallMenu} name="calendar">
              Appointments
            </TextIcon>
          </Menu.Item>

          <Menu.Item
            as={Link}
            to={"/userManagement"}
            name="userManagement"
            // active={activeItem === "userManagement"}
          >
            <TextIcon hideText={smallMenu} name="users">
              Patients
            </TextIcon>
          </Menu.Item>

          <Menu.Item
            as={Link}
            to={"/card"}
            name="card"
            // active={activeItem === "card"}
          >
            <TextIcon hideText={smallMenu} name="time">
              Card
            </TextIcon>
          </Menu.Item>
        </Menu>
      </div>
      <div className={(smallMenu ? "small-content " : "") + "content"}>
        {children}
      </div>
    </div>
  );
}

export default compose(graphql(GET_CURRENT_MENU_QUERY, { name: "menu" }))(
  SideMenu
);
