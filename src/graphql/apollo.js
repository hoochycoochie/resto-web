import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { split, ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { withClientState } from "apollo-link-state";
import { onError } from "apollo-link-error";
import { getMainDefinition } from "apollo-utilities";
import { TOKEN_NAME } from "../utils/static_constants";

// import { CompanySchema, UserSchema, MemberRoleSchema } from "./store/schemas";
import {
  loginUser,
  logoutUser,
  toggleMenu,
  getCurrentUser
} from "./store/resolvers/user";
import { GET_CURRENT_USER_QUERY } from "./store/query-mutation/user";

// developpement
const graphqlUrl = `http://localhost:3001/graphql`;
// const wsUrl = "ws://10.0.3.2:3000/subscriptions";
const wsUrl = "ws://localhost:3001/graphql";

const cache = new InMemoryCache();

//const typeDefs = [CompanySchema, UserSchema, MemberRoleSchema];

const initialState = {
  smallMenu: {
    __typename: "smallMenu",
    smallMenu: true
  },
  currentUser: {
    __typename: "currentUser",
    authenticated: false,
    user: null,
    roles: null,
    company: null
  }
};
const stateLink = withClientState({
  cache,
  defaults: initialState,
  //typeDefs,
  resolvers: {
    Mutation: {
      loginUser,
      logoutUser,
      toggleMenu
    },
    Query: {
      getCurrentUser(_obj, { _ }, { cache }) {
        const query = GET_CURRENT_USER_QUERY;
        console.log("query",query)
        const { currentUser } = cache.readQuery({ query });

        return currentUser;
      }
    }
  }
});
export const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true,
    connectionParams: async () => ({
      token: await localStorage.getItem(TOKEN_NAME)
    })
  }
});

const httpLink = createHttpLink({
  uri: graphqlUrl
});
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(error => console.log("error graphql", error));
});

const authLink = setContext(async (_, { headers }) => {
  const token = await localStorage.getItem(TOKEN_NAME);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const finaleLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

export default new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([errorLink, stateLink, finaleLink]),

  cache
});
