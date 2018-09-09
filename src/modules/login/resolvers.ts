import * as bcrypt from "bcrypt";
import { ResolverMap } from "../../types/graphql-utils";
import { Usuario } from "../../entity/Usuario";
import { GQL } from "../../types/schema";
import { invalidLogin } from "./errorMessages";
import { createJwtToken } from "../../utils/jwt";

const errorResponse = {
  success: false,
  errors: [
    {
      path: "email",
      message: invalidLogin
    }
  ]
};

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => "bye"
  },
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return errorResponse;
      }

      const validPassword = await bcrypt.compare(password, usuario.password);

      if (!validPassword) {
        return errorResponse;
      }

      return {
        success: true,
        errors: null,
        token: createJwtToken(usuario, process.env.SECRET as string)
      };
    }
  }
};
