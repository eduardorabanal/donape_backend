import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { ResolverMap } from "../../types/graphql-utils";
import { Usuario } from "../../entity/Usuario";
import { GQL } from "../../types/schema";
import { formatYupError } from "../../utils/formatYupError";
// import { createConfirmEmailLink } from "../../utils/createConfirmEmailLink";
// import { sendEmail } from "../../utils/sendEmail";
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
        return formatYupError(err);
      }

      const { email, password, nombre, celular } = args;

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
        celular
      });
      await usuario.save();

      // if (process.env.NODE_ENV !== "test") {
      //   await sendEmail(
      //     email,
      //     await createConfirmEmailLink(url, usuario.id, redis)
      //   );
      // }

      return null;
    }
  }
};
