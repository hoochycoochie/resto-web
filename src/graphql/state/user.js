import gql from "graphql-tag";

export const currentUserQuery = gql`
  query getCurrentUser {
    currentUser @client
  }
`;

export const addUserMutation = gql`
  mutation addUser($user: UserInput) {
    addUser(user: $user) @client
  }
`;

export const removeUserMutation = gql`
  mutation removeUser($remove: Boolean) {
    removeUser(remove: $remove) @client
  }
`;
