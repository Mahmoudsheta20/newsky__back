// const express = require("express");
// const bodyParser = require("body-parser");
// const config = require("./config");
// const app = express();
// const port = 3333; // Use the desired port number
const cors = require("cors");
// const amaduce = require("../routers/amaduce/routers");
const email = require("../routers/Email/router");

// // app.use("/amaduce", amaduce);


// // // Middleware setup
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());
// app.get("/", (req, res) => {
//     res.send("Newsky API");
// });

// app.listen(port, () => {
//   console.log(`Server is running on port http://${config.HOST}:${config.PORT}`);
// });
// app.js
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const crypto = require("crypto"); // For signature verification

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/email", email);
// Your PayTabs server key
const serverKey = "S9JN6HTDGZ-J6T2ZN6DHZ-9BT2NWGM2K";

// Endpoint to initiate payment
app.post("/initiate-payment", async(req, res) => {
    try {
        const requestData = {
            profile_id: 102832,
            tran_type: "sale",
            tran_class: "ecom",
            cart_id: "1",
            cart_description: "Description of the items/services",
            cart_currency: "SAR",
            cart_amount: 46.17,
            callback: "http://localhost:3000/",
            return: "http://localhost:3000/",
            customer_details: {
                name: "Mahmoud Sheta",
                email: "shetamahmoud463@gmail.com",
                street1: "404, 11th st, void",
                city: "cairo",
                state: "cai",
                country: "EG",
                ip: "127.0.0.1",
            },
        };

        // If using paylib.js managed form integration, include the payment token
        // requestData.payment_token = 'Temporary single-use payment token provided by paylib.js';

        // If using your own form integration, you would include the card details directly
        // requestData.card_details = {
        //   pan: '4111111111111111',
        //   expiry_month: 12,
        //   expiry_year: 22,
        //   cvv: '123',
        // };

        const response = await axios.post(
            "https://secure.paytabs.sa/payment/request",
            requestData, {
                headers: {
                    Authorization: "S9JN6HTDGZ-J6T2ZN6DHZ-9BT2NWGM2K",
                    "Content-Type": "application/json",
                },
            }
        );

        const paymentUrl = response.data.redirect_url;
        console.log(response);
        res.json({ paymentUrl });
    } catch (error) {
        console.error("Error initiating payment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Endpoint to handle PayTabs callbacks
app.post("/paytabs-callback", (req, res) => {
    try {
        // Implement your callback handling logic here
        // Verify the callback signature and update your application data
        // Respond with a success message
        res.status(200).send("Callback received and processed");
    } catch (error) {
        console.error("Error handling callback:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});