import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import Admin from "./admin";
import Student from "./student";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [student, setStudent] = useState({});
  const history = useHistory();
  const [validUser, setValidUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getData() {
      if (validUser) {
        if (isAdmin) {
          getStudentList();
        } else {
          let res = await axios.get("http://localhost:5000/getStudentData", {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          });
          setStudent(res.data);
        }
      }
    }
    getData();
  }, [validUser]);

  const getStudentList = async () => {
    let res = await axios.get("http://localhost:5000/getStudents", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/login");
      } else {
        setValidUser(true);
        if (user?.isAdmin) {
          setIsAdmin(true);
        }
      }
    } else history.replace("/login");
  }, []);

  return (
    <div>
      {validUser &&
        (isAdmin ? (
          <Admin userData={data} getStudentList={getStudentList} />
        ) : (
          <Student studentData={student} />
        ))}
    </div>
  );
};

export default Dashboard;
