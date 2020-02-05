const express = require("express");
// const bodyParser = require("body-parser");
const mailer = require("./mailer");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Mailer = new mailer(
  "yahoo",
  "smtp.mail.yahoo.com",
  process.env.EMAIL,
  process.env.PASSWORD
);

app.get("/", (req, res) => {
  res.send("<h1>Node Mailer API");
});

app.post("/", (req, res) => {
  const { name, email, msg } = req.body;
  const html = `<p>Hey, Someone contacted you from your website, take a look!.</p> <br>
  <p><strong>Name:</strong>${name} </p>
  <p><strong>email:</strong>${email} </p>
  <p><strong>message:</strong>${msg} </p>
  `;

  Mailer.sendMail(
    "himanshu1998delhi@gmail.com",
    "message from porfolio website",
    "",
    html,
    () => {
      res.send({ success: true });
    }
  );
});

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
