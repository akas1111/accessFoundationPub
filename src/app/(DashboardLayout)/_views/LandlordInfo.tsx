import { formatAddress } from "@/utils/helper";
import { ShowEmptyMsg, SingleGridItem, SingleInfo } from "./Common";
interface LoanViewProps {
  data: any;
  action?: React.ReactNode;
}
export default function ShowLandlordInfo({ data, action }: LoanViewProps) {
  console.log("PI", data);
  if (data == null) {
    return <ShowEmptyMsg />;
  }
  return (
    <div>
      <SingleGridItem title="Landlord Information" action={action}>
        <SingleInfo
          title="Landlord or Company"
          text={data?.landlordOrCompanyName ?? "-"}
        />
        <SingleInfo
          title="Address"
          text={formatAddress(data?.address, data?.addressTwo) ?? "-"}
        />
        <SingleInfo title="Phone Number" text={data?.phoneNumber ?? "-"} />
        <SingleInfo title="Email" text={data?.email ?? "-"} />
        <SingleInfo title="Manager Name" text={data?.managerName ?? "-"} />
      </SingleGridItem>
    </div>
  );
}
