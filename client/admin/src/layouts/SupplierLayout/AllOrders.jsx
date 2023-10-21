import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TextField } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Modal } from "antd";

const viewOrder = () => {
  const [visible, setVisible] = useState(false);
  const [orders, setAllOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [reason, setReason] = useState();
  const [selectedId, setSelectedId] = useState();
  const [errors, setErrors] = useState("");

  function getAllOrder() {
    const supplierInfo = JSON.parse(localStorage.getItem("supplierInfo"));
    if (!supplierInfo) {
      console.error("Supplier information is missing.");
      console.log("supplierInfo content:", supplierInfo);
      return;
    }
    if (!supplierInfo._id) {
      console.error("Supplier ID is missing in supplierInfo.");
      return;
    }
    axios
      .get(`http://localhost:8080/order/get-orders/${supplierInfo._id}`)
      .then((res) => {
        setAllOrder(res.data);
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.error("Error: " + err.message);
      });
  }

  useEffect(() => {
    getAllOrder(); // Call the function inside the useEffect
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#facc15",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function approveOrder(objId) {
    // Send a PUT request to update the order status to "Approved"
    axios
      .put(`http://localhost:8080/order/${objId}/update-status`, {
        status: "Approved",
      })
      .then((res) => {
        if (res.data != null) {
          window.location.replace("/supplier/view-orders");
        }
      })
      .catch((err) => {
        console.error("Error : " + err.message);
      });
  }

  function rejectOrder() {
    if (!reason) {
      setErrors("Please provide a reason");
      return;
    }

    // Send a PUT request to update the order status to "Declined"
    axios
      .put(`http://localhost:8080/order/${selectedId}/update-status`, {
        status: "Declined",
      })
      .then((res) => {
        if (res.data != null) {
          window.location.replace("/supplier/view-orders");
        }
      })
      .catch((err) => {
        console.error("Error : " + err.message);
      });
  }

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell align="right">Item</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Total Amount</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .filter((key) => {
                const status = (key.orderStatus || "").toLowerCase();
                return status.includes("pending");
              })
              .map((order) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {order._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.purchaseRequisition?.item}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.purchaseRequisition?.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.purchaseRequisition?.totalAmount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.orderStatus}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      className="g-transparent text-yellow-600 border-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => {
                        approveOrder(order._id);
                      }}
                    >
                      <CheckIcon />
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      className="bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => {
                        setVisible(true);
                        setSelectedId(order._id);
                      }}
                    >
                      <CloseIcon />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell align="right">Item</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Total Amount</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrders.map((order) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {order._id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.purchaseRequisition?.item}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.purchaseRequisition?.quantity}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.purchaseRequisition?.totalAmount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.orderStatus}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
        <div className="flex justify-center p-10">
          <div className="col-span-2 flex flex-col items-center pt-5">
            <TextField
              label="Reason"
              name="reason"
              onChange={(e) => setReason(e.target.value)}
              variant="outlined"
              style={{ width: "500px" }}
            />
            <button
              type="submit"
              onClick={rejectOrder}
              className="g-transparent mt-5 text-yellow-600 border-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Reject Order
            </button>

            <div class="col-span-2 flex justify-center pt-5">
              {errors ? (
                <div className="w-full justify-center text-center px-[20px] py-[10px] border-2 border-red-700 bg-red-100 text-red-700 rounded text-xs">
                  {errors ? errors : ""}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default viewOrder;
