import { Divider, Typography } from "@mui/material";
import ShowPersonalInfo from "../../_views/PersonalInfo";
import ShowLoanInfo from "../../_views/LoanDetails";
import ShowEmploymentInfo from "../../_views/EmploymentInfo";
import { IconCheckbox, IconEdit } from "@tabler/icons-react";
import ShowBusinessInfo from "../../_views/BusinessInfo";
import ShowLandlordInfo from "../../_views/LandlordInfo";
import { uploadDocumentList } from "./Documents";
import BlankCard from "../../_components/shared/BlankCard";
import ShowSavingProgram from "../../_views/SavingProgramInfo";
import ShowBankInfo from "../../_views/BankInfo";

export default function FormPreview({ loanData, steps, gotoStep }: any) {
  console.log("preview:", loanData);

  const stepsMap = steps.reduce(function (o: any, item: any, index: number) {
    o[item?.id] = index;
    return o;
  }, {});
  return (
    <div className="mb-3">
      <Typography variant="h5" className="mb-3">
        Review your details
      </Typography>
      {loanData?.savingProgram != null && (
        <ShowSavingProgram
          data={loanData?.savingProgram ?? null}
          action={
            <EditAction
              onPress={() => {
                gotoStep(stepsMap?.["0"]);
              }}
            />
          }
        />
      )}
      {loanData?.customerApplication?.loanInformation !== "SAVING_PROGRAM" && (
        <ShowLoanInfo
          data={loanData?.customerApplication ?? null}
          action={
            <EditAction
              onPress={() => {
                gotoStep(stepsMap?.["1"]);
              }}
            />
          }
        />
      )}
      <ShowPersonalInfo
        data={loanData?.personalInformation ?? null}
        action={
          <EditAction
            onPress={() => {
              gotoStep(stepsMap?.["2"]);
            }}
          />
        }
        action2={
          <EditAction
            onPress={() => {
              gotoStep(stepsMap?.["3"]);
            }}
          />
        }
      />
      <ShowEmploymentInfo
        data={loanData?.employmentInformation ?? null}
        action={
          <EditAction
            onPress={() => {
              gotoStep(stepsMap?.["4"]);
            }}
          />
        }
      />
      {loanData?.landlordInformation && (
        <ShowLandlordInfo
          data={loanData?.landlordInformation}
          action={
            <EditAction
              onPress={() => {
                gotoStep(stepsMap?.["5"]);
              }}
            />
          }
        />
      )}
      {loanData?.smallBusinessLoanInformation && (
        <ShowBusinessInfo
          data={loanData?.smallBusinessLoanInformation ?? null}
          action={
            <EditAction
              onPress={() => {
                gotoStep(stepsMap?.["6"]);
              }}
            />
          }
        />
      )}
      <ShowBankInfo
        data={loanData?.bankingInformation ?? null}
        action={
          <EditAction
            onPress={() => {
              gotoStep(stepsMap?.["7"]);
            }}
          />
        }
      />
      {loanData?.documentUpload && (
        <ShowDocuments data={loanData?.documentUpload} />
      )}
    </div>
  );
}
const EditAction = ({ onPress }: { onPress: () => void }) => {
  return (
    <button
      className="btn btn-link"
      onClick={() => {
        onPress();
      }}
    >
      <IconEdit size={15} /> Edit
    </button>
  );
};

const ShowDocuments = ({ data }: { data: any }) => {
  return (
    <div className="mb-4">
      <BlankCard className="p-3">
        <div className="d-flex align-items-center justify-content-between">
          <Typography variant="h6">Uploaded Documents</Typography>
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
        <div
          className="m-0 d-flex flex-wrap"
          style={{ columnGap: 8, rowGap: 14 }}
        >
          {uploadDocumentList?.map((item, index) => {
            if (data?.[item?.id])
              return (
                <div
                  className="px-3 py-2 border mt-1"
                  style={{ borderRadius: 5 }}
                  key={index + " " + item?.id}
                >
                  <IconCheckbox style={{ color: "green" }} size={20} />{" "}
                  {item?.label}
                </div>
              );
          })}
        </div>
      </BlankCard>
    </div>
  );
};
