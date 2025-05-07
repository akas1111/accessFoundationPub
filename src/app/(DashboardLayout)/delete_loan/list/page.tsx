"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/_components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "@/utils/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";

export default function MyLoans() {
  const data: any = useContext(UserContext);
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(USER.loanList, {
          params: {
            page: 0,
            size: 20,
          },
          headers: { Authorization: `Bearer ${data?.at}` },
        });
        const content = resp?.data?.data?.content ?? [];
        setLoans(content);
        console.log(resp);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [data]);

  const columns: GridColDef<any[number]>[] = [
    { field: "customerApplicationId", headerName: "ID", width: 40 },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   //description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   minWidth: 150,
    //   flex: 1,
    //   valueGetter: (value, row) =>
    //     `${row.firstName || ""} ${row.lastName || ""}`,
    // },
    {
      field: "firstName",
      headerName: "Loan For",
      //description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 150,
      flex: 1,
      valueGetter: (value, row) => value ?? "- no name -",
    },
    {
      field: "createdDate",
      headerName: "Date",
      width: 120,
      //renderCell:(params)=> <div></div>,
      valueGetter: (value, row) =>
        moment(value ?? new Date()).format("MMM DD, YYYY hh:mm"),
    },
    {
      field: "loanInformation",
      headerName: "Loan Type",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "loanAmountRequested",
      headerName: "Amount",
      width: 80,
    },
  ];
  return (
    <PageContainer title="Loan Applications" description="">
      <DashboardCard title="My Loan Applications">
        {/* <div>Loan List</div> */}
        <Box>
          <DataGrid
            loading={loading}
            rows={loans}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
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
            getRowId={(r) => r.customerApplicationId}
            sx={sx}
            slotProps={{
              loadingOverlay: {
                variant: "skeleton",
                noRowsVariant: "skeleton",
              },
            }}
          />
        </Box>
      </DashboardCard>
    </PageContainer>
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
