import gql from "graphql-tag";

export const GET_CURRENT_USER_QUERY = gql`
query getCurrentUser {
  currentUser @client{
    authenticated
    user{
      picture
      name
    }
  }
}
`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($currentUser: UserInput) {
    loginUser(currentUser: $currentUser) @client
  }
`;

export const LOGOUT_USER_MUTATION = gql`
  mutation logoutUser {
    logoutUser @client
  }
`;

export const GET_CURRENT_MENU_QUERY = gql`
  query getMenu {
    smallMenu @client{
      smallMenu
    }
  }
`;

export const TOGGLE_MENU_MUTATION = gql`
  mutation toggleMenu {
    toggleMenu @client
  }
`;
