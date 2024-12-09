import React, { useEffect, useState } from "react";
import axios from "axios";
import { triggerOverdueNotifications } from '../services/api';
import { toast } from 'react-hot-toast';

const OverdueInvoices = () => {
  const [overdueInvoices, setOverdueInvoices] = useState([]);

  useEffect(() => {
    const fetchOverdueInvoices = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/invoices/overdue", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOverdueInvoices(data);
    };

    fetchOverdueInvoices();
  }, []);

  const handleTriggerOverdueNotifications = async (recipientEmail) => {
    try {
      const response = await triggerOverdueNotifications(recipientEmail);
      if (response.error) {
        toast.error(response.error);
      } else if (response.notifiedInvoices?.length > 0) {
        toast.success(`Sent ${response.notifiedInvoices.length} overdue notifications`);
      } else {
        toast.info('No overdue invoices to notify');
      }
    } catch (error) {
      console.error('Error triggering notifications:', error);
      toast.error('Failed to send overdue notifications. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Overdue Invoices</h1>
        <button
          onClick={() => handleTriggerOverdueNotifications("")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Send All Overdue Notifications
        </button>
      </div>
      {overdueInvoices.map((invoice) => (
        <div key={invoice._id} className="border rounded p-4 mb-2">
          <p>
            <strong>Invoice ID:</strong> {invoice.invoiceId}
          </p>
          <p>
            <strong>Recipient:</strong> {invoice.recipient || 'No recipient defined'}
          </p>
          <button
            onClick={() => invoice.recipient && handleTriggerOverdueNotifications(invoice.recipient)}
            className={`px-4 py-2 ${invoice.recipient ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'} text-white rounded`}
            disabled={!invoice.recipient}
          >
            Send Overdue Notification
          </button>
        </div>
      ))}
    </div>
  );
};

export default OverdueInvoices;
