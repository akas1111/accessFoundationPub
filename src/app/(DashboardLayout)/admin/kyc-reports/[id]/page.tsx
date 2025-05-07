"use client";
import { useState, useEffect, SyntheticEvent, use } from "react";
import axios from "axios";
import { ADMIN, USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import SingleDetailTabs from "../../../_components/dashboard/SingleLoan";
import { Card, Chip, Divider, Grid, Skeleton, Typography } from "@mui/material";
import DashboardCard from "../../../_components/shared/DashboardCard";
import PageContainer from "../../../_components/container/PageContainer";
import moment from "moment";
import BlankCard from "@/app/(DashboardLayout)/_components/shared/BlankCard";
import { toast } from "react-toastify";
import Link from "next/link";

export default function AdminPlaidDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { at }: any = getUserData();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const statusList = data?.statusResponses ?? [];

  console.log(data);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await axios.post(
          ADMIN.plaidReportDetail,
          { id: id ?? "" },
          {
            headers: {
              Authorization: `Bearer ${at}`,
            },
          }
        );
        const allData = resp?.data?.data ?? null;
        if (allData) {
          setData(allData);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    if (id) {
      loadData();
    }
  }, [params]);
  const submitStatus = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const fields = Object.fromEntries(formData);
    try {
      setSaving(true);
      fields.customerApplicationId = data?.customerApplication?.id ?? null;
      console.log(fields);
      const resp = await axios.post(ADMIN.updateStatus, fields, {
        headers: { Authorization: `Bearer ${at}` },
      });
      toast.success("Success, status updated.");
      console.log(resp);
    } catch (e: any) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <PageContainer title="View Application">
        <DashboardCard title="View Loan Application">
          <>
            <Skeleton variant="rectangular" height={50} className="mb-3" />
            <Skeleton variant="text" height={30} width={220} className="mb-3" />
            <Skeleton variant="rectangular" height={200} className="mb-3" />
          </>
        </DashboardCard>
      </PageContainer>
    );
  }

  return (
    <div>
      <PageContainer title="View Application">
        <DashboardCard
        // title={`Loan Application Request ${
        //   params?.id ? `(#${params.id})` : ""
        // }`}
        >
          <>
            <Typography variant="h5">
              Plaid Verification {id ? `(#${id})` : ""}
            </Typography>
            <Divider
              sx={{
                borderColor: "primary.main",
                width: 100,
                borderWidth: 2,
                opacity: "0.75",
                marginTop: 1,
                marginBottom: 3,
              }}
            />
            <Grid
              container
              //style={{ alignItems: "none" }}
              gap={0}
            >
              <Grid
                item
                xs={12}
                md={8}
                className="d-flex flex-wrap"
                //alignItems="stretch"
                style={{ minHeight: 100 }}
                gap={2}
              >
                <SingleGeneralInfo
                  title="Loan Application ID"
                  text={data?.customerApplicationId ?? "-"}
                />
                <SingleGeneralInfo
                  title="REQUEST DATE"
                  text={moment(data?.createdDate ?? new Date()).format(
                    "MMM DD, YYYY"
                  )}
                />
                {/* <SingleGeneralInfo
                  title="Application status"
                  text={data?.customerApplication?.applicationStatus ?? "N/A"}
                /> */}
                <div className="" style={{ minWidth: 120 }}>
                  <Typography
                    variant="body2"
                    className="text-uppercase"
                    // color="text.secondary"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                    color="grey.400"
                  >
                    Plaid Status
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: getStatusColor(data?.checkPlaidStatus ?? "-"),
                    }}
                  >
                    {data?.checkPlaidStatus ?? "N/A"}
                  </Typography>
                </div>
                {/* <SingleGeneralInfo
                  title="Loan status"
                  text={
                    data?.customerApplication?.loanProccessingStatus ?? "N/A"
                  }
                /> */}
                {/* <div className="" style={{ width: "100%" }}>
                  <Typography
                    variant="body2"
                    className="text-uppercase fw-bold text-secondary"
                  >
                    Reason for Loan
                  </Typography>
                  <Typography className="fw-bold">
                    {data?.customerApplication?.reasonForLoan ?? "-"}
                  </Typography>
                </div> */}
              </Grid>
            </Grid>
            <Link
              href={`/admin/loan-requests/${data?.customerApplicationId ?? ""}`}
            >
              <button className="btn btn-primary">View Loan Application</button>
            </Link>
          </>
        </DashboardCard>
      </PageContainer>
    </div>
  );
}

const SingleGeneralInfo = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <div className="" style={{ minWidth: 120 }}>
      <Typography
        variant="body2"
        className="text-uppercase"
        // color="text.secondary"
        sx={{ fontWeight: 600, mb: 0.5 }}
        color="grey.400"
      >
        {title}
      </Typography>
      <Typography variant="h6">{text}</Typography>
    </div>
  );
};

const getStatusColor = (status: string) => {
  let color = "primary.main";
  switch (status) {
    case "COMPLETED":
      color = "#27ae60";
      break;
    case "PENDING":
      color = "#e67e22";
      break;
  }
  return color;
};
