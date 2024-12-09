import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditInvoice = () => {
  const { id } = useParams(); 
  const [invoice, setInvoice] = useState({});
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`http://localhost:5000/api/invoices/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvoice(data);
        setRecipient(data.recipient);
        setStatus(data.status);
      } catch (error) {
        alert("Error fetching invoice details.");
      }
    };

    fetchInvoice();
  }, [id]);

  const handleEditInvoice = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/invoices/${id}`,
        { recipient, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Invoice updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error updating invoice. Please try again.");
    }
  };

  return (
    <form onSubmit={handleEditInvoice} className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Edit Invoice</h1>
      <p>
        <strong>Invoice ID:</strong> {invoice.invoiceId}
      </p>
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="border p-2 rounded w-64"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded w-64"
      >
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
        <option value="Overdue">Overdue</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Update Invoice
      </button>
    </form>
  );
};

export default EditInvoice;
