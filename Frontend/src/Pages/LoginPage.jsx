import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = ({ setActiveTab }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!name || !email || !password) {
      toast("All fields are required !");
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/users/login`, {
        email: email,
        password: password,
      });
      if (res) {
        console.log("Response is ", res.data);

        toast("Login Successfully");
        let token = res.data.token;

        localStorage.setItem("token", token);
        navigate("/dashboard");
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
          <h1>Login Page</h1>
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
          Login
        </Button>
        <span className="px-2 text-sm text-center">
          New User?{" "}
          <a
            className="cursor-pointer text-blue-500"
            onClick={() => setActiveTab("2")}
          >
            Register Now
          </a>
        </span>
      </Box>
    </div>
  );
};

export default LoginPage;
