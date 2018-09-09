import * as SparkPost from "sparkpost";
const client = new SparkPost(process.env.SPARKPOST_API_KEY);

export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: "testing@sparkpostbox.com",
      subject: "Confirma tu email para DonaPe",
      html: `<html>
            <body>
                <h2>Bienvenido a DonaPe</h2>
                <p>
                    ¡Qué gusto que te hayas registrado! Para confirmar tu cuenta solo haz 
                    <a href="${url}">CLICK AQUÍ</a><br>
                    Gracias por sumarte. ¡Tu ayuda será muy útil!
                    <br><br><i>Eduardo Rabanal</i>                    
                </p>                
            </body>
        </html>`
    },
    recipients: [{ address: recipient }]
  });
  console.log(response);
};
