import nodemailer, { Transporter, TransportOptions } from 'nodemailer';

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: process.env.SMTP_PORT,
      secure: false,
      logger: true,
      debug: true,
      auth: {
        user: 'tsks.mail.service@gmail.com',
        pass: 'thzxzkadeurmkxhw',
      },
    } as TransportOptions)
  }
  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: 'tsks.mail.service@gmail.com',
      to,
      subject: `Account activation on ${process.env.APP_URL}`,
      text: '',
      html:
        `
          <div>
            <h1>To activate the account, follow the link</h1>
            <a href="${link}">${link}</a>
          </div>
        `
    })
  }
}

export default new MailService();
