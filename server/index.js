// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const axios = require("axios");
// const prices = require("./controller/prices");
// const Appointment = require("./model/appointment");
// dotenv.config();
import express from "express";
import "dotenv/config.js";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import { prices } from "./controller/prices.js";
import { Appointment } from "./model/appointment.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ClusterA")
  .then(() => console.log("Connected to the MongoDB database."))
  .catch((error) => console.error("MongoDB connection error:", error));

// Endpoint to get prices
app.get("/api/prices", prices);

let email, amount, name, phone, date, time, selectedService;

// Endpoint to initiate payment
app.post("/api/payment/initialize", async (req, res) => {
  ({ email, amount, name, phone, date, time, selectedService } = req.body);

  if (
    !email ||
    !amount ||
    !name ||
    !phone ||
    !date ||
    !time ||
    !selectedService
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const params = {
    email,
    amount,
  };

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      params,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;

    res.status(200).json(data);
  } catch (error) {
    console.error("Error initializing payment:", error.message);
    if (error.response) {
      // Respond with the error from Paystack
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "Server Error!" });
    }
  }
});

// Endpoint to verify payment
app.get("/api/payment/verify/:reference", async (req, res) => {
  const { reference } = req.params;

  const options = {
    method: "GET",
    url: `https://api.paystack.co/transaction/verify/${reference}`,
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(options);
    const data = response.data.data;

    if (data && data.status) {
      // Save the appointment to MongoDB
      const newAppointment = new Appointment({
        email,
        amount: amount / 100,
        reference,
        name,
        phone,
        date,
        time,
        selectedService,
      });
      await newAppointment.save();

      const encodedMessage = encodeURIComponent(
        `Booking details for reference: ${reference} \nService: ${selectedService} \nDate: ${date} \nTime: ${time}`
      );

      res.status(201).json({
        message: "Payment verified and appointment booked successfully.",
        data,
        whatsappPrompt: `https://wa.me/2348125181154?text=${encodedMessage}`,
      });
    }
  } catch (error) {
    console.error(
      "Error verifying payment:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Payment verification failed." });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}.`));
