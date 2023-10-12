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
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import axios from "axios";

const ViewOrder = () => {

  const [requisitions, setAllRequisition] = useState([]);

  useEffect(() => {
    function getAllRequisition() {
      axios
        .get("http://localhost:8080/purchase-requisition/get-all-pr")
        .then((res) => {
          setAllRequisition(res.data);
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });
    }

    getAllRequisition();
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
              <StyledTableCell>Requisition ID</StyledTableCell>
              <StyledTableCell align="right">Item</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Total Amount</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {requisitions
            .filter((key) => {
              const status = (key.approvalStatus || "").toLowerCase();
              return (
                status.includes("approved")
              );
            })
            .map((requisition) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {requisition._id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.item}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.quantity}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.totalAmount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {requisition.approvalStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
              <Link to={{pathname: `/order/add-order/${requisition._id}`}}>
                  <button className="bg-transparent text-yellow-600 border-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Make order
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

export default ViewOrder;
