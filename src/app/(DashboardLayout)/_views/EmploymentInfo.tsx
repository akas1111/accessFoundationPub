import { formatAddress } from "@/utils/helper";
import appEnums from "../_components/dashboard/enums";
import { ShowEmptyMsg, SingleGridItem, SingleInfo } from "./Common";

interface LoanViewProps {
  data: any;
  action?: React.ReactNode;
}
export default function ShowEmploymentInfo({ data, action }: LoanViewProps) {
  console.log("PI", data);
  if (data == null) {
    return <ShowEmptyMsg />;
  }
  return (
    <div>
      <SingleGridItem title="Employment Information" action={action}>
        <SingleInfo
          title="Source of Income"
          text={appEnums?.[data?.sourceOfIncome] ?? data?.sourceOfIncome ?? "-"}
        />
        <SingleInfo title="Occupation" text={data?.occupation ?? "-"} />
        <SingleInfo
          title="Job Position/Title"
          text={data?.jobPositionTitle ?? "-"}
        />
        <SingleInfo
          title="Years with the Company"
          text={data?.yearsWithCompany ?? "-"}
        />
        <SingleInfo title="Company Name" text={data?.companyName ?? "-"} />
        <SingleInfo
          title="Company Address"
          text={formatAddress(data?.companyAddress, data?.addressTwo) ?? "-"}
        />
        <SingleInfo
          title="Monthly Gross Income"
          text={`$${data?.monthlyGrossIncome ?? "0"}`}
        />
        <SingleInfo
          title="Previous Employment"
          text={data?.previousEmployment ?? "-"}
        />
      </SingleGridItem>
    </div>
  );
}
