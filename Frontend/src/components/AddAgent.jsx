import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

const AddAgentComponent = ({ userId, handleClose, token }) => {
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

      const res = await axios.post(
        `${backendUrl}/api/users/add-agent`,
        {
          userId: userId,
          email: email,
          password: password,
          name: name,
          phone: mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      if (res.data.success) {
        toast("Added Agent Successfully !");
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
        <div className="heading text-2xl flex justify-between  font-medium text-center">
          <h1>Add Agent</h1>
          <IoCloseSharp className="cursor-pointer" onClick={handleClose} />
        </div>
        <div className="border-amber-500 border-2 rounded-2xl mb-4"></div>
        <div className="flex flex-col px-2 gap-2">
          <span>Enter Agent Name : </span>
          <TextField
            label="Agent Name"
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
          Add
        </Button>
      </Box>
    </div>
  );
};

export default AddAgentComponent;
