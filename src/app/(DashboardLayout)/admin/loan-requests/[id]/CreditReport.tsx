"use client";
import { ADMIN } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import { Divider, Skeleton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export default function CreditReport({ loanId }: { loanId: string }) {
  const { at }: any = getUserData();
  const [loading, setLoading] = useState<boolean>(true);

  const [creditData, setCreditData] = useState<any>(null);
  console.log(creditData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await axios.post(
          ADMIN.creditReport,
          { id: loanId },
          {
            headers: {
              Authorization: `Bearer ${at}`,
            },
          }
        );
        const data = resp?.data?.data?.creditProfile?.[0] ?? null;
        if (data) {
          setCreditData(data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <Skeleton variant="rectangular" height={150} />;
  }
  if (loading === false && creditData == null) {
    return (
      <div className="border p-3">
        <Typography>
          Unable to load credit report for this application.
        </Typography>
      </div>
    );
  }

  return (
    <div className="">
      <Typography variant="h5" className="mb-3">
        Credit Profile Report
      </Typography>
      <div>
        <Typography variant="h6" className="">
          Personal Information
        </Typography>
        <Divider sx={{ borderColor: "grey.400" }} className="mb-3 mt-2" />
        <div
          className="d-flex flex-wrap justify-content-between"
          style={{ gap: 16 }}
        >
          <div>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "grey.400" }}
            >
              Best Name
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {creditData?.consumerIdentity?.name?.[0]?.firstName ?? ""}{" "}
              {creditData?.consumerIdentity?.name?.[0]?.middleName ?? ""}{" "}
              {creditData?.consumerIdentity?.name?.[0]?.surname ?? ""}
            </Typography>
          </div>
          <div>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "grey.400" }}
            >
              Other Name(s)
            </Typography>
            {creditData?.consumerIdentity?.name?.map(
              (item: any, index: number) => (
                <Typography
                  sx={{ fontWeight: 500 }}
                  key={index + " " + item?.firstName}
                >
                  <>
                    {item?.firstName ?? ""} {item?.middleName ?? ""}{" "}
                    {item?.surname ?? ""}
                  </>
                </Typography>
              )
            )}
          </div>
          <div>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "grey.400" }}
            >
              Social Security Number(s)
            </Typography>
            {creditData?.ssn?.map((item: any, index: number) => (
              <Typography
                sx={{ fontWeight: 500 }}
                key={index + " " + item?.number}
              >
                {item?.number ?? ""}{" "}
                <span>(Indicators: {item?.ssnIndicators ?? "-"})</span>
              </Typography>
            ))}
          </div>
          <div>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "grey.400" }}
            >
              Date of Birth
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {creditData?.consumerIdentity?.dob?.month ?? ""}/
              {creditData?.consumerIdentity?.dob?.day ?? ""}/
              {creditData?.consumerIdentity?.dob?.year ?? ""}
            </Typography>
          </div>
          <div>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "grey.400" }}
            >
              Phone Number(s)
            </Typography>
            {creditData?.consumerIdentity?.phone?.map(
              (item: any, index: number) => (
                <Typography
                  sx={{ fontWeight: 500 }}
                  key={index + " " + item?.number}
                >
                  <>
                    {item?.number ?? ""}{" "}
                    {item?.source ? `(${item?.source})` : ""}
                  </>
                </Typography>
              )
            )}
          </div>
        </div>
      </div>
      <div>
        <Typography variant="h6" className="">
          Risk Model
        </Typography>
        <Divider sx={{ borderColor: "grey.400" }} className="mb-3 mt-2" />
        <div className="d-flex flex-wrap" style={{ gap: 16 }}>
          <div>
            <Typography sx={{ fontWeight: 500 }}>
              <strong>Score:</strong> {creditData?.riskModel?.[0]?.score}
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              <strong>Evaluation:</strong>{" "}
              {creditData?.riskModel?.[0]?.evaluation}
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              <strong>Model Indicator:</strong>{" "}
              {creditData?.riskModel?.[0]?.modelIndicator}
            </Typography>
          </div>
          <div>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "grey.400" }}
            >
              Score Factors
            </Typography>
            {creditData?.riskModel?.[0]?.scoreFactors?.map(
              (item: any, index: number) => (
                <Typography
                  sx={{ fontWeight: 500 }}
                  key={index + " " + item?.code}
                >
                  Code: {item?.code ?? ""}, Importance: {item?.importance ?? ""}
                </Typography>
              )
            )}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Typography variant="h6" className="">
          Address(es)
        </Typography>
        <Divider sx={{ borderColor: "grey.400" }} className="mb-3 mt-2" />
        <div className="mb-3 mt-2">
          {creditData?.addressInformation?.map((item: any, index: number) => (
            <div
              className={`${index > 0 ? "border-top" : ""} py-1`}
              key={index + " " + item?.state}
            >
              <span style={{ fontWeight: 500 }}>
                {index + 1}. {item?.streetPrefix ?? ""} {item?.streetName ?? ""}{" "}
                {item?.streetSuffix ?? ""} {item?.city ?? ""},{" "}
                {item?.state ?? ""} {item?.zipCode ?? ""}
              </span>
              <Typography
                variant="body1"
                className="ps-3 d-inline"
                color="grey.500"
              >
                {item?.dwellingType ?? "-"} dwelling, Reported{" "}
                {item?.timesReported ?? "-"} time(s) from{" "}
                {item?.firstReportedDate
                  ? moment(item?.firstReportedDate, "MMDDYYYY").format(
                      "MM/DD/YYYY"
                    )
                  : "-"}{" "}
                to{" "}
                {item?.lastUpdatedDate
                  ? moment(item?.lastUpdatedDate, "MMDDYYYY").format(
                      "MM/DD/YYYY"
                    )
                  : "-"}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <Typography variant="h6" className="">
          Informational Messages
        </Typography>
        <Divider sx={{ borderColor: "grey.400" }} className="mb-3 mt-2" />
        <div className="d-flex flex-wrap" style={{ gap: 16 }}>
          <div>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "grey.400", width: 100 }}
            >
              Number
            </Typography>
          </div>
          <div>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "grey.400" }}
            >
              Message
            </Typography>
          </div>
        </div>
        {creditData?.informationalMessage?.map((item: any, index: number) => (
          <div
            className="d-flex flex-wrap"
            style={{ gap: 16 }}
            key={index + " " + item?.messageNumber}
          >
            <div>
              <Typography sx={{ fontWeight: 500, width: 100 }}>
                {item?.messageNumber ?? "-"}
              </Typography>
            </div>
            <div>
              <Typography sx={{ fontWeight: 500 }}>
                {item?.messageNumberDetailed ?? ""} {item?.messageText ?? ""}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      {creditData?.summaries?.map((item: any, index: number) => (
        <div className="mt-3" key={index + " " + item?.summaryType}>
          <Typography variant="h6" className="">
            {item?.summaryType ?? `Summary Type ${index + 1}`}
          </Typography>
          <Divider sx={{ borderColor: "grey.400" }} className="mb-3 mt-2" />
          <div className="d-flex flex-wrap" style={{ gap: 16 }}>
            {item?.attributes &&
              item?.attributes?.map((att: any, indx: number) => (
                <div key={item?.indx + " " + att?.id}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, color: "grey.400" }}
                  >
                    {summariesObjectMap?.[att?.id]
                      ? summariesObjectMap?.[att?.id]
                      : att?.id ?? "ID"}
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {att?.value ?? "N/A"}
                  </Typography>
                </div>
              ))}
          </div>
        </div>
      ))}
      <div className="mt-3">
        <Typography variant="h6" className="">
          Inquiries
        </Typography>
        <Divider sx={{ borderColor: "grey.400" }} className="mb-3 mt-2" />
        <DataGrid
          rows={
            creditData?.inquiry?.map((item: any, index: number) => ({
              ...item,
              id: index + 1,
            })) ?? []
          }
          columns={inqColumns}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          sx={sx}
          autoPageSize
          //pageSizeOptions={[20]}
        />
      </div>
      <div className="mt-3">
        <Typography variant="h6" className="">
          Tradeline
        </Typography>
        <Divider sx={{ borderColor: "grey.400" }} className="mb-3 mt-2" />
        <DataGrid
          rows={
            creditData?.tradeline?.map((item: any, index: number) => ({
              ...item,
              id: index + 1,
            })) ?? []
          }
          columns={tradeColumns}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          sx={sx}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[20]}
        />
      </div>
      <div className="mt-3">
        <Typography variant="h6" className="">
          Public Record
        </Typography>
        <Divider sx={{ borderColor: "grey.400" }} className="mb-3 mt-2" />
        <DataGrid
          rows={
            creditData?.publicRecord?.map((item: any, index: number) => ({
              ...item,
              id: index + 1,
            })) ?? []
          }
          columns={publicRecColumns}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          sx={sx}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 30,
              },
            },
          }}
          pageSizeOptions={[30]}
        />
      </div>
    </div>
  );
}

const inqColumns: GridColDef<any[]>[] = [
  {
    field: "date",
    headerName: "Date",
    width: 100,
    sortable: false,
  },
  {
    field: "subscriberName",
    headerName: "Subscriber",
    sortable: false,
    minWidth: 140,
    flex: 1,
    valueGetter: (value, row) => value ?? "-",
  },
  // {
  //   field: "createdDate",
  //   headerName: "Date",
  //   width: 100,
  //   //renderCell:(params)=> <div></div>,
  //   valueGetter: (value, row) =>
  //     moment(value ?? new Date()).format("MMM DD, YYYY"),
  // },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "terms",
    headerName: "Terms",
    width: 100,
  },
];
const tradeColumns: GridColDef<[]>[] = [
  {
    field: "openDate",
    headerName: "Open Date",
    width: 100,
    sortable: false,
  },
  {
    field: "subscriberName",
    headerName: "Subscriber",
    minWidth: 140,
    flex: 1,
    sortable: false,
  },
  {
    field: "amount1",
    headerName: "Original Amount",
    width: 100,
    sortable: false,
  },
  {
    field: "statusDate",
    headerName: "Status Date",
    width: 100,
    sortable: false,
  },
  {
    field: "balanceDate",
    headerName: "Balance Date",
    width: 100,
    sortable: false,
  },
  // {
  //   field: "createdDate",
  //   headerName: "Date",
  //   width: 100,
  //   //renderCell:(params)=> <div></div>,
  //   valueGetter: (value, row) =>
  //     moment(value ?? new Date()).format("MMM DD, YYYY"),
  // },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "terms",
    headerName: "Terms",
    width: 100,
  },
];

const publicRecColumns: GridColDef<[]>[] = [
  {
    field: "filingDate",
    headerName: "Filing Date",
    width: 100,
    sortable: false,
  },
  {
    field: "courtCode",
    headerName: "Court Code",
    minWidth: 110,
    sortable: false,
  },
  {
    field: "courtName",
    headerName: "Court Name",
    minWidth: 140,
    flex: 1,
    sortable: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 80,
    sortable: false,
  },
  {
    field: "statusDate",
    headerName: "Status Date",
    width: 100,
    sortable: false,
  },
  {
    field: "evaluation",
    headerName: "Evaluation",
    width: 100,
    sortable: false,
  },
  {
    field: "bookPageSequence",
    headerName: "Book Page Sequence",
    width: 180,
    sortable: false,
  },
  {
    field: "ecoa",
    headerName: "ECOA",
    width: 60,
    sortable: false,
  },
];

const summariesObjectMap: any = {
  disputedAccountsExcluded: "Disputed Accounts Excluded",
  publicRecordsCount: "Public Records Count",
  installmentBalance: "Installment Balance",
  realEstateBalance: "Real Estate Balance",
  revolvingBalance: "Revolving Balance",
  pastDueAmount: "Past Due Amount",
  monthlyPayment: "Monthly Payment",
  monthlyPaymentPartialFlag: "Monthly Payment Partial Flag",
  realEstatePayment: "Real Estate Payment",
  realEstatePaymentPartialFlag: "Real Estate Payment Partial Flag",
  revolvingAvailablePercent: "Revolving Available Percent",
  revolvingAvailablePartialFlag: "Revolving Available Partial Flag",
  totalInquiries: "Total Inquiries",
  inquiriesDuringLast6Months: "Inquiries During Last 6 Months",
  totalTradeItems: "Total Trade Items",
  paidAccounts: "Paid Accounts",
  satisfactoryAccounts: "Satisfactory Accounts",
  nowDelinquentDerog: "Currently Delinquent/Derogatory Accounts",
  wasDelinquentDerog: "Previously Delinquent/Derogatory Accounts",
  oldestTradeDate: "Oldest Trade Date",
  delinquencies30Days: "30-Day Delinquencies",
  delinquencies60Days: "60-Day Delinquencies",
  delinquencies90to180Days: "90 to 180-Day Delinquencies",
  derogCounter: "Derogatory Counter",
};
const sx = {
  border: "1px solid #eee",
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#5D87FF",
    color: "#fff",
    fontWeight: "bold",
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      textTransform: "uppercase",
    },
  },
  "& .MuiDataGrid-columnHeader:focus-within": {
    outline: 0,
  },
  "& .MuiTablePagination-displayedRows": {
    margin: 0,
  },
  "& .MuiDataGrid-cell:focus": {
    outline: 0,
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #eee",
  },
};
