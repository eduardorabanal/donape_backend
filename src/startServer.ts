import { importSchema } from "graphql-import";
import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import * as path from "path";
import * as fs from "fs";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import { GraphQLSchema } from "graphql";

export const startServer = async () => {
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "./modules"));

  folders.forEach(folder => {
    const { resolvers } = require(`./modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `./modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });

  const server = new GraphQLServer({ schema: mergeSchemas({ schemas }) });
  await createTypeormConn();
  const PORT = process.env.NODE_ENV === "test" ? 0 : 4000;
  const app = await server.start({
    port: PORT
  });
  console.log("Server is running on localhost:" + PORT);
  return app;
};
