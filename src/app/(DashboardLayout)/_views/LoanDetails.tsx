import { Divider, Typography } from "@mui/material";
import { SingleGridItem, SingleInfo } from "./Common";
import appEnums from "../_components/dashboard/enums";
import axios from "axios";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/UserContext";
import { USER } from "@/utils/endpoints";

interface LoanViewProps {
  data: any;
  action?: React.ReactNode;
  showSign?: boolean;
}
export default function ShowLoanInfo({
  data,
  action,
  showSign = false,
}: LoanViewProps) {
  console.log("PI", data);
  console.log("loan info:", action);
  return (
    <div>
      <SingleGridItem title="Loan Information" action={action}>
        <SingleInfo
          title="Loan Type"
          text={
            appEnums?.[data?.loanInformation] ?? data?.loanInformation ?? "-"
          }
        />
        <SingleInfo
          title="Requested Amount"
          text={`$${data?.loanAmountRequested ?? "0"}`}
        />
        <SingleInfo
          title="Loan Term"
          text={appEnums?.[data?.loanTerm] ?? data?.loanTerm ?? "-"}
        />
        <SingleInfo
          title="Loan Purpose"
          text={appEnums?.[data?.purposeOfLoan] ?? data?.purposeOfLoan ?? "-"}
        />
        <SingleInfo title="Reason for Loan" text={data?.reasonForLoan ?? "-"} />
      </SingleGridItem>
      {showSign === true && data?.signature && (
        <div className="mt-3">
          <CustomerSignature signToken={data?.signature} />
        </div>
      )}
    </div>
  );
}

const CustomerSignature = ({ signToken }: { signToken: string }) => {
  const { at }: any = getUserData();
  const [file, setFile] = useState<{ src: string; fileType: string } | null>(
    null
  );
  useEffect(() => {
    const loadDoc = async (docToken: string) => {
      try {
        const resp = await axios.get(USER.getFileUrl, {
          params: {
            token: docToken,
          },
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        console.log(resp);
        const fileData = resp?.data?.data ?? null;
        if (fileData) {
          setFile({
            src: fileData?.file ?? null,
            fileType: fileData?.fileType ?? "",
          });
          console.log(fileData);
        }
      } catch (e) {
        console.log("Unable to load signature.");
      }
    };
    loadDoc(signToken);
  }, []);
  if (file?.fileType === "IMAGE") {
    return (
      <div className="mt-2 mb-3">
        <Typography variant="h6" className="mb-2">
          Your Signature
        </Typography>
        <img
          src={file?.src}
          alt="Signature"
          width={200}
          className="border"
          draggable={false}
        />
      </div>
    );
  } else {
    return <></>;
  }
};
