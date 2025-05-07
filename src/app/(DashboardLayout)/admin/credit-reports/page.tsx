"use client";
import React from "react";
import { Button, Chip } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { UserContext } from "@/utils/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ADMIN } from "@/utils/endpoints";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import Link from "next/link";
import PageContainer from "../../_components/container/PageContainer";

export default function CreditReports() {
  const data: any = useContext(UserContext);
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getChipColor = (status: string) => {
    let color = "primary.main";
    switch (status) {
      case "COMPLETED":
        color = "success.main";
        break;
      case "PENDING":
        color = "warning.main";
        break;
    }
    return color;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(ADMIN.creditReportList, {
          params: {
            page: 0,
            size: 20,
          },
          headers: { Authorization: `Bearer ${data?.at}` },
        });
        console.log(resp);
        const content = resp?.data?.data?.content ?? [];
        setLoans(content);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [data]);

  const columns: GridColDef<any[number]>[] = [
    {
      field: "customerApplicationId",
      headerName: "ID",
      width: 35,
      sortable: false,
    },
    {
      field: "customerApplicationName",
      headerName: "Customer",
      //description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 120,
      flex: 1,
      valueGetter: (value, row) => value ?? "- no name -",
    },
    {
      field: "createdDate",
      headerName: "Date",
      width: 100,
      //renderCell:(params)=> <div></div>,
      valueGetter: (value, row) =>
        moment(value ?? new Date()).format("MMM DD, YYYY"),
    },
    {
      field: "loanType",
      headerName: "Loan Type",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params?.value}
          sx={{
            fontSize: 10,
            backgroundColor: getChipColor(params?.value),
            color: "#fff",
          }}
          size="small"
        />
      ),
    },
    // {
    //   field: "loanAmountRequested",
    //   headerName: "Amount",
    //   width: 80,
    //   sortable: false,
    //   valueGetter: (value, row) => `$${value}`,
    // },
    {
      field: "address",
      headerName: "Actions",
      width: 85,
      renderCell: (params) => (
        <div>
          <Link
            href={`/admin/credit-reports/${
              params?.row?.customerApplicationId ?? null
            }`}
          >
            <Button variant="outlined" color="primary" size="small">
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <PageContainer title="Credit Report">
      <DashboardCard title="Credit Report">
        <Box>
          <DataGrid
            loading={loading}
            rows={loans}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
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
            //getRowId={(r) => r.customerApplicationId}
            sx={sx}
            // slotProps={{
            //   loadingOverlay: {
            //     variant: "skeleton",
            //     noRowsVariant: "skeleton",
            //   },
            // }}
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
