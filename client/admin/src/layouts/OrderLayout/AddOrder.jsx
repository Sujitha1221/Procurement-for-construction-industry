import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const AddOrder = () => {
  const { id } = useParams();
  const [requisitions, setAllRequisition] = useState([]);
  const [supplier, setAllSupplier] = useState([]);
  const [selSupplier, setSupplier] = useState();
 
  useEffect(() => {
    function getAllRequisition() {
      axios
        .get(`http://localhost:8080/purchase-requisition/get-pr-by-id/${id}`)
        .then((res) => {
          setAllRequisition(res.data);
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });

        axios
        .get(`http://localhost:8080/user/get-all`)
        .then((res) => {
            const filtered = res.data.filter(item => item.role === 'supplier');
            setAllSupplier(filtered);
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });

        
    }

    getAllRequisition();
  }, []);

  function placeOrder() {
    axios
    .post("http://localhost:8080/order/add-order", {
      purchaseRequisition:requisitions, supplier:selSupplier
    })
    .then((res) => {
      if (res.data != null){
        axios
      .put("http://localhost:8080/purchase-requisition/update-items", {
        _id: requisitions._id,
        approvalStatus: "Order Placed",
        reason: '',
      })
      .then((res) => {
        if (res.data != null)
        window.location.replace("/order/view-order");
      })
      .catch((err) => {
        console.error("Error : " + err.message);
      });
      }
    })
    .catch((err) => {
      console.error("Error : " + err.message);
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
              value={requisitions._id}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
          <TextField
              label="Employee ID"
              defaultValue=" "
              value={requisitions.empId}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
          <TextField
              label="Item"
              defaultValue=" "
              value={requisitions.item}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
          <TextField
              label="Qty"
              defaultValue=" "
              value={requisitions.quantity}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
          <TextField
              label="Price Per Unit"
              defaultValue=" "
              value={requisitions.pricePerUnit}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
          <TextField
              label="Reason"
              defaultValue=" "
              value={requisitions.reason}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
          <TextField
              label="Date Time"
              defaultValue=" "
              value={requisitions.dateTime}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="p-4 flex justify-center">
          <TextField
              label="Status"
              defaultValue=" "
              value={requisitions.approvalStatus}
              variant="outlined"
              style={{ width: "100%" }}
              readonly
            />
          </div>
          <div class="colspan-2 p-4">
            <FormControl fullWidth>
              <InputLabel>Supplier</InputLabel>
              <Select onChange={(e) => setSupplier(e.target.value)}>
                {supplier.map((supplier) => (
                  <MenuItem value={supplier._id}>{supplier.empId}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div class="col-span-2 flex justify-center pt-5">
            <button
              onClick={placeOrder}
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

export default AddOrder;
