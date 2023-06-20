import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { startStandaloneServer } from '@apollo/server/standalone';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define your GraphQL schema
const typeDefs = `#graphql
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]!
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    todos: async () => await prisma.todo.findMany(),
  },
};

// Create the Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(apolloServer, {
  listen: { path: '/api', port: 3002 },
});

console.log(`🚀 Server ready at ${url}`);
