import { request } from "graphql-request";
import { startServer } from '../../startServer';
import { Usuario } from '../../entity/Usuario';

let getHost = () => "";

beforeAll(async function() {
  const app = await startServer();
  const { port } = app.address();
  getHost = () => `http://127.0.0.1:${port}`;
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
  const response = await request(getHost(), mutation);
  expect(response).toEqual({ registrarse: true });
  const usuarios = await Usuario.find({ where: { email } });
  expect(usuarios).toHaveLength(1);
  const usuario = usuarios[0];
  expect(usuario.email).toEqual(email);
  expect(usuario.password).not.toEqual(password);
});
