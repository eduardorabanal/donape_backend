import * as jwt from "express-jwt";

export const authMiddleware = jwt({
  secret: process.env.SECRET as string,
  credentialsRequired: false
});
