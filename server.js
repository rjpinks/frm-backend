const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// This will be used later for bcrypt decryption
// const { authMiddleware } = rquire("./utils/auth");

// This will be used for making queries to the database
// const { typeDefs, resolvers } = rquire("./schema");
// db = rquire("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    // context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// This code snippet will be used later to connect it to the front-end?
/*
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
*/

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
  
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      })
    })
  };

// Call the async function to start the server
startApolloServer();
