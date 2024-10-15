import React, { useState, useEffect } from "react";
import { Mail, Calendar, User, MessageCircle, Send, Loader, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const ContactUsDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contactus");
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/admin/contactus/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      fetchContacts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleResponse = async (id, response, email) => {
    setSending((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`/api/admin/contactus/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response, email }),
      });

      if (!res.ok) throw new Error("Failed to send response");
      const result = await res.json();
      console.log(result); // Log the result for debugging
      fetchContacts();
    } catch (error) {
      console.error("Error sending response:", error);
    } finally {
      setSending((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Loader className="animate-spin text-green-500" size={48} />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-white">
      {contacts.map((contact) => (
        <div key={contact._id} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-green-50">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-green-700 flex items-center">
              <Mail className="mr-2" size={20} /> {contact.subject}
            </h3>
            <p className="text-sm text-gray-500 flex items-center mt-2">
              <Calendar className="mr-2" size={16} />
              {new Date(contact.date).toLocaleString()}
            </p>
          </div>
          <div className="mb-4 space-y-2">
            <p className="flex items-center">
              <User className="mr-2 text-green-600" size={16} />
              <strong className="text-green-700">Name:</strong> {contact.name}
            </p>
            <p className="flex items-center">
              <Mail className="mr-2 text-green-600" size={16} />
              <strong className="text-green-700">Email:</strong> {contact.email}
            </p>
            <p className="flex items-start">
              <MessageCircle className="mr-2 text-green-600 mt-1" size={16} />
              <span>
                <strong className="text-green-700">Message:</strong> {contact.message}
              </span>
            </p>
            <select
              value={contact.status}
              onChange={(e) => handleStatusChange(contact._id, e.target.value)}
              className="mt-2 p-2 border rounded-md w-full bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            >
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="flex flex-col items-stretch">
            <textarea
              id={`response-${contact._id}`}
              placeholder="Write your response here"
              className="mb-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 resize-none"
              rows="3"
            />
            <button
              onClick={() => {
                const response = document.querySelector(
                  `#response-${contact._id}`
                ).value;
                handleResponse(contact._id, response, contact.email);
                document.querySelector(`#response-${contact._id}`).value = "";
              }}
              disabled={sending[contact._id]}
              className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center justify-center disabled:bg-gray-400"
            >
              {sending[contact._id] ? (
                <>
                  <Loader className="animate-spin mr-2" size={16} />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={16} />
                  Send Response
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactUsDashboard;