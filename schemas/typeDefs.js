const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type User {
        _id: ID!
        username: String
        email: String
        password: String
        posts: [Post]
    }

    type Post {
        _id: ID!
        poster: String
        content: String
        date: String
        subFrm: String
    }

    type Query {
        me: User
        allUsers: [User]!
        oneUser: User
    }

    type AuthResult {
        token: ID!
        profile: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        addPost(poster: String!, content: String!, subFrm: String!): Post
        login(email: String!, password: String!): AuthResult
    }

`
module.exports = typeDefs;