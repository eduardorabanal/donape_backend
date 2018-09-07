import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  console.log("mode:" + process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: "default" });
};
