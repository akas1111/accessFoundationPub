import appEnums from "../_components/dashboard/enums";
import { ShowEmptyMsg, SingleGridItem, SingleInfo } from "./Common";
interface LoanViewProps {
  data: any;
  action?: React.ReactNode;
}
export default function ShowSavingProgram({ data, action }: LoanViewProps) {
  console.log("PI", data);
  if (data == null) {
    return <ShowEmptyMsg />;
  }
  return (
    <div>
      <SingleGridItem title="Saving Program Information" action={action}>
        <SingleInfo
          title="Have Emergency Saving"
          text={data?.haveEmergencySaving ? "Yes" : "No"}
        />
        <SingleInfo
          title="Saving per Month"
          text={`$${data?.savePerMonth ?? "0"}`}
        />
        <SingleInfo
          title="Saving Account"
          text={appEnums?.[data?.savingAccount] ?? data?.savingAccount ?? "-"}
        />
        <SingleInfo
          title="Target Months"
          text={appEnums?.[data?.targetMonth] ?? data?.targetMonth ?? "-"}
        />
      </SingleGridItem>
    </div>
  );
}
