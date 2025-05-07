"use client";
import React, { SyntheticEvent, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./style.module.css";
import {
  IconClipboardData,
  IconHome,
  IconId,
  IconIdBadge2,
  IconReceipt,
} from "@tabler/icons-react";
import BlankCard from "../../shared/BlankCard";
import Link from "next/link";
import { IconCashBanknote } from "@tabler/icons-react";

// export default function LoanProcessInfo() {
//   const [filter, setFilter] = useState<string>("all");

//   return (
//     <>
//       <div className="text-center mt-2 mb-4">
//         <Typography variant="h4" className="fw-bold">
//           Welcome to Axcess Foundation
//         </Typography>
//         <Typography variant="h4" className="fw-bold">
//           Loan Application Portal
//         </Typography>
//       </div>
//       <BlankCard className="px-3 py-4">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8">
//               <Typography
//                 variant="h6"
//                 className="mb-3"
//                 style={{ maxWidth: 580 }}
//               >
//                 In order to complete your application, please ensure you have
//                 the following documents ready:
//               </Typography>
//               <ul className={styles.listWrap}>
//                 {requiredDocuments?.map((item, index) => (
//                   <li key={index + " " + item?.title}>
//                     <IconSquareCheckFilled style={{ color: "#00A669" }} />
//                     <Typography variant="h6">
//                       {item?.title}
//                       <span style={{ fontWeight: 400 }}>
//                         {item?.text ? ` (${item?.text})` : ""}
//                       </span>
//                     </Typography>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="col-md-4">
//               <div
//                 className="bordr px-3 py-4"
//                 style={{
//                   borderRadius: "10px",
//                   backgroundColor: "#f4f6fa",
//                   boxShadow: "inset 1px 1px 5px 1px #eee",
//                 }}
//               >
//                 <div className="text-center">
//                   <Typography
//                     variant="h4"
//                     style={{
//                       maxWidth: 220,
//                       fontWeight: 700,
//                       margin: "0px auto",
//                     }}
//                     className="mb-4"
//                   >
//                     For Rental & Credit Building Loan
//                   </Typography>
//                   <img src="/images/dash/loan-process.png" width="120" />
//                   <div>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       sx={{
//                         width: "100%",
//                         borderRadius: 10,
//                         py: "0.5rem",
//                         fontSize: "1rem",
//                         fontWeight: 700,
//                         marginTop: "1rem",
//                       }}
//                     >
//                       Apply Now
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </BlankCard>
//     </>
//   );
// }

export default function LoanProcessInfo({ canApply }: { canApply: any }) {
  const [selected, setSelected] = useState<number | null>(null);
  const selectCard = (id: number) => {
    if (id === selected) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  };
  return (
    <div className="container p-0">
      <div className="row">
        <div className="col-md-4 pb-4">
          <BlankCard className="h-100">
            <Box
              className="px-3 py-4"
              onClick={() => {
                selectCard(0);
              }}
              sx={{
                borderRadius: "8px",
                border: "1px solid #fff",
                borderColor: selected === 0 ? "primary.main" : "#fff",
              }}
            >
              <div className="text-center">
                <img src="/images/dash/em-rental.png" width="120" />
                <div className="dotted-gradient"></div>
                <Typography variant="h4" className="mb-3 fw-bold text-center">
                  Apply Rental Loan
                </Typography>
                <Typography variant="body1">
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                </Typography>
                {/* <div>
                    {canApply?.["EMERGENCY_LOAN"] === true && (
                      <Link href="/loan-new?type=EMERGENCY_LOAN">
                        <Button
                          variant="contained"
                          color="primary"
                          className="mt-3"
                        >
                          Apply for Loan
                        </Button>
                      </Link>
                    )}
                  </div> */}
                <div>
                  {canApply?.["EMERGENCY_LOAN"] != null && (
                    <Button
                      LinkComponent={Link}
                      variant="contained"
                      color="primary"
                      className="mt-3"
                      disabled={!(canApply?.["EMERGENCY_LOAN"] === true)}
                      href={
                        canApply?.["EMERGENCY_LOAN"] === true
                          ? "/loan-new?type=EMERGENCY_LOAN"
                          : "#"
                      }
                      onClick={(e: SyntheticEvent) => {
                        e.stopPropagation();
                      }}
                    >
                      Apply for Loan
                    </Button>
                  )}
                </div>
              </div>
            </Box>
          </BlankCard>
        </div>
        <div className="col-md-4 pb-4">
          <BlankCard className="h-100">
            <Box
              className="px-3 py-4"
              onClick={() => {
                selectCard(1);
              }}
              sx={{
                borderRadius: "8px",
                border: "1px solid #fff",
                borderColor: selected === 1 ? "primary.main" : "#fff",
                height: "100%",
              }}
            >
              <div className="text-center">
                <img src="/images/dash/credit-loan.png" width="90" />
                <div className="dotted-gradient"></div>
                <Typography variant="h4" className="mb-3 fw-bold text-center">
                  Get Credit Builder Loan
                </Typography>
                <Typography variant="body1">
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text
                </Typography>
                {/* <div>
                    {canApply?.["CREDIT_BUILDING_LOAN"] === true && (
                      <Link href="/loan-new?type=CREDIT_BUILDING_LOAN">
                        <Button
                          variant="contained"
                          color="primary"
                          className="mt-3"
                        >
                          Get Now
                        </Button>
                      </Link>
                    )}
                  </div> */}
                <div>
                  {canApply?.["CREDIT_BUILDING_LOAN"] != null && (
                    <Button
                      LinkComponent={Link}
                      variant="contained"
                      color="primary"
                      className="mt-3"
                      disabled={!(canApply?.["CREDIT_BUILDING_LOAN"] === true)}
                      href={
                        canApply?.["CREDIT_BUILDING_LOAN"] === true
                          ? "/loan-new?type=CREDIT_BUILDING_LOAN"
                          : "#"
                      }
                      onClick={(e: SyntheticEvent) => {
                        e.stopPropagation();
                      }}
                    >
                      Get Now
                    </Button>
                  )}
                </div>
              </div>
            </Box>
          </BlankCard>
        </div>
        <div className="col-md-4 pb-4">
          <BlankCard className="h-100">
            <Box
              className="px-3 py-4"
              onClick={() => {
                selectCard(2);
              }}
              sx={{
                borderRadius: "8px",
                border: "1px solid #fff",
                borderColor: selected === 2 ? "primary.main" : "#fff",
              }}
            >
              <div className="text-center">
                {/* <>
                    <Typography variant="h4" className="mb-1">
                      Save{" "}
                      <span
                        style={{
                          color: "#f39c12",
                          fontWeight: "bold",
                        }}
                      >
                        $500
                      </span>
                    </Typography>
                    <Typography variant="h4" className="mb-1">
                      GET{" "}
                      <span
                        style={{
                          background: "red",
                          padding: "1px 6px",
                          color: "#fff",
                          borderRadius: 5,
                          fontWeight: "bold",
                        }}
                      >
                        $500
                      </span>
                    </Typography>
                    <Typography variant="h4" className="fw-bold">
                      for Free.
                    </Typography>
                  </> */}
                {/* <div className="dotted-gradient"></div> */}
                {/* <img
                    src="/images/dash/saving-program.png"
                    width="180"
                    className="mt-3"
                  /> */}
                {/* <Typography
                    variant="h4"
                    className="mb-3 fw-bold text-center mt-2"
                  >
                    Save $500
                  </Typography> */}
                {/* <Typography variant="body1" className="mb-3 mt-3">
                    is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took
                  </Typography> */}
                {/* <div>
                    {canApply?.["SAVING_PROGRAM"] === true && (
                      <Link href="/loan-new?type=SAVING_PROGRAM">
                        <Button
                          variant="contained"
                          color="primary"
                          className="mt-3"
                        >
                          Get Now
                        </Button>
                      </Link>
                    )}
                  </div> */}
                <div>
                  {/* {canApply?.["SAVING_PROGRAM"] != null && (
                      <Button
                        variant="contained"
                        color="primary"
                        className="mt-3"
                        disabled={!(canApply?.["SAVING_PROGRAM"] === true)}
                        href={
                          canApply?.["SAVING_PROGRAM"] === true
                            ? "/loan-new?type=SAVING_PROGRAM"
                            : "#"
                        }
                        onClick={(e: SyntheticEvent) => {
                          e.stopPropagation();
                        }}
                      >
                        Get Now
                      </Button>
                    )} */}
                  {canApply?.["SAVING_PROGRAM"] != null && (
                    <div>
                      {canApply?.["SAVING_PROGRAM"] === true ? (
                        <>
                          <Typography variant="h4" className="mb-1">
                            Save{" "}
                            <span
                              style={{
                                color: "#f39c12",
                                fontWeight: "bold",
                              }}
                            >
                              $500
                            </span>
                          </Typography>
                          <Typography variant="h4" className="mb-1">
                            GET{" "}
                            <span
                              style={{
                                background: "red",
                                padding: "1px 6px",
                                color: "#fff",
                                borderRadius: 5,
                                fontWeight: "bold",
                              }}
                            >
                              $500
                            </span>
                          </Typography>
                          <Typography variant="h4" className="fw-bold">
                            for Free.
                          </Typography>
                          <div className="dotted-gradient"></div>
                          <div>
                            <img
                              src="/images/dash/saving-program.png"
                              width="180"
                              className="mt-3"
                            />
                          </div>
                          <Button
                            LinkComponent={Link}
                            variant="contained"
                            color="primary"
                            className="mt-3"
                            href={
                              canApply?.["SAVING_PROGRAM"] === true
                                ? "/loan-new?type=SAVING_PROGRAM"
                                : "#"
                            }
                            onClick={(e: SyntheticEvent) => {
                              e.stopPropagation();
                            }}
                          >
                            Get Now
                          </Button>
                        </>
                      ) : (
                        <>
                          <img
                            src="/images/dash/saving-program.png"
                            width="180"
                            className="my-3"
                          />
                          <Typography variant="body1">
                            Thank you for submitting your saving program
                            application. We received it. In order to be eligible
                            for $500 free matching, please continue to signup at
                            communityfinancialwellness.com.
                            {/* <a
                                href="www.communityfinancialwellness.com"
                                target="_blank"
                              >
                                www.communityfinancialwellness.com
                              </a> */}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            className="mt-3"
                            href="http://www.communityfinancialwellness.com"
                            onClick={(e: SyntheticEvent) => {
                              e.stopPropagation();
                            }}
                          >
                            Visit Site
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Box>
          </BlankCard>
        </div>
      </div>
      {selected != null && (
        <BlankCard>
          <div style={{ maxWidth: 768, margin: "0px auto" }} className="py-4">
            <Typography variant="h4">
              In order to complete your application, please ensure you have the
              following documents ready:
            </Typography>
            <div className="mb-3 mt-4">
              <BlankCard>
                <ul className={styles.listWrap}>
                  {rentalDocuments
                    ?.filter((it) => it?.showId?.includes(selected))
                    ?.map((item, index) => (
                      <li key={index + " " + item?.title}>
                        {/* <IconSquareCheckFilled style={{ color: "#00A669" }} /> */}
                        <div className={styles.docsIconWrap}>
                          {item?.icon ?? ""}
                        </div>
                        <Typography variant="h6">
                          {item?.title}
                          <span style={{ fontWeight: 400, opacity: 0.8 }}>
                            {item?.text ? ` (${item?.text})` : ""}
                          </span>
                        </Typography>
                      </li>
                    ))}
                </ul>
              </BlankCard>
            </div>
          </div>
        </BlankCard>
      )}
    </div>
  );
}
const rentalDocuments = [
  {
    title: "Valid government-issued ID",
    text: "e.g., passport, driver’s license",
    icon: <IconId />,
    showId: [0, 1, 2],
  },
  {
    title: "Proof of income",
    text: "e.g., pay stubs, bank statements",
    icon: <IconReceipt />,
    showId: [0, 1, 2],
  },
  {
    title: "Proof of residence",
    text: "e.g., utility bill, lease agreement",
    icon: <IconHome />,
    showId: [0],
  },
  {
    title: "Social Security Number",
    text: null,
    icon: <IconClipboardData />,
    showId: [0, 1, 2],
  },
  {
    title: "Your Bank Account/Routing Number",
    text: null,
    icon: <IconCashBanknote />,
    showId: [0, 1, 2],
  },
  {
    title: "Employment verification",
    text: "e.g., recent pay slips or employment letter",
    icon: <IconIdBadge2 />,
    showId: [0, 1, 2],
  },
];

const creditDocuments = [
  {
    title: "Valid government-issued ID",
    text: "e.g., passport, driver’s license",
  },
  { title: "Proof of income", text: "e.g., pay stubs, bank statements" },
  //{ title: "Proof of residence", text: "e.g., utility bill, lease agreement" },
  { title: "Social Security Number", text: null },
  { title: "Your Bank Account/Routing Number", text: null },
  {
    title: "Employment verification",
    text: "e.g., recent pay slips or employment letter",
  },
];
