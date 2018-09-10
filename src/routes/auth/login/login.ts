import * as bcrypt from "bcrypt";
import { invalidLogin } from "./loginErrorMessages";
import { Request, Response } from "express";
import { Usuario } from "../../../entity/Usuario";
import { createJwtToken } from "../../../utils/jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.status(500).json(invalidLoginResponse);
  }

  const validPassword = await bcrypt.compare(password, usuario.password);

  if (!validPassword) {
    return res.status(500).json(invalidLoginResponse);
  }

  return res.json({
    success: true,
    errors: null,
    token: createJwtToken(usuario, process.env.SECRET as string)
  });
};

const invalidLoginResponse = {
  success: false,
  errors: [
    {
      path: "email",
      message: invalidLogin
    }
  ]
};
