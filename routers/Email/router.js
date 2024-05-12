const router = require("express").Router();
const nodemailer = require("nodemailer");
const fs = require("fs");
const htmlTemplate = fs.readFileSync("template.html", "utf8");
const htmlTemplate__ar = fs.readFileSync("template__ar.html", "utf8");
const customerName = "John Doe";
const bookingId = "123456789";
const checkInDate = "2023-06-01";
const checkOutDate = "2023-06-05";

router.get("/", (req, res) => {
    res.send("email api");
});
router.post("/submit-form", (req, res) => {
    const { name, email, message, phone, booking, lan } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // Use SSL/TLS
        auth: {
            user: "test@newsky.online",
            pass: "Test.123@",
        },
    });

    const htmlTemplates = lan === "ar" ? htmlTemplate__ar : htmlTemplate
    const htmlEmail = htmlTemplates
        .replace("{{name}}", name)
        .replace("{{email}}", email)
        .replace("{{phone}}", phone)
        .replace("{{message}}", message)
        .replace("{{booking}}", booking ? booking : "");
    const mailOptions = {
        from: "test@newsky.online", // Replace with your email address
        to: ["sheta@newsky.online", email], // Replace with the recipient's email address
        subject: `Book Request`,
        html: htmlEmail,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res
                .status(500)
                .json({ error: "An error occurred while sending the email" });
        } else {
            console.log("Email sent successfully!", info.response);
            res.status(200).json({ message: "request sent successfully" });
        }
    });
});

module.exports = router;