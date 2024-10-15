import React, { useState, useEffect } from "react";
import { Table, User, Calendar, CheckCircle, XCircle, Loader } from "lucide-react";

export const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isactive: !currentStatus }),
      });
      if (!response.ok) throw new Error("Failed to update user status");
      fetchUsers(); // Refresh the user list
      alert("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-600 flex items-center">
        <Table className="mr-2" /> User Dashboard
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-green-500" size={48} />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150">
                  <td className="p-3 flex items-center">
                    <User className="mr-2 text-green-500" size={20} />
                    {user.name}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 flex items-center">
                    <Calendar className="mr-2 text-green-500" size={20} />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleUserStatus(user._id, user.isactive)}
                      className={`flex items-center justify-center w-20 py-1 rounded-full transition-all duration-300 ${
                        user.isactive
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                    >
                      {user.isactive ? (
                        <CheckCircle className="mr-1" size={16} />
                      ) : (
                        <XCircle className="mr-1" size={16} />
                      )}
                      {user.isactive ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;