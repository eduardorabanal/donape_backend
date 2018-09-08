import { request } from "graphql-request";
import { Usuario } from "../../entity/Usuario";
import {
  emailDuplicated,
  emailTooShort,
  emailInvalid,
  passwordTooShort,
  nombreTooShort,
  apPaternoTooShort,
  apMaternoTooShort,
  celularInvalid
} from "./errorMessages";
import { createTypeormConn } from "../../utils/createTypeormConn";

const email = "el@mimo.com";
const password = "elmimo";
const nombre = "Mimo";
const apPaterno = "Carbajo";
const apMaterno = "García";
const celular = "959357456";

const mutation = (fields: any = {}) => `
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

beforeAll(async function() {
  await createTypeormConn();
});

describe("Registro de usuarios", function() {
  it("registra correctamente y valida email único", async function() {
    // registro correcto
    console.log("hosTito", process.env.TEST_HOST);
    const response = await request(process.env.TEST_HOST as string, mutation());
    expect(response).toEqual({ registrarse: null });
    const usuarios = await Usuario.find({ where: { email } });
    expect(usuarios).toHaveLength(1);
    const usuario = usuarios[0];
    expect(usuario.email).toEqual(email);
    expect(usuario.password).not.toEqual(password);

    // usuario que ya existe
    const response2: any = await request(
      process.env.TEST_HOST as string,
      mutation()
    );
    expect(response2.registrarse).toHaveLength(1);
    expect(response2.registrarse[0]).toEqual({
      path: "email",
      message: emailDuplicated
    });
  });

  it("valida email muy corto", async function() {
    const response: any = await request(
      process.env.TEST_HOST as string,
      mutation({ email: "mi" })
    );
    expect(response).toEqual({
      registrarse: [
        {
          path: "email",
          message: emailTooShort
        },
        {
          path: "email",
          message: emailInvalid
        }
      ]
    });
  });

  it("valida password muy corta", async function() {
    const response: any = await request(
      process.env.TEST_HOST as string,
      mutation({ password: "el" })
    );
    expect(response).toEqual({
      registrarse: [
        {
          path: "password",
          message: passwordTooShort
        }
      ]
    });
  });

  it("valida nombre muy corto", async function() {
    const response: any = await request(
      process.env.TEST_HOST as string,
      mutation({ nombre: "mi" })
    );
    expect(response).toEqual({
      registrarse: [
        {
          path: "nombre",
          message: nombreTooShort
        }
      ]
    });
  });

  it("valida apPaterno muy corto", async function() {
    const response: any = await request(
      process.env.TEST_HOST as string,
      mutation({ apPaterno: "mi" })
    );
    expect(response).toEqual({
      registrarse: [
        {
          path: "apPaterno",
          message: apPaternoTooShort
        }
      ]
    });
  });

  it("valida apMaterno muy corto", async function() {
    const response: any = await request(
      process.env.TEST_HOST as string,
      mutation({ apMaterno: "mi" })
    );
    expect(response).toEqual({
      registrarse: [
        {
          path: "apMaterno",
          message: apMaternoTooShort
        }
      ]
    });
  });

  it("valida celular inválido (con letras)", async function() {
    const response: any = await request(
      process.env.TEST_HOST as string,
      mutation({ celular: "97a321456" })
    );
    expect(response).toEqual({
      registrarse: [
        {
          path: "celular",
          message: celularInvalid
        }
      ]
    });
  });

  it("valida celular inválido (no empieza con 9)", async function() {
    const response: any = await request(
      process.env.TEST_HOST as string,
      mutation({ celular: "474321456" })
    );
    expect(response).toEqual({
      registrarse: [
        {
          path: "celular",
          message: celularInvalid
        }
      ]
    });
  });
});
