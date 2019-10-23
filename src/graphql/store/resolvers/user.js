import {
  GET_CURRENT_USER_QUERY,
  GET_CURRENT_MENU_QUERY
} from "../query-mutation/user";

export const logoutUser = (_obj, _args, { cache }) => {
  cache.writeQuery({
    query: GET_CURRENT_USER_QUERY,
    data: { currentUser: { authenticated: false } }
  });
  return true;
};

export const loginUser = async (_obj, { currentUser }, { cache }) => {
  try {
    console.log("currentUser",currentUser)
    const query = GET_CURRENT_USER_QUERY;

    await cache.writeQuery({
      query,
      data: {
        currentUser: { __typename: "currentUser", ...currentUser }
      }
    });
    return true;
  } catch (error) {
    console.log("error loginUser", error);
  }
};

export const getCurrentUser = async (_obj, params, { cache }) => {
  try {
    const query = GET_CURRENT_USER_QUERY;
    const currentUser = await cache.readQuery({ query });
    console.log("currentUser", currentUser);
    return currentUser;
  } catch (error) {
    console.log("error getCurrentUser", error);
  }
};

export const toggleMenu = async (_obj, _args, { cache }) => {
  try {
    const {
      smallMenu: { smallMenu }
    } = await cache.readQuery({
      query: GET_CURRENT_MENU_QUERY
    });

    const result = !smallMenu;

    await cache.writeQuery({
      query: GET_CURRENT_MENU_QUERY,
      data: { smallMenu: { __typename: "smallMenu", smallMenu: result } }
    });

    return true;
  } catch (error) {
    console.log("error toggleMenu", error);
  }
};
