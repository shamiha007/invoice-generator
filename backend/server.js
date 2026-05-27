require("dotenv").config();

const express = require("express");

const cors = require("cors");

const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true }));

/* ROUTES */

app.use("/api/invoices", invoiceRoutes);

/* SERVER */

app.listen(process.env.PORT, () => {

  console.log(
    `Server running on port ${process.env.PORT}`
  );

});