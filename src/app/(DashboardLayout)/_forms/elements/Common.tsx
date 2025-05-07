import { Button, CircularProgress, FormLabel, Typography } from "@mui/material";

type LBProps = {
  loading?: boolean;
  disabled?: boolean;
  title: string;
};
export default function MyLoadingButton({ loading, title, disabled }: LBProps) {
  return (
    <>
      {/* <button
        className="btn btn-primary d-flex justify-content-center align-items-center"
        disabled={loading || disabled}
        style={{ minWidth: 180, height: 42, gap: 10 }}
      >
        {loading && <CircularProgress size={20} sx={{ color: "#fff" }} />}
        {title}
      </button> */}
      <Button
        variant="contained"
        style={{ minWidth: 180, fontWeight: 600, gap: 10, height: 46 }}
        disabled={loading || disabled}
        type="submit"
      >
        {loading && <CircularProgress size={20} sx={{ color: "#fff" }} />}
        {title}
      </Button>
    </>
  );
}
export function BackButton({
  hidden = false,
  onClick,
}: {
  hidden?: boolean;
  onClick?: () => void;
}) {
  return (
    // <button
    //   type="button"
    //   className="btn btn-light"
    //   onClick={onClick}
    //   style={{
    //     minWidth: 90,
    //     height: 42,
    //     gap: 10,
    //     opacity: hidden ? 0 : 1,
    //     pointerEvents: hidden ? "none" : "auto",
    //     backgroundColor: "#fff",
    //   }}
    // >
    //   Back
    // </button>
    <Button
      onClick={onClick}
      variant="contained"
      color="inherit"
      sx={{ bgcolor: "#fff", color: "#555" }}
      style={{
        minWidth: 90,
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        fontWeight: 600,
        height: 46,
      }}
    >
      Back
    </Button>
  );
}

export function MyFormLabel({
  children,
  style = {},
  required,
}: {
  children: React.ReactNode;
  style?: any;
  required?: boolean;
}) {
  return (
    <FormLabel
      sx={{
        mb: 1,
        display: "block",
        fontWeight: 600,
        color: "text.primary",
        ...style,
      }}
    >
      {children}
      {required && <span className="text-danger">*</span>}
    </FormLabel>
  );
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <Typography className="mb-3" variant="h4">
      {title}
    </Typography>
  );
}

export function SecSectionTitle({ title }: { title: string }) {
  return (
    <Typography className="mb-3" variant="h5">
      {title}
    </Typography>
  );
}
// export function InputPrefixBtn({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <button
//       className={`btn btn-text border ${className}`}
//       type="button"
//       style={{
//         height: 40,
//         minWidth: 40,
//         pointerEvents: "none",
//         fontWeight: 500,
//       }}
//     >
//       {children}
//     </button>
//   );
// }
