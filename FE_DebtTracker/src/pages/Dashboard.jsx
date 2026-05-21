import DashboardCard from "../components/DashboardCard";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import API from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard = () => {
  const [tab, setTab] = useState("LEND");
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [chartData, setChartData] = useState([]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const fetchDashboardData = async (type) => {
    try {
      const res = await API.get("/dashboard", {
        params: { type: type },
      });
      setSummary(res.data.summary[0]);
      setTransactions(res.data.recentTransactions || []);
      setChartData(res.data.summary || []);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchDashboardData(tab);
  }, [tab]);
  const formattedChartData = chartData.map((item) => ({
    name: item.month,
    amount: item.monthlyAmount,
  }));
  return (
    <div>
      <h1>Dashboard</h1>
      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: "none" } }} // remove default underline
          sx={{
            background: "#f1f3f4",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <Tab
            label="LEND"
            value={"LEND"}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              mx: 0.5,
              minHeight: "40px",
              "&.Mui-selected": {
                backgroundColor: "#ffffff",
              },
            }}
          />
          <Tab
            label="BORROW"
            value={"BORROW"}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              mx: 0.5,
              minHeight: "40px",
              "&.Mui-selected": {
                backgroundColor: "#ffffff",
              },
            }}
          />
        </Tabs>
      </Box>
      {tab === "LEND" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <DashboardCard
              title="TOTAL LEND"
              amount={summary?.totalAmount || 0}
              color="#12b76a"
              icon={<TrendingUpIcon />}
            />

            <DashboardCard
              title="TOTAL RECEIVED"
              amount={summary?.settledAmount || 0}
              color="#155eef"
              icon={<AccountBalanceWalletIcon />}
            />

            <DashboardCard
              title="TOTAL PENDING"
              amount={summary?.totalPending || 0}
              color="#f80"
              icon={<HourglassBottomIcon />}
            />
          </div>
        </>
      )}
      {tab === "BORROW" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <DashboardCard
            title="TOTAL BORROW"
            amount={summary?.totalAmount || 0}
            color="#DC2626"
            icon={<TrendingDownIcon />}
          />

          <DashboardCard
            title="TOTAL PAID"
            amount={summary?.settledAmount || 0}
            color="#12b76a"
            icon={<AccountBalanceWalletIcon />}
          />

          <DashboardCard
            title="TOTAL PENDING"
            amount={summary?.totalPending || 0}
            color="#f80"
            icon={<HourglassBottomIcon />}
          />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            height: "320px",
          }}
        >
          <h3>Transaction Overview</h3>

          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={formattedChartData}>
              <XAxis dataKey="name" />
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
        {transactions.length > 0 && (
          <>
            <RecentTransactions transactions={transactions} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
