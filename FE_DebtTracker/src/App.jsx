
import Transactions from "./pages/Transactions";
import Email from "./pages/Email";
import Reports from "./pages/Reports";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Persons from "./pages/Persons";
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/email" element={<Email />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;