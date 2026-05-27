function InvoicePreview({ invoice }) {

  // FORMAT DATE

  const formatDate = (date) => {

    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  };

  return (

    <div
      className="invoice-preview"
      id="invoice-preview"
    >

      <div className="invoice-top"></div>

      {/* HEADER */}

      <div className="invoice-header">

        <div>

          <h1>

            {
              invoice.companyName ||
              "Your Company"
            }

          </h1>

          <p>

            {
              invoice.companyAddress ||
              "Company Address"
            }

          </p>

        </div>

        <div className="invoice-title">

          <h2>
            INVOICE
          </h2>

        </div>

      </div>

      {/* DETAILS */}

      <div className="details-section">

        {/* BILL TO */}

        <div>

          <h3>
            BILL TO
          </h3>

          <p>
            {
              invoice.clientName ||
              "Client Name"
            }
          </p>

          <p>
            {
              invoice.clientAddress ||
              "Client Address"
            }
          </p>

        </div>

        {/* INVOICE INFO */}

        <div className="invoice-info">

          <p>

            <strong>
              Invoice #:
            </strong>{" "}

            {
              invoice.invoiceNumber ||
              "-"
            }

          </p>

          <p>

            <strong>
              Date:
            </strong>{" "}

            {
              formatDate(
                invoice.invoiceDate
              ) || "-"
            }

          </p>

          <p>

            <strong>
              Due Date:
            </strong>{" "}

            {
              formatDate(
                invoice.dueDate
              ) || "-"
            }

          </p>

          <p>

            <strong>
              Terms:
            </strong>{" "}

            {
              invoice.terms || "-"
            }

          </p>

        </div>

      </div>

      {/* TABLE */}

      <table>

        <thead>

          <tr>

            <th>
              Description
            </th>

            <th>
              Qty
            </th>

            <th>
              Rate
            </th>

            <th>
              Amount
            </th>

          </tr>

        </thead>

        <tbody>

          {
            invoice.items?.map(
              (item, index) => (

                <tr key={index}>

                  <td>
                    {
                      item.description
                    }
                  </td>

                  <td>
                    {
                      item.quantity
                    }
                  </td>

                  <td>
                    ₹ {item.rate || 0}
                  </td>

                  <td>
                    ₹ {item.amount || 0}
                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

      {/* BOTTOM */}

      <div className="bottom-section">

        {/* SIGNATURE */}

        <div className="signature-box">

          {
            invoice.signature ? (

              <img
                src={invoice.signature}
                alt="signature"
                className="signature-image"
              />

            ) : (

              <div
                style={{
                  height: "80px",
                }}
              ></div>

            )
          }

          <div className="signature-line"></div>

          <p>
            Authorized Signature
          </p>

        </div>

        {/* PAYMENT */}

        <div className="balance-box">

          <div className="balance-text">

            <h3>

              {
                invoice.terms === "Paid"
                  ? "PAID"
                  : invoice.terms ===
                    "Advance Payment"
                  ? "ADVANCE PAID"
                  : "BALANCE DUE"
              }

            </h3>

          </div>

          <div className="balance-amount">

            <h2>

              ₹{" "}

              {
                Number(
                  invoice.total || 0
                ).toLocaleString(
                  "en-IN"
                )
              }

            </h2>

          </div>

        </div>

      </div>

    </div>

  );

}

export default InvoicePreview;