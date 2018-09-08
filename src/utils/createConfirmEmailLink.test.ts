import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { createTypeormConn } from "./createTypeormConn";
import { Usuario } from "../entity/Usuario";
import * as Redis from "ioredis";
import fetch from "node-fetch";

let usuarioId: string;

beforeAll(async () => {
  await createTypeormConn();
  const usuario = await Usuario.create({
    email: "el@mimix.com",
    password: "elmimoso",
    nombre: "Mimo",
    apPaterno: "Carbajo",
    apMaterno: "García",
    celular: "959357456"
  }).save();
  usuarioId = usuario.id;
});

describe("Enlace de confirmación de email", function() {
  it("confirma usuario y borra su entrada en redis", async function() {
    const redis = new Redis();

    const url = await createConfirmEmailLink(
      process.env.TEST_HOST as string,
      usuarioId,
      redis
    );
    const response = await fetch(url);
    const text = await response.text();
    expect(text).toEqual("ok");
    const usuario = await Usuario.findOne({ where: { id: usuarioId } });
    expect((usuario as Usuario).confirmado).toBeTruthy();

    const partesUrl = url.split("/");
    const key = partesUrl[partesUrl.length - 1];
    const value = await redis.get(key);

    expect(value).toBeNull();
  });

  it("muestra error si recibe key inválido", async function() {
    const response = await fetch(`${process.env.TEST_HOST}/confirmar/1234`);
    const text = await response.text();
    expect(text).toEqual("enlace inválido");
  });
});
