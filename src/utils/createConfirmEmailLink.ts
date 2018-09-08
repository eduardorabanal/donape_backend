import { v4 } from "uuid";
import { Redis } from "ioredis";

export const createConfirmEmailLink = async (
  url: string,
  usuarioId: string,
  redis: Redis
) => {
  const id = v4();
  await redis.set(id, usuarioId, "ex", 60 * 60 * 24);
  return `${url}/confirmar/${id}`;
};
