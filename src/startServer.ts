import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import { redis } from "./redis";
import { confirmarEmail } from "./routes/confirmarEmail";
import { genSchema } from "./utils/genSchema";

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host")
    })
  });

  server.express.get("/confirmar/:id", confirmarEmail);

  await createTypeormConn();
  const PORT = process.env.NODE_ENV === "test" ? 0 : 4000;
  const app = await server.start({
    port: PORT
  });
  console.log("Server is running on localhost:" + PORT);
  return app;
};
