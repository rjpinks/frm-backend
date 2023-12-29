const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type User {
        _id: ID!
        username: String
        email: String
        password: String
        date: Date
        posts: [Posts]
    }

    type Post {
        _id: ID!
        poster: String
        content: String
        date: Date
        subFrm: String
        posts: [postSchema]
    }

    type Query {
        me: Profile
    }

    type AuthResult {
        token: ID!
        profile: Profile
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Profile
        addPost(poster: String!, content: String!, subFrm: String!): Post
        login(email: String!, password: String!): AuthResult
    }

`
module.exports = typeDefs;