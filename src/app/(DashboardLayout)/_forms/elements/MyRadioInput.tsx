import { FormLabel, Typography } from "@mui/material";
import { HTMLProps } from "react";
import { MyFormLabel } from "./Common";

type RadioFieldProps = {
  label: string;
  value: string;
  disabled?: boolean;
};

// interface MyProps extends HTMLProps<HTMLInputElement> {
//   label?: string;
//   register?: any;
//   error?: any;
//   validation?: any;
//   fields: RadioFieldProps[];
//   vertical?: boolean;
//   locked?: boolean;
// }
// export default function MyRadioInput({
//   type,
//   label = undefined,
//   name,
//   register = () => {},
//   error,
//   validation,
//   fields = [],
//   vertical = false,
//   required = false,
//   locked = false,
//   ...props
// }: MyProps) {
//   return (
//     <div className="mb-3">
//       {label && <MyFormLabel required={required}>{label ?? ""}</MyFormLabel>}
//       <div
//         //className="d-flex"
//         className={`d-flex ${locked === true ? "disabled-div" : ""}`}
//         style={{
//           columnGap: 12,
//           rowGap: 10,
//           flexWrap: "wrap",
//           flexDirection: vertical ? "column" : "row",
//         }}
//       >
//         {fields?.map((item, index) => (
//           <div
//             className="d-flex align-items-center"
//             style={{
//               gap: 8,
//               border: "1px solid #ced4da",
//               padding: 10,
//               borderRadius: 6,
//             }}
//             key={item?.label + " " + index}
//           >
//             <input
//               type="radio"
//               {...props}
//               id={`${name}-id-${index}`}
//               value={item?.value}
//               {...register(name, validation)}
//             />
//             <FormLabel htmlFor={`${name}-id-${index}`}>
//               <Typography
//                 variant="body1"
//                 //sx={{ color: "#2A3547" }}
//                 color="text.primary"
//               >
//                 {item?.label}
//               </Typography>
//             </FormLabel>
//           </div>
//         ))}
//       </div>
//       {error && (
//         <Typography variant="body2" color="error.dark" sx={{ pt: 0.5 }}>
//           {error?.message ?? ""}
//         </Typography>
//       )}
//     </div>
//   );
// }
interface TextDisplayProps extends HTMLProps<HTMLInputElement> {
  register?: any;
  validation?: any;
  error?: any;
}
interface MyProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  register?: any;
  error?: any;
  validation?: any;
  fields: RadioFieldProps[];
  vertical?: boolean;
  locked?: boolean;
  displayProps?: TextDisplayProps;
}
export default function MyRadioInput({
  type,
  label = undefined,
  name,
  register = () => {},
  error,
  validation,
  fields = [],
  vertical = false,
  required = false,
  locked = false,
  displayProps,
  ...props
}: MyProps) {
  const {
    register: regDisplay,
    name: disName,
    validation: disRules,
    ...remProps
  } = displayProps ?? {};
  return (
    <div className="mb-3">
      {label && <MyFormLabel required={required}>{label ?? ""}</MyFormLabel>}
      {displayProps && (
        <>
          <input
            placeholder={label ?? ""}
            type="text"
            className={`form-control mb-2 ${
              displayProps?.error ? "is-invalid" : ""
            }`}
            {...remProps}
            {...(regDisplay != null
              ? { ...regDisplay(disName, disRules) }
              : {})}
            style={{ height: 44 }}
          />
          {/* {displayProps?.error && (
            <Typography variant="body2" color="error.dark" sx={{ pb: 0.5 }}>
              {displayProps?.error?.message ?? ""}
            </Typography>
          )} */}
        </>
      )}

      <div
        //className="d-flex"
        className={`d-flex ${locked === true ? "disabled-div" : ""}`}
        style={{
          columnGap: 12,
          rowGap: 10,
          flexWrap: "wrap",
          //flexDirection: vertical ? "column" : "row",
        }}
      >
        {fields?.map((item, index) => (
          <div
            className="d-flex align-items-center"
            style={{
              gap: 8,
              //border: "1px solid #ced4da",
              //padding: 10,
              borderRadius: 6,
            }}
            key={item?.label + " " + index}
          >
            <input
              type="radio"
              {...props}
              id={`${name}-id-${index}`}
              value={item?.value}
              {...register(name, validation)}
              style={{ width: 18, height: 18 }}
              disabled={item?.disabled ?? false}
            />
            <FormLabel htmlFor={`${name}-id-${index}`}>
              <Typography
                variant="body1"
                //sx={{ color: "#2A3547" }}
                color="text.primary"
              >
                {item?.label}
              </Typography>
            </FormLabel>
          </div>
        ))}
      </div>
      {error && (
        <Typography variant="body2" color="error.dark" sx={{ pt: 0.5 }}>
          {error?.message ?? ""}
        </Typography>
      )}
    </div>
  );
}
