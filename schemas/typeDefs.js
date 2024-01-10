const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type Post {
        _id: ID!
        poster: String
        content: String
        date: String
        subFrm: String
    }

    type User {
        _id: ID!
        username: String
        email: String
        password: String
        posts: [Post]
    }

    type Query {
        me: User
        allUsers: [User]!
        oneUser(_id: String!): User
    }

    type AuthResult {
        token: ID!
        user: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        addPost(poster: String!, content: String!, subFrm: String!): Post
        login(email: String!, password: String!): AuthResult
        updatePost(content: String, poster:String, postId: ID!): User
        removePost(postId: ID!): User
    }

`
module.exports = typeDefs;