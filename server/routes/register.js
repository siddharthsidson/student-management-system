import express from "express";
import {
  createStudent,
  getStudentList,
  loginUser,
  studentData,
  editStudent,
  deleteStudent,
  changeStatus,
} from "../controllers/student.js";
const router = express.Router();

router.get("/getStudents", getStudentList);
router.post("/register", createStudent);
router.post("/login", loginUser);
router.get("/getStudentData", studentData);
router.post("/editStudent", editStudent);
router.get("/deleteStudent", deleteStudent);
router.post("/changeStatus", changeStatus);
export default router;
