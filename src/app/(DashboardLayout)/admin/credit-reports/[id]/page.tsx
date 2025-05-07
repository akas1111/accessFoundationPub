"use client";
import { use } from "react";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import CreditReport from "../../loan-requests/[id]/CreditReport";
import PageContainer from "@/app/(DashboardLayout)/_components/container/PageContainer";

interface Params {
  params: {
    id: string;
  };
}

export default async function SingleCreditReport({ params }: Params) {
  const { id } = params;
  return (
    <PageContainer title="Credit Report">
      <DashboardCard>
        <CreditReport loanId={id ?? ""} />
      </DashboardCard>
    </PageContainer>
  );
}
