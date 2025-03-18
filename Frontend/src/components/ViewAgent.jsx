import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

const ViewAgentComponent = ({ viewAgenthandleClose, token, userId }) => {
  const [agents, setAgents] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fetchAgentData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/users/get-agents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Res Data is ", res.data);

      setAgents(res.data);
    } catch (error) {
      toast("Error fetching data ");
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchAgentData();
  }, []);
  return (
    <div className="mb-4  p-4 border bg-white rounded-3xl border-purple-300">
      <ToastContainer />
      <div className="heading text-2xl flex justify-between  font-medium text-center">
        <h1>All Agents</h1>
        <IoCloseSharp
          className="cursor-pointer"
          onClick={viewAgenthandleClose}
        />
      </div>
      <div className="border-amber-500 border-2 rounded-2xl mb-4"></div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 max-sm:px-0 text-left">No.</th>
            <th className="py-3 px-6 max-sm:px-0 text-left">Agent Name</th>
            <th className="py-3 px-6 max-sm:px-0 text-left">Phone</th>
            <th className="py-3 px-6 max-sm:px-0 text-left">Email</th>
            <th className="py-3 px-6 max-sm:px-0 text-left">Created By</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {agents?.length > 0 ? (
            agents.map((agent, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-6 max-sm:px-0">{index + 1}</td>
                <td className="py-3 px-6 max-sm:px-0">{agent?.name}</td>
                <td className="py-3 px-6 max-sm:px-0">{agent?.phone}</td>
                <td className="py-3 px-6 max-sm:px-0">{agent?.email}</td>
                <td className="py-3 px-6 max-sm:px-0">{agent.userId?.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-3 px-6 text-center text-gray-500">
                No agents present.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAgentComponent;
