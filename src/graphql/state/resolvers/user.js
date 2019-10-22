import { currentUserQuery } from "../user";

const getCurrentUser = (_obj, { _ }, { cache }) => {
  const query = currentUserQuery;
  const { currentUser } = cache.readQuery({ query });

  return currentUser;
};

const addUser = (_obj, { user }, { cache }) => {
  const query = currentUserQuery;

  cache.writeQuery({ query, data: { currentUser: user } });
  return user;
};
const removeUser = (_obj, { remove }, { cache }) => {
  const query = currentUserQuery;

  cache.writeQuery({ query, data: { currentUser: null } });
  return null;
};

export { getCurrentUser, addUser, removeUser };
