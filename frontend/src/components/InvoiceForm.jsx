import { useEffect, useRef, useState } from "react";

import SignatureCanvas from "react-signature-canvas";

import API from "../services/api";

import InvoicePreview from "./InvoicePreview";

import jsPDF from "jspdf";

import html2canvas from "html2canvas";

function InvoiceForm() {

  const signaturePadRef = useRef();

  const fileInputRef = useRef(null);

  const [popup, setPopup] = useState("");

  const emptyInvoice = {
    companyName: "",
    companyAddress: "",
    clientName: "",
    clientAddress: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    terms: "",
    items: [
      {
        description: "",
        quantity: "",
        rate: "",
        amount: "",
      },
    ],
    total: 0,
    signature: "",
  };

  const [invoice, setInvoice] =
    useState(emptyInvoice);

  const [savedInvoices, setSavedInvoices] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [filter, setFilter] =
    useState("");

  // POPUP FUNCTION

  const showPopup = (message) => {

    setPopup(message);

    setTimeout(() => {
      setPopup("");
    }, 2000);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // FETCH INVOICES

  const fetchInvoices = async () => {

    try {

      const res = await API.get(
        "/invoices"
      );

      const formatted =
        res.data.map((inv) => ({
          ...inv,
          items:
            typeof inv.items ===
            "string"
              ? JSON.parse(inv.items)
              : inv.items,
        }));

      setSavedInvoices(formatted);

    } catch (err) {

      console.log(err);

      showPopup(
        "Failed to fetch invoices"
      );
    }
  };

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setInvoice({
      ...invoice,
      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE ITEM CHANGE

  const handleItemChange = (
    index,
    field,
    value
  ) => {

    const updatedItems = [
      ...invoice.items,
    ];

    updatedItems[index][field] =
      value;

    const qty =
      Number(
        updatedItems[index].quantity
      ) || 0;

    const rate =
      Number(
        updatedItems[index].rate
      ) || 0;

    updatedItems[index].amount =
      qty * rate;

    const total =
      updatedItems.reduce(
        (sum, item) =>
          sum +
          Number(item.amount || 0),
        0
      );

    setInvoice({
      ...invoice,
      items: updatedItems,
      total,
    });
  };

  // ADD ITEM

  const addItem = () => {

    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        {
          description: "",
          quantity: "",
          rate: "",
          amount: "",
        },
      ],
    });

    showPopup(
      "New item added successfully"
    );
  };

  // REMOVE ITEM

  const removeItem = (index) => {

    if (
      invoice.items.length === 1
    ) {

      showPopup(
        "At least one item is required"
      );

      return;
    }

    const updatedItems =
      invoice.items.filter(
        (_, i) => i !== index
      );

    const total =
      updatedItems.reduce(
        (sum, item) =>
          sum +
          Number(item.amount || 0),
        0
      );

    setInvoice({
      ...invoice,
      items: updatedItems,
      total,
    });

    showPopup(
      "Item removed successfully"
    );
  };

  // SAVE SIGNATURE

  const saveSignature = () => {

    if (
      signaturePadRef.current &&
      !signaturePadRef.current.isEmpty()
    ) {

      const signatureData =
        signaturePadRef.current.toDataURL();

      setInvoice({
        ...invoice,
        signature: signatureData,
      });

      showPopup(
        "Signature saved successfully"
      );

    } else {

      showPopup(
        "Please draw a signature first"
      );
    }
  };

  // CLEAR SIGNATURE

  const clearSignature = () => {

    if (
      signaturePadRef.current
    ) {

      signaturePadRef.current.clear();

      showPopup(
        "Signature cleared successfully"
      );
    }
  };

  // UPLOAD SIGNATURE

  const uploadSignature = (e) => {

    const file =
      e.target.files[0];

    if (!file) {

      showPopup(
        "No file selected"
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setInvoice({
        ...invoice,
        signature:
          reader.result,
      });

      showPopup(
        "Signature uploaded successfully"
      );
    };

    reader.readAsDataURL(file);
  };

  // REMOVE SIGNATURE

  const removeSignature = () => {

    setInvoice({
      ...invoice,
      signature: "",
    });

    if (
      signaturePadRef.current
    ) {
      signaturePadRef.current.clear();
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    showPopup(
      "Signature removed successfully"
    );
  };

  // SAVE / UPDATE INVOICE

  const saveInvoice = async () => {

    // VALIDATION

    if (
      !invoice.companyName.trim() ||
      !invoice.clientName.trim() ||
      !invoice.invoiceNumber.trim()
    ) {

      showPopup(
        "Please fill all required fields"
      );

      return;
    }

    // VALID ITEMS

    const validItems =
      invoice.items.filter(
        (item) =>
          item.description.trim() !==
            "" &&
          Number(item.quantity) >
            0 &&
          Number(item.rate) > 0
      );

    if (validItems.length === 0) {

      showPopup(
        "Please add at least one valid item"
      );

      return;
    }

    try {

      const invoiceData = {
        ...invoice,
        items: validItems,
      };

      // UPDATE EXISTING

      if (
        editingId !== null
      ) {

        await API.put(
          `/invoices/${editingId}`,
          invoiceData
        );

        showPopup(
          "Invoice updated successfully"
        );

      } else {

        // CREATE NEW

        await API.post(
          "/invoices",
          invoiceData
        );

        showPopup(
          "Invoice saved successfully"
        );
      }

      await fetchInvoices();

      // RESET FORM

      setInvoice(
        emptyInvoice
      );

      setEditingId(null);

      // CLEAR SIGNATURE PAD

      if (
        signaturePadRef.current
      ) {
        signaturePadRef.current.clear();
      }

      // CLEAR FILE INPUT

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {

      console.log(err);

      showPopup(
        "Something went wrong"
      );
    }
  };

  // EDIT INVOICE

  const editInvoice = (inv) => {

    setInvoice({
      ...inv,
      items:
        typeof inv.items ===
        "string"
          ? JSON.parse(inv.items)
          : inv.items,
    });

    setEditingId(inv.id);

    showPopup(
      "Invoice loaded for editing"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE INVOICE

  const deleteInvoice = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this invoice?"
      );

    if (!confirmDelete)
      return;

    try {

      await API.delete(
        `/invoices/${id}`
      );

      fetchInvoices();

      showPopup(
        "Invoice deleted successfully"
      );

    } catch (err) {

      console.log(err);

      showPopup(
        "Failed to delete invoice"
      );
    }
  };

  // DOWNLOAD PDF

  const downloadPDF = async () => {

    try {

      const input =
        document.getElementById(
          "invoice-preview"
        );

      const canvas =
        await html2canvas(input, {
          scale: 2,
        });

      const imgData =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (canvas.height *
          pdfWidth) /
        canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save(
        `Invoice-${invoice.invoiceNumber}.pdf`
      );

      showPopup(
        "PDF downloaded successfully"
      );

    } catch (err) {

      console.log(err);

      showPopup(
        "Failed to download PDF"
      );
    }
  };

  // FILTER

  const filteredInvoices =
    savedInvoices.filter((inv) =>
      (
        inv.clientName || ""
      )
        .toLowerCase()
        .includes(
          filter.toLowerCase()
        )
    );

  return (

    <div className="main-layout">

      {
        popup && (
          <div className="popup-message">
            {popup}
          </div>
        )
      }

      <div className="top-section">

        {/* FORM */}

        <div className="form-container">

          <h1>
            Create Invoice
          </h1>

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={
              invoice.companyName
            }
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="companyAddress"
            placeholder="Company Address"
            value={
              invoice.companyAddress
            }
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            value={
              invoice.clientName
            }
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="clientAddress"
            placeholder="Client Address"
            value={
              invoice.clientAddress
            }
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={
              invoice.invoiceNumber
            }
            onChange={
              handleChange
            }
          />

          <label>
            Invoice Date
          </label>

          <input
            type="date"
            name="invoiceDate"
            value={
              invoice.invoiceDate
            }
            onChange={
              handleChange
            }
          />

          <label>
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={
              invoice.dueDate
            }
            onChange={
              handleChange
            }
          />

          <label>
            Payment Terms
          </label>

          <select
            name="terms"
            value={invoice.terms}
            onChange={
              handleChange
            }
          >

            <option value="">
              Select Payment Terms
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Advance Payment">
              Advance Payment
            </option>

            <option value="Balance Due">
              Balance Due
            </option>

          </select>

          <h2>
            Invoice Items
          </h2>

          {
            invoice.items.map(
              (
                item,
                index
              ) => (

                <div
                  className="item-box"
                  key={index}
                >

                  <input
                    type="text"
                    placeholder="Description"
                    value={
                      item.description
                    }
                    onChange={(
                      e
                    ) =>
                      handleItemChange(
                        index,
                        "description",
                        e.target
                          .value
                      )
                    }
                  />

                  <input
                    type="number"
                    placeholder="Quantity"
                    value={
                      item.quantity
                    }
                    onChange={(
                      e
                    ) =>
                      handleItemChange(
                        index,
                        "quantity",
                        e.target
                          .value
                      )
                    }
                  />

                  <input
                    type="number"
                    placeholder="Rate"
                    value={
                      item.rate
                    }
                    onChange={(
                      e
                    ) =>
                      handleItemChange(
                        index,
                        "rate",
                        e.target
                          .value
                      )
                    }
                  />

                  <input
                    type="number"
                    placeholder="Amount"
                    value={
                      item.amount
                    }
                    readOnly
                  />

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() =>
                      removeItem(
                        index
                      )
                    }
                  >
                    Remove Item
                  </button>

                </div>
              )
            )
          }

          <button
            type="button"
            onClick={addItem}
          >
            + Add Item
          </button>

          <h2>
            Draw Signature
          </h2>

          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 450,
              height: 200,
              className:
                "signature-canvas",
            }}
            ref={
              signaturePadRef
            }
          />

          <div className="signature-actions">

            <button
              type="button"
              onClick={
                saveSignature
              }
            >
              Save Signature
            </button>

            <button
              type="button"
              className="clear-btn"
              onClick={
                clearSignature
              }
            >
              Clear
            </button>

          </div>

          <h2>
            Upload Signature Image
          </h2>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={
              uploadSignature
            }
          />

          {
            invoice.signature && (
              <button
                type="button"
                className="remove-sign-btn"
                onClick={
                  removeSignature
                }
              >
                Remove Signature
              </button>
            )
          }

          <button
            type="button"
            onClick={
              saveInvoice
            }
          >
            {
              editingId !==
              null
                ? "Update Invoice"
                : "Save Invoice"
            }
          </button>

          <button
            type="button"
            className="download-btn"
            onClick={
              downloadPDF
            }
          >
            Download PDF
          </button>

        </div>

        {/* PREVIEW */}

        <div className="preview-container">

          <InvoicePreview
            invoice={invoice}
          />

        </div>

      </div>

      {/* SAVED INVOICES */}

      <div className="history-section">

        <h1>
          Saved Invoices
        </h1>

        <input
          type="text"
          placeholder="Filter invoices..."
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
        />

        <div className="saved-invoice-list">

          {
            filteredInvoices.map(
              (inv) => (

                <div
                  className="saved-card"
                  key={inv.id}
                >

                  <h3>
                    {
                      inv.clientName
                    }
                  </h3>

                  <p>

                    <strong>
                      Company:
                    </strong>{" "}

                    {
                      inv.companyName
                    }

                  </p>

                  <p>

                    <strong>
                      Invoice #:
                    </strong>{" "}

                    {
                      inv.invoiceNumber
                    }

                  </p>

                  <p>

                    <strong>
                      Total:
                    </strong>{" "}

                    ₹{" "}

                    {
                      Number(
                        inv.total || 0
                      ).toLocaleString(
                        "en-IN"
                      )
                    }

                  </p>

                  <div className="saved-btns">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        editInvoice(
                          inv
                        )
                      }
                    >
                      Edit Invoice
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteInvoice(
                          inv.id
                        )
                      }
                    >
                      Delete Invoice
                    </button>

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}

export default InvoiceForm;