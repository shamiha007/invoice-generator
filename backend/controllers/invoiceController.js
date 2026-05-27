const db = require("../config/db");

// GET INVOICES

exports.getInvoices = (req, res) => {

  db.query(

    "SELECT * FROM invoices ORDER BY id DESC",

    (err, result) => {

      if (err) {

        console.log("GET ERROR:", err);

        return res.status(500).json({

          success: false,

          message: "Failed to fetch invoices",

        });

      }

      res.status(200).json(result);

    }

  );

};

// CREATE INVOICE

exports.createInvoice = (req, res) => {

  const {

    companyName,

    companyAddress,

    clientName,

    clientAddress,

    invoiceNumber,

    invoiceDate,

    dueDate,

    terms,

    items,

    total,

    signature,

  } = req.body;

  const sql = `

    INSERT INTO invoices

    (

      companyName,

      companyAddress,

      clientName,

      clientAddress,

      invoiceNumber,

      invoiceDate,

      dueDate,

      terms,

      items,

      total,

      signature

    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

  `;

  db.query(

    sql,

    [

      companyName,

      companyAddress,

      clientName,

      clientAddress,

      invoiceNumber,

      invoiceDate,

      dueDate,

      terms,

      JSON.stringify(items),

      total,

      signature || "",

    ],

    (err, result) => {

      if (err) {

        console.log("CREATE ERROR:", err);

        return res.status(500).json({

          success: false,

          message: "Failed to save invoice",

        });

      }

      res.status(201).json({

        success: true,

        message: "Invoice Saved Successfully",

      });

    }

  );

};

// UPDATE INVOICE

exports.updateInvoice = (req, res) => {

  const { id } = req.params;

  const {

    companyName,

    companyAddress,

    clientName,

    clientAddress,

    invoiceNumber,

    invoiceDate,

    dueDate,

    terms,

    items,

    total,

    signature,

  } = req.body;

  const sql = `

    UPDATE invoices

    SET

      companyName=?,

      companyAddress=?,

      clientName=?,

      clientAddress=?,

      invoiceNumber=?,

      invoiceDate=?,

      dueDate=?,

      terms=?,

      items=?,

      total=?,

      signature=?

    WHERE id=?

  `;

  db.query(

    sql,

    [

      companyName,

      companyAddress,

      clientName,

      clientAddress,

      invoiceNumber,

      invoiceDate,

      dueDate,

      terms,

      JSON.stringify(items),

      total,

      signature || "",

      id,

    ],

    (err, result) => {

      if (err) {

        console.log("UPDATE ERROR:", err);

        return res.status(500).json({

          success: false,

          message: "Failed to update invoice",

        });

      }

      res.status(200).json({

        success: true,

        message: "Invoice Updated Successfully",

      });

    }

  );

};

// DELETE INVOICE

exports.deleteInvoice = (req, res) => {

  const { id } = req.params;

  db.query(

    "DELETE FROM invoices WHERE id=?",

    [id],

    (err, result) => {

      if (err) {

        console.log("DELETE ERROR:", err);

        return res.status(500).json({

          success: false,

          message: "Failed to delete invoice",

        });

      }

      res.status(200).json({

        success: true,

        message: "Invoice Deleted Successfully",

      });

    }

  );

};