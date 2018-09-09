import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { Usuario } from "../../entity/Usuario";
import { GQL } from "../../types/schema";
import { invalidLogin, emailNotConfirmed } from "./errorMessages";

const errorResponse = {
  path: "email",
  message: invalidLogin
};

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => "bye"
  },
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return [errorResponse];
      }

      if (!usuario.confirmado) {
        return [
          {
            path: "email",
            message: emailNotConfirmed
          }
        ];
      }

      const validPassword = await bcrypt.compare(password, usuario.password);

      if (!validPassword) {
        return [errorResponse];
      }

      return null;
    }
  }
};
