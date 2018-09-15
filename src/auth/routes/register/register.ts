import * as bcrypt from "bcrypt";
import * as yup from "yup";
import {
  emailTooShort,
  emailInvalid,
  passwordTooShort,
  nombreTooShort,
  celularInvalid,
  emailDuplicated
} from "./registerErrorMessages";
import { Request, Response } from "express";
import { formatYupError } from "../../../utils/formatYupError";
import { Usuario } from "../../../entity/Usuario";
import { createJwtToken } from "../../../auth/jwt";

const esquema = yup.object().shape({
  email: yup
    .string()
    .required()
    .min(3, emailTooShort)
    .max(255)
    .email(emailInvalid),
  password: yup
    .string()
    .required()
    .min(6, passwordTooShort)
    .max(255),
  nombre: yup
    .string()
    .required()
    .min(3, nombreTooShort)
    .max(255),
  celular: yup
    .string()
    .required()
    .min(9)
    .max(9)
    .matches(new RegExp("^9[0-9]{8}$"), celularInvalid)
});

export const register = async (req: Request, res: Response) => {
  const usuarioBody = req.body;

  try {
    await esquema.validate(usuarioBody, { abortEarly: false });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: formatYupError(err)
    });
  }

  const { email, password, nombre, celular } = usuarioBody;

  const usuarioYaExiste = await Usuario.findOne({
    where: { email },
    select: ["id"]
  });

  if (usuarioYaExiste) {
    return res.status(500).json({
      success: false,
      errors: [
        {
          path: "email",
          message: emailDuplicated
        }
      ]
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const usuario = Usuario.create({
    email,
    password: hashedPassword,
    nombre,
    celular
  });
  await usuario.save();

  return res.json({
    success: true,
    errors: null,
    token: createJwtToken(usuario, process.env.SECRET as string)
  });
};
