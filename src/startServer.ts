import { importSchema } from "graphql-import";
import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers";
import * as path from "path";
import { createTypeormConn } from "./utils/createTypeormConn";

export const startServer = async () => {
  const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
  const server = new GraphQLServer({ typeDefs, resolvers });
  await createTypeormConn();
  const PORT = process.env.NODE_ENV === "test" ? 0 : 4000;
  const app = await server.start({
    port: PORT
  });
  console.log("Server is running on localhost:" + PORT);
  return app;
};
