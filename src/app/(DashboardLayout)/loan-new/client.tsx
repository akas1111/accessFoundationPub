import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import LoanInfo from "../_forms/loan-forms/LoanInfo";
import PersonalInfo from "../_forms/loan-forms/PersonalInfo";
import PersonalInfoContd from "../_forms/loan-forms/PersonalInfoNext";
import IncomeInfo from "../_forms/loan-forms/IncomeInfo";
import LandlordInformation from "../_forms/loan-forms/LandlordInfo";
import DocumentsUpload from "../_forms/loan-forms/Documents";
import ConfirmationStep from "../_forms/loan-forms/Confirmation";
import { Button, CircularProgress, Skeleton, Typography } from "@mui/material";
import SmallBusinessInfo from "../_forms/loan-forms/SmallBusiness";
import { useSearchParams } from "next/navigation";
import { USER } from "@/utils/endpoints";
import axios from "axios";
import { getUserData } from "@/utils/UserContext";
import { toast } from "react-toastify";
import BankingInfo from "../_forms/loan-forms/BankingInfo";
import SavingProgramInfo from "../_forms/loan-forms/SavingProgram";
import { useRouter } from "next/navigation";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      //   borderColor: "#784af4",
      //borderColor: "#2ecc71",
      borderColor: "#5D87FF",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      //   borderColor: "#784af4",#2ecc71
      //borderColor: "#2ecc71",
      borderColor: "#5D87FF",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    // borderColor: "#eaeaf0",
    //borderColor: "#eee",
    borderColor: "#ddd",
    borderTopWidth: 4,
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

// const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
//   ({ theme }) => ({
//     color: "#eaeaf0",
//     display: "flex",
//     height: 22,
//     alignItems: "center",
//     "& .QontoStepIcon-completedIcon": {
//       //   color: "#784af4",
//       color: "#2ecc71",
//       zIndex: 1,
//       fontSize: 20,
//     },
//     "& .QontoStepIcon-circle": {
//       width: 10,
//       height: 10,
//       borderRadius: "50%",
//       backgroundColor: "currentColor",
//     },
//     ...theme.applyStyles("dark", {
//       color: theme.palette.grey[700],
//     }),
//     variants: [
//       {
//         props: ({ ownerState }) => ownerState.active,
//         style: {
//           //   color: "#784af4",
//           color: "#2ecc71",
//         },
//       },
//     ],
//   })
// );

const steps = [
  {
    id: "0",
    stage: "SAVING_PROGRAM",
    label: "Saving Program",
    loanType: "SAVING_PROGRAM",
  },
  { id: "1", stage: "CUSTOMER_APPLICATION", label: "Loan Information" },

  { id: "2", stage: "PERSONAL_INFORMATION", label: "Personal Information" },
  {
    id: "3",
    stage: "PERSONAL_INFORMATION_SECONDPAGE",
    label: "Personal Information - Continue",
  },
  { id: "4", stage: "EMPLOYMENT_INFORMATION", label: "Employment Information" },
  {
    id: "5",
    stage: "LANDLORD_INFORMATION",
    label: "Landlord Information",
    loanType: "EMERGENCY_LOAN",
  },
  {
    id: "6",
    stage: "SMALL_BUSINESS_LOAN_INFORMATION",
    label: "Business Information",
    loanType: "SMALL_BUSINESS_LOAN",
  },
  { id: "7", stage: "BANKING_INFORMATION", label: "Banking Information" },
  { id: "8", stage: "DOCUMENT_UPLOAD", label: "Documents" },
  { id: "9", stage: "COMPLETE_INFORMATION", label: "Confirmation" },
];
export default function LoanFormSteppers() {
  const { at }: any = getUserData();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  //handle active step
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepId, setStepId] = useState<string | null>(null);
  //active application ID
  const [loanId, setLoanId] = useState<number | null>(null);
  //for continue
  const [lastStage, setLastStage] = useState<string | null>(null);
  //steps and data
  const [loanData, setLoanData] = useState<any>({});
  const [filteredSteps, setFilteredSteps] = useState<any[]>([]);

  const loanType = loanData?.customerApplication?.loanInformation;
  const quickEdit = loanData?.quickEdit ?? false;

  console.log(loanData, lastStage, stepId, loanType);

  useEffect(() => {
    //for new loan
    const typeOfLoan = searchParams.get("type");
    if (typeOfLoan && typeOfLoan?.length > 8) {
      const customerAppln: any = { loanInformation: typeOfLoan };
      if (typeOfLoan === "CREDIT_BUILDING_LOAN") {
        //set default
        customerAppln.loanAmountRequested = 250;
        customerAppln.purposeOfLoan = "CREDIT_BUILDING";
      }
      setLoanData((ld: any) => ({
        ...ld,
        customerApplication: customerAppln,
      }));
    }
    //for continue
    const lidx = searchParams.get("idx");
    const loanNum = parseInt(lidx ?? "");
    if (!isNaN(loanNum)) {
      const loadData = async () => {
        try {
          const resp = await axios.post(
            USER.loanDetailC,
            { id: loanNum },
            {
              headers: {
                Authorization: `Bearer ${at}`,
              },
            }
          );
          const allData = resp?.data?.data ?? null;
          if (allData) {
            const { stage, ...rest } = allData;
            setLastStage(stage);
            setLoanData(rest);
            setLoanId(rest?.customerApplication?.id);
          }
        } catch (e) {
          toast.error("Error! unable to load data.");
        } finally {
          setLoading(false);
        }
      };
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const single = filteredSteps?.[activeStep] ?? null;
    if (single) {
      setStepId(single.id);
    }
  }, [activeStep]);

  const nextStep = (data: any) => {
    //to go back to preview step directly
    if (data?.toPreview && data?.toPreview === true) {
      const lastStepIndex = filteredSteps.length - 1;
      setActiveStep(lastStepIndex);
    } else {
      setActiveStep((ac) => ac + 1);
    }
  };
  const previousStep = () => {
    setActiveStep((ac) => ac - 1);
  };
  //form preview to any step
  const gotoStep = (index: number) => {
    setActiveStep(index);
    setLoanData((ld: any) => ({ ...ld, quickEdit: true }));
  };
  const updateLoanData = (data: any) => {
    setLoanData((ld: any) => ({ ...ld, ...data }));
  };
  const setActiveLoanId = (id: number) => {
    setLoanId(id);
  };
  useEffect(() => {
    const filtered = steps.filter((item) => {
      if (item?.loanType == null) {
        //hide loan info page on Saving program and show on all others
        if (item?.id === "1" && loanType === "SAVING_PROGRAM") {
          return false;
        } else {
          return true;
        }
      }
      return item?.loanType === loanType;
    });
    setFilteredSteps(filtered);
    if (lastStage) {
      const stageIndex = filtered.map((item) => item?.stage).indexOf(lastStage);
      if (stageIndex != -1) {
        //add max cap
        if (stageIndex + 1 < filtered.length) {
          setActiveStep(stageIndex + 1);
        } else {
          setActiveStep(filtered.length - 1);
        }
      }
    } else {
      if (filtered.length > 0) {
        setStepId(filtered[0]?.id ?? null);
      }
    }
  }, [loanType]);

  const deleteApplication = async () => {
    const check = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!check) return;
    try {
      await axios.post(
        USER.withdrawRequest,
        { id: loanId },
        { headers: { Authorization: `Bearer ${at}` } }
      );
      toast.success("Application deleted successfully.");
      router.push("/");
    } catch (e) {
      toast.error("Error! Unable to delete.");
    } finally {
    }
  };
  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center">
        <CircularProgress className="mb-3" />
        <Typography variant="h6" className="mb-3">
          Preparing application data...
        </Typography>
        <Skeleton
          variant="rectangular"
          height={500}
          style={{ width: "100%", maxWidth: 860 }}
        />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 1024 }}>
      <Typography variant="h2" className="fw-bold text-center mb-3">
        {filteredSteps?.[activeStep]?.label}
      </Typography>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
        className="py-4"
      >
        {filteredSteps.map((item, index) => (
          <Step key={item?.label + " " + index}>
            <StepLabel
              //StepIconComponent={QontoStepIconRoot}
              sx={{
                "& .MuiStepLabel-label.Mui-active": {
                  color: "primary.main",
                  "& .MuiTypography-root": {
                    fontWeight: 600,
                  },
                },
                "& .MuiStepLabel-label.Mui-completed": {
                  color: "primary.main",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                {item?.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-3">
        <>
          {stepId === "0" && (
            <SavingProgramInfo
              loanId={loanId}
              nextStep={nextStep}
              setLoanId={setActiveLoanId}
              loanData={loanData?.savingProgram ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
          )}
          {stepId === "1" && (
            <LoanInfo
              loanId={loanId}
              nextStep={nextStep}
              setLoanId={setActiveLoanId}
              loanData={loanData?.customerApplication ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
          )}
          {stepId === "2" && (
            <PersonalInfo
              loanId={loanId}
              nextStep={nextStep}
              previousStep={previousStep}
              loanData={loanData?.personalInformation ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
          )}
          {stepId === "3" && (
            <PersonalInfoContd
              nextStep={nextStep}
              loanId={loanId}
              previousStep={previousStep}
              loanData={loanData?.personalInformation ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
          )}
          {stepId === "4" && (
            <IncomeInfo
              nextStep={nextStep}
              loanId={loanId}
              previousStep={previousStep}
              loanData={loanData?.employmentInformation ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
          )}
          {stepId === "5" && (
            <LandlordInformation
              nextStep={nextStep}
              loanId={loanId}
              previousStep={previousStep}
              loanData={loanData?.landlordInformation ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
          )}
          {stepId === "6" && (
            <SmallBusinessInfo
              nextStep={nextStep}
              loanId={loanId}
              previousStep={previousStep}
              loanData={loanData?.smallBusinessLoanInformation ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
          )}
          {stepId === "7" && (
            <BankingInfo
              loanId={loanId}
              nextStep={nextStep}
              previousStep={previousStep}
              loanData={loanData?.bankingInformation ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
          )}
          {stepId === "8" && (
            <DocumentsUpload
              nextStep={nextStep}
              loanId={loanId}
              previousStep={previousStep}
              loanData={loanData?.documentUpload ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
          )}
          {stepId === "9" && (
            <ConfirmationStep
              loanId={loanId}
              previousStep={previousStep}
              loanData={loanData}
              steps={filteredSteps}
              gotoStep={gotoStep}
            />
          )}
        </>
        {loanId != null && (
          <div className="mt-3 d-flex align-items-center">
            <Typography variant="body1">
              Want to delete to start over or change mind?{" "}
            </Typography>
            <Button
              variant="text"
              color="error"
              sx={{ fontWeight: 600 }}
              onClick={deleteApplication}
            >
              Delete Application
            </Button>
          </div>
        )}
      </div>

       <DocumentsUpload
              nextStep={nextStep}
              loanId={loanId}
              previousStep={previousStep}
              loanData={loanData?.documentUpload ?? null}
              setLoanData={updateLoanData}
              quickEdit={quickEdit}
            />
    </div>
  );
}
