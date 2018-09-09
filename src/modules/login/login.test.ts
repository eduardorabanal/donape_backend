import { request } from "graphql-request";
import { invalidLogin, emailNotConfirmed } from "./errorMessages";
import { Usuario } from "../../entity/Usuario";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { Connection } from "typeorm";

const email = "el@mimo.com";
const password = "elmimo";
const nombre = "Mimo";
const apPaterno = "Carbajo";
const apMaterno = "García";
const celular = "959357456";

const registerMutation = (fields: any = {}) => `
mutation{
    registrarse(
        email:"${fields.email || email}",
        password:"${fields.password || password}",
        nombre:"${fields.nombre || nombre}",
        apPaterno: "${fields.apPaterno || apPaterno}",
        apMaterno: "${fields.apMaterno || apMaterno}",
        celular:"${fields.celular || celular}"
    ){
      path
      message
    }
}`;

const loginMutation = (fields: any = {}) => `
mutation{
    login(
        email:"${fields.email || email}",
        password:"${fields.password || password}"
    ){
      path
      message
    }
}`;

let conn: Connection;
beforeAll(async function() {
  conn = await createTypeormConn();
});
afterAll(async function() {
  if (conn) { conn.close(); }
});

describe("Login", function() {
  it("valida email no registrado", async function() {
    const response = await request(
      process.env.TEST_HOST as string,
      loginMutation()
    );

    expect(response).toEqual({
      login: [
        {
          path: "email",
          message: invalidLogin
        }
      ]
    });
  });

  it("valida email no confirmado", async function() {
    await request(process.env.TEST_HOST as string, registerMutation());

    const responseLogin = await request(
      process.env.TEST_HOST as string,
      loginMutation()
    );

    expect(responseLogin).toEqual({
      login: [
        {
          path: "email",
          message: emailNotConfirmed
        }
      ]
    });
  });

  it("valida password incorrecto", async function() {
    await request(process.env.TEST_HOST as string, registerMutation());
    await Usuario.update({ email }, { confirmado: true });

    const responseLogin = await request(
      process.env.TEST_HOST as string,
      loginMutation({ password: "hola" })
    );

    expect(responseLogin).toEqual({
      login: [
        {
          path: "email",
          message: invalidLogin
        }
      ]
    });
  });

  it("permite login correcto", async function() {
    await request(process.env.TEST_HOST as string, registerMutation());
    await Usuario.update({ email }, { confirmado: true });

    const responseLogin = await request(
      process.env.TEST_HOST as string,
      loginMutation()
    );

    expect(responseLogin).toEqual({
      login: null
    });
  });
});
