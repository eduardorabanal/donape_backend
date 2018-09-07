import { ResolverMap } from "./types/graphql-utils";
import { GQL } from "./types/schema";
import * as bcrypt from "bcryptjs";
import { Usuario } from "./entity/Usuario";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Bye ${name || "World"}`
  },
  Mutation: {
    registrarse: async (
      _,
      {
        email,
        password,
        nombre,
        apPaterno,
        apMaterno,
        celular
      }: GQL.IRegistrarseOnMutationArguments
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const usuario = Usuario.create({
        email,
        password: hashedPassword,
        nombre,
        apPaterno,
        apMaterno,
        celular
      });
      await usuario.save();
      return true;
    }
  }
};
