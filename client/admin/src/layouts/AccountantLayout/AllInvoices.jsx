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

const viewAllInvoices = () => {
  const [visible, setVisible] = useState(false);
  const [invoices, setAllInvoice] = useState([]);
  const [allInvoices, setAllInvoices] = useState([]);
  const [reason, setReason] = useState();
  const [selectedId, setSelectedId] = useState();
  const [invoiceId, setInvoiceId] = useState();
  const [errors, setErrors] = useState("");

  function getAllOrder() {
    const AccountantInfo = JSON.parse(localStorage.getItem("AccountantInfo"));
    if (!AccountantInfo) {
      console.error("Accountant information is missing.");
      console.log("AccountantInfo content:", AccountantInfo);
      return;
    }
    if (!AccountantInfo._id) {
      console.error("Accountant ID is missing in AccountantInfo.");
      return;
    }
    axios
      .get(`http://localhost:8080/invoice/get-invoices/${AccountantInfo.empId}`)
      .then((res) => {
        setAllInvoice(res.data);
        setAllInvoices(res.data);
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

  function approveRequisition(invoiceId, orderId) {
    // Send a PUT request to update the order status to "Approved"
    axios
      .put(`http://localhost:8080/order/${orderId}/update-status`, {
        status: "Invoice accepted",
      })
      .then((res) => {
        if (res.data != null) {
          // Update the invoiceStatus when the order is approved
          axios
            .put(
              `http://localhost:8080/invoice/update-invoice-status/${invoiceId}`,
              {
                invoiceStatus: "Invoice accepted",
              }
            )
            .then((invoiceRes) => {
              if (invoiceRes.data != null) {
                window.location.replace("/accountant/view-invoices");
              }
            })
            .catch((invoiceErr) => {
              console.error(
                "Error updating invoice status: " + invoiceErr.message
              );
            });
        }
      })
      .catch((err) => {
        console.error("Error: " + err.message);
      });
  }

  function rejectRequisition() {
    if (!reason) {
      setErrors("Please provide a reason");
      return;
    }

    // Send a PUT request to update the order status to "Declined"
    axios
      .put(`http://localhost:8080/order/${invoiceId}/update-status`, {
        status: "Invoice Declined",
      })
      .then((res) => {
        if (res.data != null) {
          // Update the invoiceStatus when the order is declined
          axios
            .put(
              `http://localhost:8080/invoice/update-invoice-status/${selectedId}`,
              {
                invoiceStatus: "Invoice Declined",
              }
            )
            .then((invoiceRes) => {
              if (invoiceRes.data != null) {
                window.location.replace("/accountant/view-invoices");
              }
            })
            .catch((invoiceErr) => {
              console.error(
                "Error updating invoice status: " + invoiceErr.message
              );
            });
        }
      })
      .catch((err) => {
        console.error("Error: " + err.message);
      });
  }

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Invoice ID</StyledTableCell>
              <StyledTableCell align="right">Order Id</StyledTableCell>
              <StyledTableCell align="right">Item</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Price per unit</StyledTableCell>
              <StyledTableCell align="right">Total Amount</StyledTableCell>
              <StyledTableCell align="right">Order status</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices
              .filter((key) => {
                const status = (key.invoiceStatus || "").toLowerCase();
                return status.includes("invoice sent");
              })
              .map((requisition) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {requisition._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {requisition.orderId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {requisition.item}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {requisition.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {requisition.pricePerUnit}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {requisition.totalAmount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {requisition.invoiceStatus}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      className="g-transparent text-yellow-600 border-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => {
                        approveRequisition(
                          requisition._id,
                          requisition.orderId
                        );
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
                        setInvoiceId(requisition._id);
                        setSelectedId(requisition.orderId);
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
              <StyledTableCell>Invoice ID</StyledTableCell>
              <StyledTableCell align="right">Order Id</StyledTableCell>
              <StyledTableCell align="right">Item</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Price per unit</StyledTableCell>
              <StyledTableCell align="right">Total Amount</StyledTableCell>
              <StyledTableCell align="right">Order status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allInvoices.map((requisition) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {requisition._id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.orderId}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.item}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.quantity}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.pricePerUnit}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.totalAmount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.invoiceStatus}
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
              onClick={rejectRequisition}
              className="g-transparent mt-5 text-yellow-600 border-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Reject Requisition
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

export default viewAllInvoices;
