"use client";
import React, { useCallback } from "react";
import { Button, Chip } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { UserContext } from "@/utils/UserContext";
import { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ADMIN } from "@/utils/endpoints";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import Link from "next/link";
import PageContainer from "../../_components/container/PageContainer";
import appEnums from "../../_components/dashboard/enums";
import { getChipColor } from "@/utils/helper";

export default function LoansApplications() {
  //pagination
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const { isLoading, data, error, refetch } = useFetchData(
    ADMIN.loanList,
    paginationModel.page,
    paginationModel.pageSize,
    true
  );
  console.log(data);

  const rowCountRef = React.useRef(data?.totalCount || 0);

  const rowCount = React.useMemo(() => {
    if (data?.totalCount !== undefined) {
      rowCountRef.current = data.totalCount;
    }
    return rowCountRef.current;
  }, [data?.totalCount]);

  const columns: GridColDef<any[number]>[] = [
    {
      field: "customerApplicationId",
      headerName: "ID",
      minWidth: 45,
      maxWidth: 55,
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
      maxWidth: 150,
      minWidth: 150,
      valueGetter: (value, row) =>
        moment(value ?? new Date()).format("MMM DD, YYYY h:mm a"),
    },
    {
      field: "loanInformation",
      headerName: "Loan Type",
      minWidth: 160,
      maxWidth: 170,
      valueGetter: (item: any, row) => item?.value ?? "-",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      maxWidth: 110,
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
      field: "loanProcessingStatus",
      headerName: "Loan Status",
      minWidth: 140,
      maxWidth: 140,
      renderCell: (params) => (
        <Chip
          label={appEnums?.[params?.value] ?? params?.value ?? "-"}
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
      minWidth: 80,
      maxWidth: 90,
      sortable: false,
      valueGetter: (value, row) => (value == null ? "-" : `$${value}`),
    },
    {
      field: "address",
      headerName: "Actions",
      minWidth: 85,
      maxWidth: 90,
      sortable: false,
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
    <PageContainer title="Loan Applications">
      <DashboardCard title="Loan Applications">
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            maxWidth: "100%",
            marginBottom: 30,
          }}
        >
          <DataGrid
            loading={isLoading}
            rows={data?.content ?? []}
            rowCount={rowCount}
            columns={columns}
            pageSizeOptions={[10, 15, 25]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            isCellEditable={() => false}
            getRowId={(r) => r.customerApplicationId}
            sx={sx}
          />
        </div>
      </DashboardCard>
      <div className="mt-4"></div>
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
  "& .MuiTablePagination-selectLabel": {
    margin: 0,
  },
};

// const getChipColor = (status: string) => {
//   let color = "primary.main";
//   switch (status) {
//     case "COMPLETED":
//       color = "success.main";
//       break;
//     case "PENDING":
//       color = "warning.main";
//       break;
//   }
//   return color;
// };

const useFetchData = (
  url: string,
  page: number = 1,
  pageSize: number = 10,
  autoFetch: boolean = true
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { at }: any = useContext(UserContext);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: AxiosResponse = await axios.get(url, {
        params: { page, size: pageSize },
        headers: { Authorization: `Bearer ${at}` },
      });
      setData(response?.data?.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData]);

  return { isLoading, data, error, refetch: fetchData };
};
