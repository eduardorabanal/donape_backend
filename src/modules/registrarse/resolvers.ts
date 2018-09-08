import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { Usuario } from "../../entity/Usuario";
import { GQL } from "../../types/schema";

export const resolvers: ResolverMap = {
  Query: {
    bye: () => "bye"
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
      const usuarioYaExiste = await Usuario.findOne({
        where: { email },
        select: ["id"]
      });

      if (usuarioYaExiste) {
        return [
          {
            path: "email",
            message: "ya ha sido tomado"
          }
        ];
      }

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
      return null;
    }
  }
};
