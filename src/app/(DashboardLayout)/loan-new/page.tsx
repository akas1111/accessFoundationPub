"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/_components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "@/utils/UserContext";
import { useContext } from "react";
import LoanFormSteppers from "./client";
// import DocumentsUpload from "../_forms/loan-forms/Documents";

const SamplePage = () => {
  const data = useContext(UserContext);
  console.log(data);
  return (
    <PageContainer title="Loan Application" description="">
      {/* <DashboardCard title="Loan Application"> */}
      <div>
        {/* <Typography>This is a sample page </Typography> */}
        <LoanFormSteppers />
        {/* <DocumentsUpload/> */}
      </div>
      {/* </DashboardCard> */}
    </PageContainer>
  );
};

export default SamplePage;
