"use client";
import { Grid, Box, Skeleton, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/_components/container/PageContainer";
// components
import LoanList from "@/app/(DashboardLayout)/_components/dashboard/LoanList";
import LoanProgress from "./_components/dashboard/LoanProgress";
import NewLoanCard from "./_components/dashboard/NewLoanCard";
import { getUserData } from "@/utils/UserContext";
import { ADMIN, ROLES } from "@/utils/endpoints";
import TotalLoan from "./_components/dashboard/admin/TotalLoan";
import TotalProcessed from "./_components/dashboard/admin/TotalProcessed";
import TodaysRequest from "./_components/dashboard/admin/TodaysRequest";
import { useEffect, useState } from "react";
import axios from "axios";
import PendingRequests from "./_components/dashboard/admin/PendingRequests";
import SubmittedRequests from "./_components/dashboard/admin/SubmittedRequests";
import FaqList from "./_components/dashboard/faqs";
import BlogList from "@/app/(DashboardLayout)/_components/dashboard/blogs";
import ResourceListAdv from "./_components/dashboard/resources";
import LoanProcessInfo from "./_components/dashboard/loan-process";

export default function Dashboard() {
  const { role = null }: any = getUserData();
  return (
    <PageContainer title="Dashboard" description="">
      <>
        {role === ROLES.admin || role === ROLES.superadmin ? (
          <AdminDashboard />
        ) : (
          <CustomerDashboard />
        )}
      </>
    </PageContainer>
  );
}

const CustomerDashboard = () => {
  const [canApply, setCanApply] = useState<any>(false);

  const [loanApplyStatus, setLoanApplyStatus] = useState<any>({});

  const showButtons = () => {
    setCanApply(true);
  };
  const setApplyStatus = (data: any) => {
    setLoanApplyStatus(data);
  };
  return (
    <>
      <Box>
        <div className="text-center mt-2 mb-4">
          <Typography variant="h4" className="fw-bold">
            Welcome to Axcess Foundation
          </Typography>
          <Typography variant="h4" className="fw-bold">
            Loan Application Portal
          </Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <LoanProgress setCanApplyStatus={setApplyStatus} />
          </Grid>
          <Grid item xs={12} lg={4} hidden>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <NewLoanCard />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}></Grid>
              <Grid item xs={12} lg={4}></Grid>
            </Grid>
          </Grid> */}
          <Grid item xs={12} lg={12}>
            <LoanProcessInfo canApply={loanApplyStatus} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <LoanList setCanApply={showButtons} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <ResourceListAdv />
          </Grid>
          <Grid item xs={12} lg={12}>
            <BlogList />
          </Grid>
          <Grid item xs={12} lg={12}>
            <FaqList />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const AdminDashboard = () => {
  const { at }: any = getUserData();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(ADMIN.homeStats, {
          headers: { Authorization: `Bearer ${at}` },
        });
        setData(resp?.data?.data ?? null);
        console.log(resp);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  if (loading) {
    return (
      <Box>
        <Grid container spacing={3}>
          {Array.from(Array(5)).map((itm, index: number) => (
            <Grid item xs={12} lg={4} key={index + " "}>
              <Skeleton
                variant="rectangular"
                height={134}
                sx={{
                  borderRadius: "6px",
                  width: "100%",
                  bgcolor: "grey.300",
                }}
              ></Skeleton>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  return (
    <Box>
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <TotalLoan
              total={data?.totalApplications ?? 0}
              pending={data?.pendingApplications ?? 0}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TotalProcessed funded={data?.totalFundedSuccessful ?? 0} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TodaysRequest today={data?.todaysApplications ?? 0} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <SubmittedRequests today={data?.submittedApplications ?? 0} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PendingRequests today={data?.pendingApplications ?? 0} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
