import { Request, Response } from "express";
import { Usuario } from "../entity/Usuario";
import { redis } from "../redis";

export const confirmarEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioId = await redis.get(id);
  if (usuarioId) {
    await Usuario.update({ id: usuarioId }, { confirmado: true });
    await redis.del(id);
    res.send("ok");
  } else {
    res.send("enlace inválido");
  }
};
