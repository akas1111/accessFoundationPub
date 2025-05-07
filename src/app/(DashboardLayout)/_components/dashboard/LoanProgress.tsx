import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { USER } from "@/utils/endpoints";
import axios from "axios";
import { getUserData } from "@/utils/UserContext";
import { Box, Skeleton, Typography } from "@mui/material";
import Link from "next/link";
import BlankCard from "../shared/BlankCard";

// const QontoConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 10,
//     left: "calc(-50% + 16px)",
//     right: "calc(50% + 16px)",
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: "#27ae60",
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: "#27ae60",
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     borderColor: "#d1d1d1",
//     borderTopWidth: 4,
//     borderRadius: 1,
//     ...theme.applyStyles("dark", {
//       borderColor: theme.palette.grey[800],
//     }),
//   },
// }));
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

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme }) => ({
    color: "#d1d1d1",
    display: "flex",
    height: 22,
    alignItems: "center",
    "& .QontoStepIcon-completedIcon": {
      color: "#27ae60",
      zIndex: 1,
      fontSize: 20,
    },
    "& .QontoStepIcon-circle": {
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[700],
    }),
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          color: "#27ae60",
        },
      },
    ],
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default function LoanProgress({
  setCanApplyStatus,
}: {
  setCanApplyStatus: (data: any) => void;
}) {
  const { at }: any = getUserData();
  // const [loading, setLoading] = React.useState<boolean>(false);
  const [statusList, setStatusList] = React.useState<any[]>([]);
  const [active, setActive] = React.useState<number | null>(null);
  const [docReqCount, setDocReqCount] = React.useState<number>(0);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await axios.get(USER.loanStatus, {
          headers: { Authorization: `Bearer ${at}` },
        });

        //document request count
        const requestedDocs = resp?.data?.data?.totalRequestedDocument ?? 0;
        setDocReqCount(requestedDocs);

        //for stepper
        const data = resp?.data?.data?.statuses ?? [];
        setStatusList(data);

        const showTracking = resp?.data?.data?.trackingAllowed ?? false;
        if (data.length > 0 && showTracking) {
          data?.map((item: any, index: number) => {
            if (item?.isActive === true) {
              setActive(index);
            }
          });
        }

        //send loan type eligibility
        const canApplyStatus =
          resp?.data?.data?.loanInformationApplyStatus ?? [];
        const availableLoans: any = {};
        canApplyStatus?.map((itm: any) => {
          availableLoans[itm?.loanInformation ?? ""] = itm?.canApply ?? false;
        });
        setCanApplyStatus(availableLoans);
      } catch (e) {
        //console.log(e);
      }
    };
    loadData();
  }, []);
  return (
    <>
      {active != null && (
        <BlankCard>
          <div className="py-4" style={{ maxWidth: "100vw" }}>
            <Typography variant="h5" className="text-center mb-4">
              Loan Application Tracking
            </Typography>
            <Stack sx={{ width: "100%" }} spacing={4}>
              <Stepper
                alternativeLabel
                activeStep={active}
                connector={<QontoConnector />}
                className="pt-4 pb-2"
              >
                {statusList.map((item: any, index) => (
                  <Step key={item?.statusName + " " + index}>
                    <StepLabel
                      //StepIconComponent={QontoStepIcon}
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
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        {item?.statuesLabel ?? ""}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
            <Box
              className="text-center px-3"
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <Typography variant="h6" color="primary">
                {statusList?.[active]?.statuesLabel ?? "-"}
              </Typography>
            </Box>
          </div>
        </BlankCard>
      )}
      {docReqCount > 0 && (
        <div
          className="p-3 d-flex justify-content-between align-items-center mt-4"
          style={{
            background: "rgba(255,0,0, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(255,0,0, 0.1)",
          }}
        >
          <Typography className="text-danger" sx={{ fontWeight: 500 }}>
            You have pending document requests for your loan application.
          </Typography>
          <Link href="/document-request">
            <button className="btn btn-danger">View Requests</button>
          </Link>
        </div>
      )}
    </>
  );
}
