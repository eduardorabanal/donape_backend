import fetch from "node-fetch";

it("muestra error si recibe key inválido", async function() {
  const response = await fetch(`${process.env.TEST_HOST}/confirmar/1234`);
  const text = await response.text();
  expect(text).toEqual("enlace inválido");
});
