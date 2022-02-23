import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import {offsetLimitPagination} from "@apollo/client/utilities"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async(token) => {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
}

export const logUserOut = async() => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
}

const httpLink = createHttpLink({
    uri:"https://zosime-gram-backend.herokuapp.com/graphql"
})

const uploadHttpLink = createUploadLink({
    uri:"https://zosime-gram-backend.herokuapp.com/graphql"
})

const authLink = setContext((_, {headers})=> {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        }
    }
})

export const cache = new InMemoryCache({
    typePolicies:{
        Query:{
            fields:{
                seeFeed:offsetLimitPagination(),
            }
        }
    }
})

const onErrorLink = onError(({graphQLErrors, networkError})=>{
    if(graphQLErrors){
        console.log(`graphQLErrors`, graphQLErrors);
    }
    if(networkError){
        console.log(`networkError`, networkError);
    }
});

const client = new ApolloClient({
    link : authLink.concat(onErrorLink).concat(uploadHttpLink),
    cache,
});
export default client;

