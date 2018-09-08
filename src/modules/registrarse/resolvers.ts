import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { ResolverMap } from "../../types/graphql-utils";
import { Usuario } from "../../entity/Usuario";
import { GQL } from "../../types/schema";
import { formatYupError } from "../../utils/formatYupError";
import { createConfirmEmailLink } from "../../utils/createConfirmEmailLink";
import {
  emailDuplicated,
  emailTooShort,
  emailInvalid,
  passwordTooShort,
  nombreTooShort,
  celularInvalid,
  apPaternoTooShort,
  apMaternoTooShort
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
  apPaterno: yup
    .string()
    .min(3, apPaternoTooShort)
    .max(255),
  apMaterno: yup
    .string()
    .min(3, apMaternoTooShort)
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
      args: GQL.IRegistrarseOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await esquema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password, nombre, apPaterno, apMaterno, celular } = args;

      const usuarioYaExiste = await Usuario.findOne({
        where: { email },
        select: ["id"]
      });

      if (usuarioYaExiste) {
        return [
          {
            path: "email",
            message: emailDuplicated
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

      await createConfirmEmailLink(url, usuario.id, redis);

      return null;
    }
  }
};
