import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TextIcon from "./TextIcon";
import { graphql, compose } from "react-apollo";
import { GET_CURRENT_MENU_QUERY } from "../../graphql/store/query-mutation/settings";
import { withRouter } from "react-router-dom";
import {
  RESTAURANT_ROOT_PATH,
  RESTAURANT_TEAM_PATH,
  RESTAURANT_SUBCAT_PATH,
  RESTAURANT_PRODUCT_PATH,
  RESTAURANT_SUBPROD_PATH,
  RESTAURANT_COMMAND_PATH,
  RESTAURANT_CREATE_PRODUCT_PATH,
  RESTAURANT_SETTINGS_PATH
} from "../../utils/static_constants";
import { FormattedMessage } from "react-intl";
import { colors } from "../../utils/constants";

function SideMenu({
  children,
  menu: { loading, ...rest },
  location: { pathname }
}) {
  const smallMenu =
    rest.smallMenu && rest.smallMenu.smallMenu
      ? rest.smallMenu.smallMenu
      : false;
  const activeStyle = { backgroundColor: colors.VIOLET, color: colors.PINK };
  const rootActive = pathname.toString() === RESTAURANT_ROOT_PATH;
  const teamActive = pathname.toString() === RESTAURANT_TEAM_PATH;
  const subcatActive = pathname.toString() === RESTAURANT_SUBCAT_PATH;
  const productActive = pathname.toString() === RESTAURANT_PRODUCT_PATH;
  // const subprodActive = pathname.toString() == RESTAURANT_SUBPROD_PATH;
  const commandActive = pathname.toString() === RESTAURANT_COMMAND_PATH;
  const settingActive = pathname.toString() === RESTAURANT_SETTINGS_PATH;
  const createProdActive =
    pathname.toString() === RESTAURANT_CREATE_PRODUCT_PATH;
  return (
    <div className="parent" style={{ padding: 10, marginTop: 10 }}>
      <div className={(smallMenu ? "small-side " : "") + "side"}>
        <Menu
          fixed="left"
          borderless
          className={(smallMenu ? "small-side" : "") + " side"}
          vertical
        >
          <Menu.Item
            as={Link}
            to={RESTAURANT_COMMAND_PATH}
            name="dashboard"
            active={commandActive}
            style={commandActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="shop">
              <FormattedMessage id="commands" />
            </TextIcon>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={RESTAURANT_ROOT_PATH}
            name="dashboard"
            active={rootActive}
            style={rootActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="home">
              <FormattedMessage id="general_condition" />
            </TextIcon>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={RESTAURANT_SETTINGS_PATH}
            name="dashboard"
            active={settingActive}
            style={settingActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="settings">
              <FormattedMessage id="settings" />
            </TextIcon>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={RESTAURANT_CREATE_PRODUCT_PATH}
            name="dashboard"
            active={commandActive}
            style={createProdActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="plus">
              <FormattedMessage id="create_product" />
            </TextIcon>
          </Menu.Item>

          <Menu.Item
            as={Link}
            to={RESTAURANT_PRODUCT_PATH}
            //  name={<FormattedMessage id="product_list" />}
            active={productActive}
            style={productActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="product hunt">
              <FormattedMessage id="product_list" />
            </TextIcon>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={RESTAURANT_TEAM_PATH}
            // name={<FormattedMessage id="team" />}
            active={teamActive}
            style={teamActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="users">
              <FormattedMessage id="team" />
            </TextIcon>
          </Menu.Item>

          <Menu.Item
            as={Link}
            to={RESTAURANT_SUBCAT_PATH}
            // name={<FormattedMessage id="subcats" />}
            active={subcatActive}
            style={subcatActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="setting">
              <FormattedMessage id="subcats" />
            </TextIcon>
          </Menu.Item>
          {/* <Menu.Item
            as={Link}
            to={RESTAURANT_SUBPROD_PATH}
            //  name={<FormattedMessage id="subprods" />}
            active={subprodActive}
            style={subprodActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="setting">
              <FormattedMessage id="subprods" />
            </TextIcon>
          </Menu.Item> */}
        </Menu>
      </div>
      <div className={(smallMenu ? "small-content " : "") + "content"}>
        {children}
      </div>
    </div>
  );
}

export default compose(graphql(GET_CURRENT_MENU_QUERY, { name: "menu" }))(
  withRouter(SideMenu)
);
