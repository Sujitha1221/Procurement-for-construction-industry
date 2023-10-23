import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";

const CreateInvoice = () => {
  const { id } = useParams();
  const [orders, setAllOrders] = useState([]);
  const [supplier, setAllSupplier] = useState([]);
  const [accountant, setAccountant] = useState(null);

  useEffect(() => {
    function getAllOrder() {
      axios
        .get(`http://localhost:8080/order/get-order/${id}`)
        .then((res) => {
          setAllOrders(res.data);
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });

      axios
        .get(`http://localhost:8080/user/get-all`)
        .then((res) => {
          const filtered = res.data.filter((item) => item.role === "supplier");
          setAllSupplier(filtered);
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });
    }

    getAllOrder();
  }, []);

  useEffect(() => {
    // Create a function to fetch accountant details by empId
    const fetchAccountantDetails = async () => {
      try {
        if (orders.purchaseRequisition?.empId) {
          const response = await axios.get(
            `http://localhost:8080/accountant/get-accountant/${orders.purchaseRequisition.empId}`
          );
          setAccountant(response.data);
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };

    // Call the function to fetch accountant details
    fetchAccountantDetails();
  }, [orders.purchaseRequisition?.empId]);

  function sendInvoice() {
    axios
      .post("http://localhost:8080/invoice/add-invoice", {
        orderId: orders._id,
        empId: orders.purchaseRequisition?.empId,
        item: orders.purchaseRequisition?.item,
        quantity: orders.purchaseRequisition?.quantity,
        pricePerUnit: orders.purchaseRequisition?.pricePerUnit,
        totalAmount: orders.purchaseRequisition?.totalAmount,
        accountantId: accountant?.accountantId,
        accountantEmail: accountant?.accountantEmail,
      })
      .then((res) => {
        if (res.data != null) {
          axios
            .put(`http://localhost:8080/order/${id}/update-status`, {
              status: "Invoice sent",
            })
            .then((res) => {
              if (res.data != null)
                window.location.replace("/supplier/view-orders");
            })
            .catch((err) => {
              console.error("Error : " + err.message);
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.error("Error : " + err.message);
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
              value={orders._id}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Employee ID"
              defaultValue=" "
              value={orders.purchaseRequisition?.empId}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Item"
              defaultValue=" "
              value={orders.purchaseRequisition?.item}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Qty"
              defaultValue=" "
              value={orders.purchaseRequisition?.quantity}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Price Per Unit"
              defaultValue=" "
              value={orders.purchaseRequisition?.pricePerUnit}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Status"
              defaultValue=" "
              value={orders.orderStatus}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>

          <div class="p-4 flex justify-center">
            <TextField
              label="Accountant Id"
              defaultValue=" "
              value={accountant?.accountantId}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Accountant Email"
              defaultValue=" "
              value={accountant?.accountantEmail}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Total amount to be paid"
              defaultValue=" "
              value={orders.purchaseRequisition?.totalAmount}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
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

export default CreateInvoice;
