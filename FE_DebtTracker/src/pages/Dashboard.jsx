import DashboardCard from "../components/DashboardCard";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

// ✅ Dummy data
const data = [
  { name: "Jan", amount: 4000 },
  { name: "Feb", amount: 3000 },
  { name: "Mar", amount: 5000 },
  { name: "Apr", amount: 2000 }
];

// ✅ THIS WAS MISSING
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <DashboardCard
          title="TOTAL LENT"
          amount="₹25,000"
          color="#22C55E"
          icon={<TrendingUpIcon />}
        />
        <DashboardCard
          title="TOTAL BORROW"
          amount="₹15,000"
          color="#EF4444"
          icon={<TrendingDownIcon />}
        />
        <DashboardCard
          title="PENDING"
          amount="₹8,000"
          color="#F59E0B"
          icon={<HourglassBottomIcon />}
        />
        <DashboardCard
          title="NET BALANCE"
          amount="₹10,000"
          color="#3B82F6"
          icon={<AccountBalanceWalletIcon />}
        />
      </div>

      {/* GRAPH + TABLE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "30px"
        }}
      >
        {/* GRAPH */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            height: "320px"
          }}
        >
          <h3>Transaction Overview</h3>

          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* TABLE */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            height: "320px"
          }}
        >
          <h3>Recent Transactions</h3>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Type</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>Ravi</td>
                <td style={{ padding: "10px", color: "green" }}>LENT</td>
                <td style={{ padding: "10px" }}>₹500</td>
                <td style={{ padding: "10px" }}>12 Apr</td>
              </tr>

              <tr>
                <td style={{ padding: "10px" }}>Anita</td>
                <td style={{ padding: "10px", color: "red" }}>BORROW</td>
                <td style={{ padding: "10px" }}>₹1000</td>
                <td style={{ padding: "10px" }}>10 Apr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;