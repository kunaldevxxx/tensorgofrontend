import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import AddInvoice from "./components/Invoice/AddInvoice";
import EditInvoice from "./components/Invoice/EditInvoice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices/add" element={<AddInvoice />} />
        <Route path="/invoices/edit/:id" element={<EditInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;
