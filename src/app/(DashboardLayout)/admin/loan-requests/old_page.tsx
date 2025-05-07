"use client";
import React from "react";
import { Button, Chip } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { UserContext } from "@/utils/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ADMIN } from "@/utils/endpoints";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import moment from "moment";
import Link from "next/link";
import PageContainer from "../../_components/container/PageContainer";

export default function MyLoans() {
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
        const resp = await axios.get(ADMIN.loanList, {
          params: {
            page: 0,
            size: 40,
          },
          headers: { Authorization: `Bearer ${data?.at}` },
        });
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

  const columns: GridColDef<any[]>[] = [
    {
      field: "customerApplicationId",
      headerName: "ID",
      maxWidth: 35,
      sortable: false,
    },
    {
      field: "firstName",
      headerName: "Loan For",
      //description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 120,
      flex: 1,
      //maxWidth: 200,
      valueGetter: (value, row) => value ?? "- no name -",
    },
    {
      field: "createdDate",
      headerName: "Date",
      maxWidth: 180,
      minWidth: 150,
      //renderCell:(params)=> <div></div>,
      valueGetter: (value, row) =>
        moment(value ?? new Date()).format("MMM DD, YYYY h:mm a"),
    },
    {
      field: "loanInformation",
      headerName: "Loan Type",
      maxWidth: 190,
      minWidth: 180,
      valueGetter: (item: any, row) => item?.value ?? "-",
    },
    {
      field: "status",
      headerName: "Status",
      maxWidth: 100,
      minWidth: 80,
      renderCell: (params) => (
        <Chip
          label={params?.value}
          sx={{
            fontSize: 10,
            backgroundColor: getChipColor(params?.value),
            color: "#fff",
            fontWeight: 600,
          }}
          size="small"
        />
      ),
    },
    {
      field: "loanAmountRequested",
      headerName: "Amount",
      maxWidth: 100,
      minWidth: 80,
      sortable: false,
      valueGetter: (value, row) => `$${value ?? "0"}`,
    },
    {
      field: "address",
      headerName: "Actions",
      maxWidth: 85,
      minWidth: 70,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Link
            href={`/admin/loan-requests/${
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
    <PageContainer title="Loan Applications">
      <DashboardCard title="Loan Applications">
        <div style={{ maxWidth: "100%" }}>
          <DataGrid
            disableColumnResize
            loading={loading}
            rows={loans}
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
            getRowId={(r) => r.customerApplicationId}
            sx={sx}
            // slotProps={{
            //   loadingOverlay: {
            //     variant: "skeleton",
            //     noRowsVariant: "skeleton",
            //   },
            // }}
          />
        </div>
      </DashboardCard>
    </PageContainer>
  );
}

const sx = {
  maxWidth: "100%",
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
