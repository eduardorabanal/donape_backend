import * as bcrypt from "bcrypt";
import * as yup from "yup";
import { ResolverMap } from "../../types/graphql-utils";
import { Usuario } from "../../entity/Usuario";
import { GQL } from "../../types/schema";
import { formatYupError } from "../../utils/formatYupError";
import {
  emailDuplicated,
  emailTooShort,
  emailInvalid,
  passwordTooShort,
  nombreTooShort,
  celularInvalid
} from "./errorMessages";

const esquema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailTooShort)
    .max(255)
    .email(emailInvalid),
  password: yup
    .string()
    .min(6, passwordTooShort)
    .max(255),
  nombre: yup
    .string()
    .min(3, nombreTooShort)
    .max(255),
  celular: yup
    .string()
    .min(9)
    .max(9)
    .matches(new RegExp("^9[0-9]{8}$"), celularInvalid)
});

export const resolvers: ResolverMap = {
  Query: {
    bye: () => "bye"
  },
  Mutation: {
    registrarse: async (
      _,
      args: GQL.IRegistrarseOnMutationArguments
      // { redis, url }
    ) => {
      try {
        await esquema.validate(args, { abortEarly: false });
      } catch (err) {
        return {
          success: false,
          errors: formatYupError(err)
        };
      }

      const { email, password, nombre, celular } = args;

      const usuarioYaExiste = await Usuario.findOne({
        where: { email },
        select: ["id"]
      });

      if (usuarioYaExiste) {
        return {
          success: false,
          errors: [
            {
              path: "email",
              message: emailDuplicated
            }
          ]
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const usuario = Usuario.create({
        email,
        password: hashedPassword,
        nombre,
        celular
      });
      await usuario.save();

      return {
        success: true,
        errors: null
      };
    }
  }
};
