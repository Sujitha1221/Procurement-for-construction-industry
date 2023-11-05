import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const ApprovedOrder = () => {
  const [orders, setAllOrders] = useState([]);

  useEffect(() => {
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
          setAllOrders(res.data);
        })
        .catch((err) => {
          console.error("Error: " + err.message);
        });
    }

    getAllOrder();
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
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .filter((key) => {
                const status = (key.orderStatus || "").toLowerCase();
                return status.includes("approved");
              })
              .map((order) => (
                <StyledTableRow key={order._id}>
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
                    <Link
                      to={{
                        pathname: `/supplier/create-invoice/${order._id}`,
                      }}
                    >
                      <button className="bg-transparent text-yellow-600 border-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Create Invoice
                      </button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ApprovedOrder;
