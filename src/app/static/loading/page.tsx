import { CircularProgress } from "@mui/material";

export default function LoadingForFrame() {
  return (
    <div className="d-flex p-2 justify-content-center py-4">
      <CircularProgress />
    </div>
  );
}
