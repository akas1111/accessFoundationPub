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
import { getChipColor } from "@/utils/helper";

export default function MyLoans() {
  const data: any = useContext(UserContext);
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(ADMIN.savingProgramsList, {
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

  const columns: GridColDef<any[number]>[] = [
    {
      field: "customerApplicationId",
      headerName: "ID",
      width: 45,
      sortable: false,
    },
    {
      field: "firstName",
      headerName: "Loan For",
      sortable: false,
      minWidth: 120,
      flex: 1,
      valueGetter: (value, row) => value ?? "-",
    },
    {
      field: "createdDate",
      headerName: "Date",
      width: 150,
      valueGetter: (value, row) =>
        moment(value ?? new Date()).format("MMM DD, YYYY h:mm a"),
    },
    {
      field: "loanInformation",
      headerName: "Loan Type",
      width: 160,
      valueGetter: (item: any, row) => item?.value ?? "-",
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
            fontWeight: 600,
          }}
          size="small"
        />
      ),
    },
    {
      field: "loanAmountRequested",
      headerName: "Amount",
      width: 80,
      sortable: false,
      valueGetter: (value, row) => (value == null ? "-" : `$${value}`),
    },
    {
      field: "address",
      headerName: "Actions",
      width: 85,
      renderCell: (params) => (
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
    <PageContainer title="Saving Programs">
      <DashboardCard title="Saving Programs">
        <Box>
          <DataGrid
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
