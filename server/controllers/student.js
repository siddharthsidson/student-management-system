import RegisterStudent from "../models/registerStudent.js";
import jwt from "jsonwebtoken";

export const getStudentList = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded?.email;
    const user = await RegisterStudent.findOne({ email: email });
    if (user.isAdmin) {
      const registerStudents = await RegisterStudent.find();
      res.status(200).json(registerStudents);
    } else return res.json({ status: "error", message: "unauthorized user" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    await RegisterStudent.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      gender: req.body.gender,
      batch: req.body.batch,
      department: req.body.department,
      registerNumber: req.body.registerNumber,
      status: "active",
      isAdmin: false,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email or password empty" });
    console.log(err);
  }
};

export const loginUser = async (req, res) => {
  const user = await RegisterStudent.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({
      status: "error",
      error: "Invalid user name",
      user: false,
    });
  }

  if (req.body.password === user.password) {
    if (user.status === "active") {
      const token = jwt.sign(
        {
          name: user.firstName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        "secret123"
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({
        status: "error",
        error: "Account disabled!!",
        user: false,
      });
    }
  } else {
    return res.json({
      status: "error",
      error: "Invalid username or password",
      user: false,
    });
  }
};

export const studentData = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded?.email;
    const user = await RegisterStudent.findOne({ email: email });
    if (user.isAdmin) {
      const student = await RegisterStudent.findOne({
        email: req?.query?.email,
      });
      res.status(200).json(student);
    } else if (email === user.email) {
      res.status(200).json(user);
    } else return res.json({ status: "error", message: "unauthorized user" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editStudent = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded?.email;
    const user = await RegisterStudent.findOne({ email: email });
    if (user.isAdmin) {
      const result = await RegisterStudent.updateOne(
        { email: req?.query?.email },
        { $set: req.body }
      );
      return result.modifiedCount === 1
        ? res.json({ status: "ok", message: "Updated Successfully" })
        : res.json({ status: "error", error: "No Record Found" });
    } else {
      return res.json({ status: "error", message: "unauthorized user" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded?.email;
    const user = await RegisterStudent.findOne({ email: email });
    if (user.isAdmin) {
      const result = await RegisterStudent.deleteOne({
        email: req?.query?.email,
      });
      console.log(result);
      return result.deletedCount === 1
        ? res.json({ status: "ok", message: "Deleted Successfully" })
        : res.json({ status: "error", error: "No Record Found" });
    } else {
      return res.json({ status: "error", error: "unauthorized user" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const changeStatus = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded?.email;
    const user = await RegisterStudent.findOne({ email: email });
    if (user.isAdmin) {
      const result = await RegisterStudent.updateOne(
        { email: req?.query?.email },
        { $set: { status: req.body.status } }
      );

      return result.modifiedCount === 1
        ? res.json({ status: "ok", message: "Updated Successfully" })
        : res.json({ status: "error", error: "No Record Found" });
    } else {
      return res.json({ status: "error", error: "unauthorized user" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
