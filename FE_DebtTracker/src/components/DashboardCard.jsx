const DashboardCard = ({ title, amount, color, icon }) => {
  return (
    <div style={{
      height: "130px",
      background: color,
      color: "white",
      borderRadius: "14px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
    }}>
      
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ 
          fontSize: "16px", 
          fontWeight: "600", 
          textTransform: "uppercase" 
        }}>
          {title}
        </h3>
        {icon}
      </div>

      <h1 style={{ fontSize: "26px", fontWeight: "bold" }}>
        {amount}
      </h1>
    </div>
  );
};

export default DashboardCard;