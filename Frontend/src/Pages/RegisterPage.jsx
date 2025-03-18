import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

const RegisterPage = ({ setActiveTab }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSubmit = async () => {
    if (!name || !email || !password) {
      toast("All fields are required !");
      return;
    }

    try {
      console.log(mobile);

      const res = await axios.post(`${backendUrl}/api/users/register`, {
        email: email,
        password: password,
        name: name,
        mobile: mobile,
      });
      console.log(res);

      if (res) {
        toast("Registered Successfully !");
      } else {
        toast("Something went wrong ! try again later ");
        return;
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };
  return (
    <div className="flex  w-full h-full justify-center items-center ">
      <ToastContainer />
      <Box className="border bg-white p-3 rounded-lg flex flex-col gap-2">
        <div className="heading text-2xl  font-medium text-center">
          <h1>Register Agent</h1>
        </div>
        <span className="border-b-1 border-purple-600"></span>
        <div className="flex flex-col px-2 gap-2">
          <span>Enter Username : </span>
          <TextField
            label="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
        </div>
        <div className="flex flex-col px-2 gap-2">
          <span>Enter Email : </span>
          <TextField
            label="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </div>
        <div className="flex flex-col px-2 gap-2">
          <span>Enter Mobile Number : </span>
          <PhoneInput
            placeholder="Enter Mobile"
            country={"in"}
            value={mobile}
            onChange={(value) => setMobile(value)}
          />
        </div>
        <div className="flex flex-col px-2 gap-2">
          <span>Enter Password : </span>
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </div>
        <Button
          variant="contained"
          className=" mx-2 "
          onClick={() => handleSubmit()}
        >
          Register
        </Button>
        <span className="px-2 text-sm text-center">
          Already a User ?{" "}
          <a
            className="cursor-pointer text-blue-500"
            onClick={() => setActiveTab("1")}
          >
            Login Now
          </a>
        </span>
      </Box>
    </div>
  );
};

export default RegisterPage;
