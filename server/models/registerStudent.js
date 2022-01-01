import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  gender: String,
  batch: String,
  department: String,
  registerNumber: String,
  status: String,
  isAdmin: Boolean,
});
const registerStudent = mongoose.model("registerStudent", studentSchema);
export default registerStudent;
