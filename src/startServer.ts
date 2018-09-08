import { importSchema } from "graphql-import";
import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import * as path from "path";
import * as fs from "fs";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import * as Redis from "ioredis";
import { Usuario } from "./entity/Usuario";

export const startServer = async () => {
  const schemas: any[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "./modules"));

  folders.forEach(folder => {
    const { resolvers } = require(`./modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `./modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });

  const redis = new Redis();

  const server = new GraphQLServer({
    schema: mergeSchemas({ schemas }),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host")
    })
  });

  server.express.get("/confirmar/:id", async (req, res) => {
    const { id } = req.params;
    const usuarioId = await redis.get(id);
    if (usuarioId) {
      await Usuario.update({ id: usuarioId }, { confirmado: true });
      res.send("ok");
    } else {
      res.send("enlace inválido");
    }
  });

  await createTypeormConn();
  const PORT = process.env.NODE_ENV === "test" ? 0 : 4000;
  const app = await server.start({
    port: PORT
  });
  console.log("Server is running on localhost:" + PORT);
  return app;
};
