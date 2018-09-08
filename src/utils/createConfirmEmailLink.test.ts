import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { createTypeormConn } from "./createTypeormConn";
import { Usuario } from "../entity/Usuario";
import * as Redis from "ioredis";
import fetch from "node-fetch";
import { Connection } from "typeorm";

let usuarioId: string;
const redis = new Redis();

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeormConn();
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

afterAll(async () => {
  if (conn) {
    conn.close();
  }
});

describe("Enlace de confirmación de email", function() {
  it("confirma usuario y borra su entrada en redis", async function() {
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
});
