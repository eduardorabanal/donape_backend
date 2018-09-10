import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import { genSchema } from "./utils/genSchema";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import auth from "./routes/auth";

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      url: request.protocol + "://" + request.get("host")
    })
  });

  server.express.use(cors());
  server.express.use(bodyParser.urlencoded({ extended: false }));
  server.express.use(bodyParser.json());
  server.express.use("/auth", auth);

  await createTypeormConn();
  const PORT = process.env.NODE_ENV === "test" ? 0 : 4000;
  const app = await server.start({
    port: PORT,
    endpoint: "/graphql"
  });
  console.log("Server is running on localhost:" + PORT);
  return app;
};
