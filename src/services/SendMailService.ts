import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
           const transporter = nodemailer.createTransport({
               host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                }
           })

           this.client = transporter;
        });
    }

    async execute(to: string, subject: string, variables: object, path: string){
        const templateFileCOntent = fs.readFileSync(path).toString("utf8")

        const mailTemplateParse = handlebars.compile(templateFileCOntent)

        const html = mailTemplateParse(variables)

        const messege = await this.client.sendMail({
            to, 
            subject, 
            html,
            from: "NPS <noreplay@nps.com.br>"
        });

        console.log("Messge send: %s", messege.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(messege));
    }
}

export default new SendMailService();
