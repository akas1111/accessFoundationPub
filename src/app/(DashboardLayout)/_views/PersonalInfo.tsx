import { formatAddress } from "@/utils/helper";
import appEnums from "../_components/dashboard/enums";
import { ShowEmptyMsg, SingleGridItem, SingleInfo } from "./Common";

interface LoanViewProps {
  data: any;
  action?: React.ReactNode;
  action2?: React.ReactNode;
}
export default function ShowPersonalInfo({
  data,
  action,
  action2,
}: LoanViewProps) {
  console.log("PI", data);
  if (data == null) {
    return <ShowEmptyMsg />;
  }
  return (
    <div>
      <SingleGridItem title="Personal Information" action={action}>
        <SingleInfo title="First Name" text={data?.firstName ?? "-"} />
        <SingleInfo title="Middle Name" text={data?.middleName ?? "-"} />
        <SingleInfo title="Last Name" text={data?.lastName ?? "-"} />
      </SingleGridItem>
      <SingleGridItem title="Contact Information">
        <SingleInfo
          title="Address"
          text={formatAddress(data?.address, data?.addressLine2) ?? "-"}
        />
        <SingleInfo title="Phone Number" text={data?.phoneNumber ?? "-"} />
        <SingleInfo title="Email" text={data?.email ?? "-"} />
      </SingleGridItem>
      <SingleGridItem title="Other Information" action={action2}>
        <SingleInfo
          title="Type of Residence"
          text={
            appEnums?.[data?.typeOfResidence] ?? data?.typeOfResidence ?? "-"
          }
        />
        <SingleInfo
          title="Years in Residence"
          text={`${data?.yearsInResidence ?? "0"} years`}
        />
        <SingleInfo
          title="Civil Status"
          text={appEnums?.[data?.civilStatus] ?? data?.civilStatus ?? "-"}
        />

        <SingleInfo
          title="Number of Dependents"
          text={data?.numberOfDependents ?? "-"}
        />
        <SingleInfo
          title="Monthly Rent"
          text={`$${data?.monthlyRent ?? "0"}`}
        />
        <SingleInfo
          title="Total Monthly Expenses"
          text={`$${data?.totalMonthlyExpenses ?? "0"}`}
        />
      </SingleGridItem>
    </div>
  );
}
