"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import SingleDetailTabs from "../../_components/dashboard/SingleLoan";
import { Skeleton } from "@mui/material";
import DashboardCard from "../../_components/shared/DashboardCard";
import PageContainer from "../../_components/container/PageContainer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CustomerLoanDetail({
  params,
}: {
  params: { id: string };
}) {
  const { at }: any = getUserData();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await axios.post(
          USER.loanDetailC,
          { id: params?.id },
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
    if (params?.id) {
      loadData();
    }
  }, [params]);

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
  const withdrawLoanRequest = async () => {
    const confirm = window.confirm(
      "Are you sure to withdraw this loan request?"
    );
    if (!confirm) return;
    try {
      setSaving(true);
      await axios.post(
        USER.withdrawRequest,
        { id: params?.id },
        { headers: { Authorization: `Bearer ${at}` } }
      );
      toast.success("Withdrawl request successful.");
      router.push("/");
    } catch (e) {
      console.log(e);
      toast.error("Error! Unable to withdraw.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
      <PageContainer title="View Application">
        <DashboardCard
          title={`View Loan Application ${params?.id ? `(#${params.id})` : ""}`}
        >
          <>
            <SingleDetailTabs data={data} />
            {!["APPROVED", "FUNDED", "SUCCESSFUL", "REJECTED"].includes(
              data?.customerApplication?.loanProccessingStatus
            ) && (
              <div className="mt-4 text-end">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    withdrawLoanRequest();
                  }}
                  disabled={saving}
                >
                  Withdraw Loan Request
                </button>
              </div>
            )}
          </>
        </DashboardCard>
      </PageContainer>
    </div>
  );
}
