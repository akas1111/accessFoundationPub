import { FormLabel, Typography } from "@mui/material";
import {
  HTMLInputTypeAttribute,
  HTMLProps,
  ReactNode,
  SyntheticEvent,
} from "react";
import { MyFormLabel } from "./Common";
import { IconInfoCircleFilled } from "@tabler/icons-react";

interface MyProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  register?: any;
  error?: any;
  validation?: any;
  helpText?: string;
  disableMb?: boolean; //disable margin btm
  preElement?: ReactNode;
}
export default function MyTextInput({
  label = undefined,
  name,
  register = () => {},
  error,
  validation,
  helpText = undefined,
  disableMb = false,
  required = false,
  preElement,
  ...props
}: MyProps) {
  return (
    // <div className={disableMb ? "" : "mb-3"}>
    //   {label && <MyFormLabel required={required}>{label}</MyFormLabel>}
    //   <input
    //     {...props}
    //     {...register(name, validation)}
    //     style={{ height: 40 }}
    //   />
    //   {helpText && (
    //     <Typography variant="body2" color="text.secondary" sx={{ pt: 0.5 }}>
    //       {helpText ?? ""}
    //     </Typography>
    //   )}
    //   {error && (
    //     <Typography variant="body2" color="error.dark" sx={{ pt: 0.5 }}>
    //       {error?.message ?? ""}
    //     </Typography>
    //   )}
    // </div>
    <div className="mb-3">
      {label && <MyFormLabel required={required}>{label}</MyFormLabel>}
      <div className="input-group">
        {preElement && (
          <button
            className={`btn btn-text border ${error ? "border-danger" : ""}`}
            type="button"
            tabIndex={-1}
            style={{
              height: 46,
              minWidth: 40,
              pointerEvents: "none",
              fontWeight: 500,
            }}
          >
            {preElement}
          </button>
        )}
        <input
          {...props}
          className={`form-control ${error ? "is-invalid" : ""}`}
          {...register(name, validation)}
          style={{ height: 46 }}
          onWheel={(e: SyntheticEvent) => (e.target as HTMLInputElement).blur()}
        />
      </div>
      {helpText && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ pt: 0.5 }}
          className="d-flex align-items-center gap-1"
        >
          <IconInfoCircleFilled size={18} /> {helpText ?? ""}
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error.dark" sx={{ pt: 0.5 }}>
          {error?.message ?? ""}
        </Typography>
      )}
    </div>
  );
}
