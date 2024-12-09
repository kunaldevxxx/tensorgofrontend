import React from "react";
import InvoiceList from "../components/Invoice/InvoiceList";
import { triggerOverdueNotifications } from '../services/api';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <InvoiceList />
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <button
          onClick={() => triggerOverdueNotifications()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Send Overdue Notifications
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
