import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PaymentIcon from "@mui/icons-material/Payment";
import EmailIcon from "@mui/icons-material/Email";
import AssessmentIcon from "@mui/icons-material/Assessment";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { name: "Persons", path: "/persons", icon: <PeopleIcon /> },
    { name: "Transactions", path: "/transactions", icon: <SwapHorizIcon /> },
    { name: "Payments", path: "/payments", icon: <PaymentIcon /> },
    { name: "Email", path: "/email", icon: <EmailIcon /> },
    { name: "Reports", path: "/reports", icon: <AssessmentIcon /> }
  ];

  return (
    <div style={{
      width: "250px",
      height: "100vh",
      background: "#0F172A",
      color: "white",
      padding: "20px"
    }}>
      <h2 style={{ marginBottom: "30px" }}>💰 DebtTracker</h2>

      {menu.map((item) => {
        const active = location.pathname === item.path;

        return (
          <Link
            key={item.name}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              background: active ? "#1E293B" : "transparent",
              color: active ? "white" : "#94A3B8",
              textDecoration: "none"
            }}
          >
            {item.icon}
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;