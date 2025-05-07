import { Chip, Collapse, Divider, Typography } from "@mui/material";
import { ShowEmptyMsg, SingleGridItem, SingleInfo } from "./Common";
import { useState } from "react";
import {
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons-react";
import BlankCard from "../_components/shared/BlankCard";

export default function ShowPlaidData({ data }: any) {
  console.log("PI", data);
  if (data == null) {
    return <ShowEmptyMsg />;
  }
  return (
    <div>
      {/* <SingleGridItem title="Plaid Identity Verification Data">
        <SingleInfo title="Name" text={data?.name?.summary ?? "-"} />
        <SingleInfo title="Address" text={data?.address?.summary ?? "-"} />
        <SingleInfo
          title="Date of Birth"
          text={data?.date_of_birth?.summary ?? "-"}
        />
        <SingleInfo title="ID Number" text={data?.id_number?.summary ?? "-"} />

        <SingleInfo
          title="Phone Number"
          text={data?.phone_number?.summary ?? "-"}
        />
      </SingleGridItem> */}
      <BlankCard>
        <div className="">
          <div className="d-flex p-4 justify-content-between align-items-center">
            <Typography variant="h5">Plaid Verification</Typography>
            <span className="badge bg-success"></span>
            <Chip
              label={data?.status}
              color={getChipColor(data?.status ?? "N/A")}
              //sx={{ bgcolor: getChipColor(data?.status ?? "N/A") }}
              className="text-uppercase"
            />
          </div>
          <SinglePlaidData
            field="Name"
            data={data?.name ?? null}
            // details={[
            //   { title: "First Name", status: "match" },
            //   { title: "Last Name", status: "match" },
            // ]}
          />
          <SinglePlaidData
            field="Address"
            data={data?.address ?? null}
            details={[
              { title: "PO Box", status: data?.address?.po_box },
              { title: "Address Type", status: data?.address?.type },
            ]}
          />
          <SinglePlaidData
            field="Date of Birth"
            data={data?.date_of_birth ?? null}
          />
          <SinglePlaidData field="ID Number" data={data?.id_number ?? null} />
          <SinglePlaidData
            field="Phone Number"
            data={data?.phone_number ?? null}
            details={[
              {
                title: "Area Code",
                status: data?.phone_number?.area_code,
              },
            ]}
            lastItem
          />
        </div>
      </BlankCard>
    </div>
  );
}

const SinglePlaidData = ({ field, data, details, lastItem = false }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const hasDetails = details && details?.length > 0;
  return (
    <div className={`${lastItem === true ? "" : "border-bottom"}`}>
      <div
        className="d-flex justify-content-between align-items-center bg-light p-3"
        onClick={() => {
          if (hasDetails) {
            setOpen(!open);
          }
        }}
      >
        <div className="d-flex align-items-center">
          <div className="">
            {open ? (
              <IconChevronDown />
            ) : (
              <IconChevronRight
                color={hasDetails ? "currentcolor" : "#a1a1a1"}
              />
            )}
          </div>
          <div className="p-2">
            <Typography variant="h6">{field}</Typography>
          </div>
        </div>
        <div>
          <Chip
            label={statusMap?.[data?.summary] ?? "N/A"}
            // sx={{
            //   borderColor: getChipColor(data?.summary ?? "N/A"),
            //   color: getChipColor(data?.summary ?? "N/A"),
            // }}
            color={getChipColor(data?.summary ?? "N/A")}
            size="small"
            //variant="outlined"
          />
        </div>
      </div>
      {hasDetails && (
        <Collapse in={open}>
          <ul
            className="my-3 list-unstyled"
            style={{ maxWidth: "80%", margin: "0px auto" }}
          >
            {details?.map((item: any, index: number) => (
              <li
                className=" p-2 d-flex justify-content-between"
                key={index + " " + item?.title}
              >
                <Typography>{item?.title ?? "-"}</Typography>
                <div>
                  <Chip
                    label={statusMap?.[item?.status] ?? "N/A"}
                    color={getChipColor(item?.status ?? "N/A")}
                    // sx={{
                    //   bgcolor: getChipColor(item?.status ?? "N/A"),
                    //   color: "#fff",
                    // }}
                    size="small"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Collapse>
      )}
    </div>
  );
};

const statusMap: any = {
  match: "Match",
  no_data: "No Data",
  no_match: "No Match",
  no: "No",
  commercial: "Commercial",
  residential: "Residential",
};

const getChipColor = (value: string = "") => {
  const chipColors: any = {
    success: "success",
    match: "success",
    no_data: "primary",
    no_match: "error",
    failed: "error",
    no: "error",
  };
  return chipColors?.[value] ?? "primary";
};
