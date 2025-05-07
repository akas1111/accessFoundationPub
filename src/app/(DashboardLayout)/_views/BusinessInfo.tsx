import { Divider, Typography } from "@mui/material";
import { ShowEmptyMsg, SingleGridItem, SingleInfo } from "./Common";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import appEnums from "../_components/dashboard/enums";

interface LoanViewProps {
  data: any;
  action?: React.ReactNode;
}
export default function ShowBusinessInfo({ data, action }: LoanViewProps) {
  console.log("PI", data);
  if (data == null) {
    return <ShowEmptyMsg />;
  }
  return (
    <div>
      <SingleGridItem title="Business Information" action={action}>
        <SingleInfo
          title="Name"
          text={data?.businessInformation?.businessName ?? "-"}
        />
        <SingleInfo
          title="Address"
          text={data?.businessInformation?.businessAddress ?? "-"}
        />
        <SingleInfo
          title="Type"
          text={
            appEnums?.[data?.businessInformation?.businessType] ??
            data?.businessInformation?.businessType ??
            "-"
          }
        />
        <SingleInfo
          title="Industry Sector"
          text={data?.businessInformation?.industrySector ?? "-"}
        />
        <SingleInfo
          title="Start Date"
          text={data?.businessInformation?.businessStartDate ?? "-"}
        />
        <SingleInfo
          title="Tax Identification Number"
          text={data?.businessInformation?.taxIdentificationNumber ?? "-"}
        />
        <SingleInfo
          title="Annual Gross Revenue"
          text={`$${data?.businessInformation?.annualGrossRevenue ?? "-"}`}
        />
        <SingleInfo
          title="Net Profit Last Year"
          text={`$${data?.businessInformation?.netProfitLastYear ?? "-"}`}
        />
        <SingleInfo
          title="Number of Employees"
          text={data?.businessInformation?.numberOfEmployees ?? "-"}
        />
      </SingleGridItem>
      <SingleGridItem title="Business Loan Details">
        <SingleInfo
          title="Loan Amount Requested"
          text={data?.loanDetailsForBusiness?.loanAmountRequested ?? "-"}
        />
        <SingleInfo
          title="Loan Purpose"
          text={
            appEnums?.[data?.loanDetailsForBusiness?.loanPurposeEnum] ??
            data?.loanDetailsForBusiness?.loanPurposeEnum ??
            "-"
          }
        />
        <SingleInfo
          title="Preferred Loan Term"
          text={
            appEnums?.[data?.loanDetailsForBusiness?.preferredLoanTerm] ??
            data?.loanDetailsForBusiness?.preferredLoanTerm ??
            "-"
          }
        />
        <SingleInfo
          title="Collateral Required"
          text={
            data?.loanDetailsForBusiness?.collateralRequired === true
              ? "Yes"
              : "No"
          }
        />
        <SingleInfo
          title="Collateral Details"
          text={data?.loanDetailsForBusiness?.collateralDetails ?? "-"}
        />
        <SingleInfo
          title="Loan Purpose (Other)"
          text={data?.loanDetailsForBusiness?.otherLoanPurpose ?? "-"}
        />
        <SingleInfo
          title="Loan Term (Other)"
          text={data?.loanDetailsForBusiness?.otherLoanTerm ?? "-"}
        />
      </SingleGridItem>
      <SingleGridItem title="Business Ownership Information">
        <DataGrid
          //loading={loading}
          rows={
            data?.ownershipInformation?.map((itm: any, index: any) => ({
              ...itm,
              id: index + "_" + itm?.id,
            })) ?? []
          }
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          //checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          isCellEditable={() => false}
          getRowId={(r) => r.id}
          sx={sx}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
        />
      </SingleGridItem>
      <SingleGridItem title="Business Banking Information">
        <SingleInfo
          title="Bank Name"
          text={data?.businessBankingInformation?.businessBankName ?? "-"}
        />
        <SingleInfo
          title="Account Type"
          text={
            appEnums?.[data?.businessBankingInformation?.accountType] ??
            data?.businessBankingInformation?.accountType ??
            "-"
          }
        />
      </SingleGridItem>
    </div>
  );
}

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

const columns: GridColDef<any[number]>[] = [
  // {
  //   field: "customerApplicationId",
  //   headerName: "ID",
  //   width: 35,
  //   sortable: false,
  // },
  {
    field: "fullName",
    headerName: "Owner's Name",
    sortable: false,
    minWidth: 120,
    flex: 1,
  },
  {
    field: "ownershipPercentage",
    headerName: "Ownership",
    sortable: false,
    minWidth: 120,
    valueGetter: (item: any, row) => `${item ?? 0}%`,
  },
  {
    field: "emailAddress",
    headerName: "Email",
    sortable: false,
    minWidth: 140,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    sortable: false,
    minWidth: 100,
  },

  {
    field: "ssnEncrypted",
    headerName: "SSN",
    sortable: false,
    minWidth: 120,
  },
];
