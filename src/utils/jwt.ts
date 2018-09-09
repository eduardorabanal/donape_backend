import { Usuario } from "../entity/Usuario";
import * as jwt from "jsonwebtoken";

export const createJwtToken = (usuario: Usuario, SECRET: string) => {
  return jwt.sign({ usuario: usuario.id }, SECRET, { expiresIn: "5d" });
};
