import { request } from "graphql-request";
import { HOST } from "./constants";
import { Usuario } from "../entity/Usuario";
import { createTypeormConn } from "../utils/createTypeormConn";

beforeAll(async function() {
  await createTypeormConn();
});

const email = "el@mimo.com";
const password = "elmimo";
const nombre = "Mimo";
const apPaterno = "Carbajo";
const apMaterno = "García";
const celular = "159357456";

const mutation = `
mutation{
    registrarse(
        email:"${email}",
        password:"${password}",
        nombre:"${nombre}",
        apPaterno: "${apPaterno}",
        apMaterno: "${apMaterno}",
        celular:"${celular}"
    )
}`;

test("Registrarse como usuario", async function() {
  const response = await request(HOST, mutation);
  expect(response).toEqual({ registrarse: true });
  const usuarios = await Usuario.find({ where: { email } });
  expect(usuarios).toHaveLength(1);
  const usuario = usuarios[0];
  expect(usuario.email).toEqual(email);
  expect(usuario.password).not.toEqual(password);
});
