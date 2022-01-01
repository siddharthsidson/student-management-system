import axios from "axios";

export const RegisterUserApi = async (data) => {
  try {
    const result = await axios.post("http://localhost:5000/register", data);
    return result;
  } catch (err) {
    console.log(err);
  }
};
