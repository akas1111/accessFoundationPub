import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      className="p-3 d-flex justify-content-between"
      sx={{
        bgcolor: "primary.light",
        borderTop: "1px solid #eee",
        position: "fixed",
        bottom: 0,
        width: "100%",
        left: 0,
        zIndex: 9999,
      }}
    >
      <Typography color="grey.500">2025 &copy; AxcessFoundation</Typography>
      <Typography color="grey.500">
        Designed & Developed by{" "}
        <a
          href="#"
          target="_blank"
          style={{ fontWeight: 500, textDecoration: "none" }}
        >
          Nepbrain
        </a>
      </Typography>
    </Box>
  );
}
