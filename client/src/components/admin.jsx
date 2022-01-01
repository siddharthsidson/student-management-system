import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@material-ui/core";
import Modal from "../components/modal/modal";
import EditStudent from "./edit-student";
import { useHistory } from "react-router";
import DeleteModal from "./modal/delete-modal";
import axios from "axios";
import StudentStatus from "./student-status";

const Admin = (props) => {
  const { userData, getStudentList } = props;
  const [viewModalStatus, setviewModalStatus] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [activeEmail, setActiveEmail] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const history = useHistory();
  const btnstyle = {
    marginLeft: "1vh",
  };
  const logout = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };

  const handleDeleteStudent = async () => {
    try {
      let result = await axios.get(
        `http://localhost:5000/deleteStudent?email=${activeEmail}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (!result.data?.error) {
        setDeleteModalStatus(false);
      } else {
        alert(result.data?.error);
        setDeleteModalStatus(false);
      }
      getStudentList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Grid container spacing={1} justifyContent="flex-end">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Admin Dashboard
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Button
            color="primary"
            variant="contained"
            style={{ marginBottom: "5vh" }}
            onClick={logout}
          >
            logout
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Register Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.registerNumber}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setActiveStatus(row.status);
                      setActiveEmail(row.email);
                      setStatusModal(true);
                    }}
                    style={{ ...btnstyle, background: "green" }}
                  >
                    {row.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    style={btnstyle}
                    onClick={() => {
                      setActiveEmail(row.email);
                      setEditModalStatus(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    style={btnstyle}
                    onClick={() => {
                      setActiveEmail(row.email);
                      setviewModalStatus(true);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    style={{ ...btnstyle, background: "red" }}
                    onClick={() => {
                      setActiveEmail(row.email);
                      setDeleteModalStatus(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        title="Edit Student"
        content={
          <EditStudent
            email={activeEmail}
            setModalStatus={setEditModalStatus}
            getStudentList={getStudentList}
          />
        }
        modalStatus={editModalStatus}
        setModalStatus={setEditModalStatus}
      />
      <Modal
        title="View Student"
        content={
          <EditStudent
            email={activeEmail}
            setModalStatus={setviewModalStatus}
            readOnly={true}
          />
        }
        modalStatus={viewModalStatus}
        setModalStatus={setviewModalStatus}
      />
      <Modal
        title="Change Status"
        content={
          <StudentStatus
            email={activeEmail}
            setModalStatus={setStatusModal}
            studentStatus={activeStatus}
            getStudentList={getStudentList}
          />
        }
        modalStatus={statusModal}
        setModalStatus={setStatusModal}
      />
      <DeleteModal
        message={`Are you sure you want to delete this student : ${activeEmail}`}
        modalStatus={deleteModalStatus}
        setModalStatus={setDeleteModalStatus}
        onSuccess={handleDeleteStudent}
        onCancel={() => setDeleteModalStatus(false)}
      />
    </div>
  );
};
export default Admin;
