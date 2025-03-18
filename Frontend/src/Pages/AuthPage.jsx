import React, { useEffect, useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="auth flex flex-col justify-center items-center w-full h-full">
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Authentication Tabs">
            <Tab label="Login" value="1" />
            <Tab label="Register" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <LoginPage setActiveTab={setActiveTab} />
        </TabPanel>
        <TabPanel value="2">
          <RegisterPage setActiveTab={setActiveTab} />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default AuthPage;
