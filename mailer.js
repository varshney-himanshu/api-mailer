const nodemailer = require("nodemailer");

class mailer {
  constructor(service, host, user, pass, name = "", secure = false) {
    this.transporter = nodemailer.createTransport({
      host,
      name,
      port: 465 || 587,
      service,
      secure,
      auth: {
        user,
        pass
      },
      debug: false,
      logger: true
    });

    this.user = user;
  }

  sendMail(
    recieverMail,
    subject = "",
    text = "",
    html = "",
    fallback = () => {}
  ) {
    const mailOptions = {
      from: this.user,
      to: recieverMail,
      subject,
      text,
      html
    };

    this.transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        fallback();
      }
    });
  }
}

module.exports = mailer;
