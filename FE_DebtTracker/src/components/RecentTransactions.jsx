import React from "react";

const RecentTransactions = ({ transactions = [] }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        height: "320px",
        overflow: "auto",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>Recent Transactions</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((t, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #f1f1f1" }}>
                <td style={tdStyle}>{t.name}</td>

                <td
                  style={{
                    ...tdStyle,
                    color:
                      t.type === "LEND"
                        ? "#16A34A"
                        : t.type === "BORROW"
                        ? "#DC2626"
                        : "#64748B",
                    fontWeight: 600,
                  }}
                >
                  {t.type}
                </td>

                <td style={tdStyle}>₹{t.amount}</td>

                <td style={tdStyle}>{t.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  textAlign: "left",
  padding: "10px",
  fontSize: "14px",
  color: "#64748B",
};

const tdStyle = {
  padding: "10px",
  fontSize: "14px",
};

export default RecentTransactions;
