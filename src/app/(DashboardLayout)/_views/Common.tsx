import { Divider, Typography } from "@mui/material";
import { ReactNode } from "react";
import BlankCard from "../_components/shared/BlankCard";

export function SingleGridItem({
  children,
  title,
  action,
}: {
  children: ReactNode;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4">
      <BlankCard className="p-3">
        <div className="d-flex align-items-center justify-content-between">
          <Typography variant="h6">{title}</Typography>
          <div>{action}</div>
        </div>
        <Divider
          className="my-2"
          sx={{
            //width: 80,
            borderColor: "#5D87FF",
            borderWidth: 1,
            opacity: 0.5,
          }}
        />
        {/* <div
          className="m-0 ps-2 d-flex flex-wrap justify-content-between"
          style={{ columnGap: 8, rowGap: 16 }}
        > */}
        <div
          className="m-0 d-flex flex-wrap"
          style={{ columnGap: 8, rowGap: 14 }}
        >
          {children}
        </div>
      </BlankCard>
    </div>
  );
}

export function SingleInfo({ title, text }: { title: string; text: string }) {
  return (
    // <li className="d-flex border-bottom" style={{ gap: 6, padding: "0.5rem" }}>
    //   <Typography variant="body1" sx={{ fontWeight: 500 }}>
    //     {title}
    //   </Typography>
    //   <Typography>{text}</Typography>
    // </li>
    <div
      className="flex-1"
      style={{ gap: 5, padding: "0.25rem", minWidth: 180 }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }} color="grey.500">
        {title}
      </Typography>
      <Typography variant="h6" style={{ paddingLeft: 6 }}>
        {text}
      </Typography>
    </div>
  );
}

export function ShowEmptyMsg() {
  return (
    <div className="border p-3">
      <Typography>
        No data available. It seems the user hasn&apos;t provided this
        information yet.
      </Typography>
    </div>
  );
}
