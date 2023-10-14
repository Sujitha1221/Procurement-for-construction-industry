import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";

const MakePayment = () => {
  const { id } = useParams();
  const [invoices, setAllInvoices] = useState([]);
  const [supplier, setAllSupplier] = useState([]);
  const [accountant, setAccountant] = useState(null);
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    function getAllOrder() {
      axios
        .get(`http://localhost:8080/invoice/get-invoice-id/${id}`)
        .then((res) => {
          setAllInvoices(res.data);
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });

      axios
        .get(`http://localhost:8080/user/get-all`)
        .then((res) => {
          const filtered = res.data.filter(
            (item) => item.role === "accountant"
          );
          setAllSupplier(filtered);
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });
    }

    getAllOrder();
  }, []);

  function sendInvoice() {
    axios
      .post("http://localhost:8080/payment/add-payment", {
        invoiceId: invoices._id,
        orderId: invoices.orderId,
        item: invoices.item,
        quantity: invoices.quantity,
        totalAmount: invoices.totalAmount,
        CardNumber: cardNumber,
      })
      .then((paymentRes) => {
        if (paymentRes.data != null) {
          // Payment added successfully, now update invoice status
          axios
            .put(
              `http://localhost:8080/invoice/update-invoice-status/${invoices._id}`,
              {
                invoiceStatus: "Payment done",
              }
            )
            .then((invoiceRes) => {
              if (invoiceRes.data != null) {
                // Invoice status updated, now update order status
                axios
                  .put(
                    `http://localhost:8080/order/${invoices.orderId}/update-status`,
                    {
                      status: "Payment done",
                    }
                  )
                  .then((orderRes) => {
                    if (orderRes.data != null) {
                      window.location.replace("/accountant/view-invoices");
                    }
                  })
                  .catch((err) => {
                    console.error(
                      "Error updating order status: " + err.message
                    );
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.error("Error updating invoice status: " + err.message);
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.error("Error adding payment: " + err.message);
        console.log(err);
      });
  }

  return (
    <>
      <div className="flex flex-col align-items w-full min-h-[85vh]">
        <div className="px-[20px] h-[64px] font-bold text-xl w-full flex justify-center items-center gap-[20px]">
          Place Order
        </div>
        <div className="flex justify-center grid grid-cols-2 gap-4 p-10">
          <div class="p-4 flex justify-center">
            <TextField
              label="ID"
              defaultValue=" "
              value={invoices._id}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Invoice ID"
              defaultValue=" "
              value={invoices.orderId}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Item"
              defaultValue=" "
              value={invoices.item}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Qty"
              defaultValue=" "
              value={invoices.quantity}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Total Amount"
              defaultValue=" "
              value={invoices.totalAmount}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              type="Number"
              label="Card Number"
              defaultValue=" "
              onChange={(e) => setCardNumber(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              type="Number"
              label="CVV"
              defaultValue=" "
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              type="Date"
              label="Expiry Date"
              defaultValue=" "
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div class="col-span-2 flex justify-center pt-5">
            <button
              onClick={sendInvoice}
              className="bg-transparent text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakePayment;
