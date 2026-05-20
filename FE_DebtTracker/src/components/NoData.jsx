import { Box, Typography, Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

export const NoData = ({ onAdd }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        color: "gray",
      }}
    >
      <InboxIcon sx={{ fontSize: 60, mb: 2 }} />

      <Typography variant="h6">No Data Found</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        You haven’t added any persons yet.
      </Typography>

      <Button variant="contained" onClick={onAdd}>
        + Add Person
      </Button>
    </Box>
  );
};
