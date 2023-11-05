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

const ApprovedInvoices = () => {
  const [invoices, setAllInvoices] = useState([]);

  useEffect(() => {
    function getAllInvoices() {
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
        .get(
          `http://localhost:8080/invoice/get-invoices/${AccountantInfo.empId}`
        )
        .then((res) => {
          setAllInvoices(res.data);
          console.log("API Response: ", res.data);
        })
        .catch((err) => {
          console.error("Error: " + err.message);
        });
    }

    getAllInvoices();
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

  console.log(invoices);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices
              .filter((key) => {
                const status = (key.invoiceStatus || "").toLowerCase();
                return status.includes("invoice accepted");
              })
              .map((invoice) => (
                <StyledTableRow key={invoice._id}>
                  <StyledTableCell component="th" scope="row">
                    {invoice._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {invoice.orderId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {invoice.item}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {invoice.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {invoice.pricePerUnit}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {invoice.totalAmount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {invoice.invoiceStatus}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link
                      to={{
                        pathname: `/accountant/make-payment/${invoice._id}`,
                      }}
                    >
                      <button className="bg-transparent text-yellow-600 border-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Make Payment
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

export default ApprovedInvoices;
