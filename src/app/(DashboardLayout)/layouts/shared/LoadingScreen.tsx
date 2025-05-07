import { LinearProgress, Typography } from "@mui/material";

export default function LoadingScreen({ text }: { text: string }) {
  return (
    <div className="loading-screen">
      <div>
        <img src="/Axcess-Foundation.png" width={240} className="mb-3" />
        <Typography variant="h5" className="mb-2">
          {text}
        </Typography>
        <LinearProgress
          sx={{ maxWidth: 320, width: "90%", borderRadius: 15 }}
        />
      </div>
    </div>
  );
}
