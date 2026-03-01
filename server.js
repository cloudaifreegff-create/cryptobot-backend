// ===== CRYPTOBOT BACKEND (Railway READY) =====

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ===== ВСТАВЬ СЮДА СВОЙ TOKEN =====
const TOKEN = process.env.TOKEN;

// Crypto Pay API
const API = "https://pay.crypt.bot/api";

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
    res.send("CryptoBot backend running");
});

// ===== CREATE INVOICE =====
app.post("/createInvoice", async (req, res) => {

    try {

        const response = await fetch(API + "/createInvoice", {
            method: "POST",
            headers: {
                "Crypto-Pay-API-Token": TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        res.json(data);

    } catch (e) {

        res.status(500).json({
            ok: false,
            error: e.message
        });

    }

});

// ===== CHECK INVOICE =====
app.post("/checkInvoice", async (req, res) => {

    try {

        const response = await fetch(API + "/getInvoices", {
            method: "POST",
            headers: {
                "Crypto-Pay-API-Token": TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        res.json(data);

    } catch (e) {

        res.status(500).json({
            ok: false,
            error: e.message
        });

    }

});

// ===== PORT =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
