import appEnums from "../_components/dashboard/enums";
import { ShowEmptyMsg, SingleGridItem, SingleInfo } from "./Common";

interface LoanViewProps {
  data: any;
  action?: React.ReactNode;
}
export default function ShowBankInfo({ data, action }: LoanViewProps) {
  console.log("PI", data);
  if (data == null) {
    return <ShowEmptyMsg />;
  }
  return (
    <div>
      <SingleGridItem title="Banking Information" action={action}>
        <SingleInfo
          title="Have Bank Account"
          text={data?.haveBankAccount ? "Yes" : "No"}
        />
        <SingleInfo
          title="Account Type"
          text={
            appEnums?.[data?.bankingAccountType] ??
            data?.bankingAccountType ??
            "-"
          }
        />
        <SingleInfo title="Bank Name" text={data?.bankName ?? "-"} />
        <SingleInfo title="Account Number" text={data?.accountNumber ?? "-"} />
        <SingleInfo title="Routing Number" text={data?.routingNumber ?? "-"} />
        <SingleInfo
          title="Checking Balance"
          text={`$${data?.checkingBalance ?? "0"}`}
        />
        <SingleInfo
          title="Saving Balance"
          text={`$${data?.savingBalance ?? "0"}`}
        />
        <SingleInfo title="Other Balance" text={`$${data?.other ?? "0"}`} />
      </SingleGridItem>
    </div>
  );
}
