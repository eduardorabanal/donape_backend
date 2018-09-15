import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import { genSchema } from "./utils/genSchema";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { authMiddleware } from "./auth/authMiddleware";
import { authRoutes } from "./auth/routes";

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      url: request.protocol + "://" + request.get("host"),
      user: request.user
    })
  });

  const GRAPHQL_ENDPOINT = "/graphql";

  server.express.use(cors());
  server.express.use(bodyParser.urlencoded({ extended: false }));
  server.express.use(bodyParser.json());
  server.express.post(GRAPHQL_ENDPOINT, authMiddleware);
  server.express.use("/", authRoutes);

  await createTypeormConn();
  const PORT = process.env.NODE_ENV === "test" ? 0 : 4000;
  const app = await server.start({
    port: PORT,
    endpoint: GRAPHQL_ENDPOINT
  });
  console.log("Server is running on localhost:" + PORT);
  return app;
};
