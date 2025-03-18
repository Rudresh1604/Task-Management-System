import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal } from "@mui/material";
import AddAgentComponent from "../components/AddAgent";
import ViewAgentComponent from "../components/ViewAgent";

const HomePage = () => {
  const [user, setUser] = useState({
    id: "user_12345",
    name: "John Doe",
    email: "johndoe@example.com",
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [viewAgentOpen, setViewAgentOpen] = React.useState(false);
  const viewAgenthandleOpen = () => setViewAgentOpen(true);
  const viewAgenthandleClose = () => setViewAgentOpen(false);
  const [tasks, setTasks] = useState([
    {
      id: "task_001",
      firstName: "Alice",
      phone: "+1 123-456-7890",
      notes: "Follow-up on product inquiry",
    },
    {
      id: "task_002",
      firstName: "Bob",
      phone: "+1 987-654-3210",
      notes: "Schedule demo call",
    },
    {
      id: "task_003",
      firstName: "Charlie",
      phone: "+44 20 7946 0958",
      notes: "Send pricing details",
    },
    {
      id: "task_004",
      firstName: "David",
      phone: "+91 98765 43210",
      notes: "Confirm meeting time",
    },
    {
      id: "task_005",
      firstName: "Eve",
      phone: "+49 152 12345678",
      notes: "Provide project estimate",
    },
  ]);

  const [csvFile, setCsvFile] = useState(null);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/users/get-detail/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Res Data is ", res.data);

      setUser(res.data.user);
      setTasks(res.data.tasks);
    } catch (error) {
      toast("Error fetching data ");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setToken(token);
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    } else {
      navigate("/");
    }
  });

  // Fetch user details and tasks
  useEffect(() => {
    console.log("User Id is ", userId);

    if (userId) {
      console.log("User Id 2 is ", userId);

      fetchUserData();
    }
  }, [userId]);

  // Handle CSV File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ].includes(file.type)
    ) {
      setCsvFile(file);

      // Upload file to server
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await axios.post(
          `${backendUrl}/api/users/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);
        toast(res.data.message);
        setCsvFile(null);
        fetchUserData();
      } catch (error) {
        console.error("Error uploading file:", error);
        toast(error.message);
        setCsvFile(null);
      }
    } else {
      toast("Invalid file format! Please upload CSV.");
      setCsvFile(null);
    }
  };

  return (
    <div className="min-h-screen min-w-auto flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full">
        <div className="mb-4 bg-white rounded">
          <h1 className="text-2xl font-bold text-gray-800 ">Dashboard</h1>
          <div className="border-amber-500 border-2 rounded-2xl"></div>
        </div>
        <ToastContainer />
        <div className="mb-4 p-4 border bg-white rounded-3xl border-purple-300">
          {user && (
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Welcome, {user.name}!</h2>
                <p>Email: {user.email}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  className=" mx-2"
                >
                  Add Agent
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <AddAgentComponent
                    userId={userId}
                    handleClose={handleClose}
                    token={token}
                  />
                </Modal>
                <Button
                  variant="contained"
                  onClick={viewAgenthandleOpen}
                  className=" mx-2"
                >
                  View Agents
                </Button>
                <Modal
                  open={viewAgentOpen}
                  onClose={viewAgenthandleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ViewAgentComponent
                    userId={userId}
                    viewAgenthandleClose={viewAgenthandleClose}
                    token={token}
                  />
                </Modal>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4  p-4 border bg-white rounded-3xl border-purple-300">
          <h2 className="text-lg font-semibold mt-4">Your Tasks</h2>
          <div className="border-amber-500 border-2 rounded-2xl mb-4"></div>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 max-sm:px-0 text-left">No.</th>
                <th className="py-3 px-6 max-sm:px-0 text-left">First Name</th>
                <th className="py-3 px-6 max-sm:px-0 text-left">Phone</th>
                <th className="py-3 px-6 max-sm:px-0 text-left">Notes</th>
                <th className="py-3 px-6 max-sm:px-0 text-left">Assigned To</th>
                <th className="py-3 px-6 max-sm:px-0 text-left">View File</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-6 max-sm:px-0">{index + 1}</td>
                    <td className="py-3 px-6 max-sm:px-0">{task.firstName}</td>
                    <td className="py-3 px-6 max-sm:px-0">{task.phone}</td>
                    <td className="py-3 px-6 max-sm:px-0">{task.notes}</td>
                    <td className="py-3 px-6 max-sm:px-0">
                      {task.assignedTo?.name}
                    </td>
                    <Button
                      variant="contained"
                      className="px-5  max-sm:px-0"
                      style={{ "margin-top": "10px" }}
                    >
                      <a className="" href={task?.filePath}>
                        View
                      </a>
                    </Button>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-3 px-6 text-center text-gray-500"
                  >
                    No tasks assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mb-4 p-4 border bg-white rounded-3xl border-purple-300">
          <h2 className="text-lg font-semibold mb-1">Upload CSV</h2>
          <div className="border-amber-500 border-2 rounded-2xl mb-4"></div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="mt-2 p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
