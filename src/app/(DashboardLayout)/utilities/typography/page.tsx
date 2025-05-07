"use client";
import React from "react";
import { Button, Chip } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { UserContext } from "@/utils/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import Link from "next/link";
import { toast } from "react-toastify";

export default function MyLoans() {
  const data: any = useContext(UserContext);
  const [reload, setReload] = useState<number>(0);
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(loans);

  const getChipColor = (status: string) => {
    let color = "primary.main";
    switch (status) {
      case "COMPLETED":
        color = "success.main";
        break;
      case "PENDING":
        color = "warning.main";
        break;
      case "CANCELLED":
        color = "grey.400";
        break;
    }
    return color;
  };

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
        if (Array.isArray(content)) {
          if (content.length > 0) {
            const lastEntry = content?.[0] ?? null;
            if (lastEntry) {
              if (
                ["COMPLETED", "DELETED", "CANCELLED"].includes(
                  lastEntry?.status
                )
              ) {
              }
            }
          } else {
          }
        }
        //console.log(resp);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [data, reload]);

  const deleteApplication = async (loanId: number) => {
    const check = window.confirm(
      `Are you sure you want to delete this application(#${loanId})?`
    );

    if (!check) return;
    try {
      await axios.post(
        USER.withdrawRequest,
        { id: loanId },
        { headers: { Authorization: `Bearer ${data?.at}` } }
      );
      setReload((r) => r + 1);
      toast.success("Application deleted successfully.");
    } catch (e) {
      toast.error("Error! Unable to delete.");
    } finally {
    }
  };

  const columns: GridColDef<any[number]>[] = [
    {
      field: "customerApplicationId",
      headerName: "ID",
      width: 35,
      sortable: false,
    },
    {
      field: "firstName",
      headerName: "Loan For",
      //description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 120,
      flex: 1,
      valueGetter: (value, row) => value ?? "- no name -",
    },
    {
      field: "createdDate",
      headerName: "Date",
      width: 150,
      //renderCell:(params)=> <div></div>,
      valueGetter: (value, row) =>
        moment(value ?? new Date()).format("MMM DD, YYYY h:mm a"),
    },
    {
      field: "loanInformation",
      headerName: "Loan Type",
      flex: 1,
      minWidth: 160,
      maxWidth: 200,
      valueGetter: (item: any, row: any) => item?.value,
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
    {
      field: "loanAmountRequested",
      headerName: "Amount",
      width: 80,
      sortable: false,
      valueGetter: (value, row) => `$${value ?? "0"}`,
    },
    {
      field: "address",
      headerName: "",
      width: 180,
      renderCell: (params) => {
        if (params?.row?.status === "COMPLETED") {
          return (
            <div className="d-flex justify-content-center align-items-center">
              <Link
                href={`/loan-request/${
                  params?.row?.customerApplicationId ?? null
                }`}
              >
                <Button variant="outlined" color="primary" size="small">
                  View
                </Button>
              </Link>
            </div>
          );
        }
        if (params?.row?.status === "PENDING") {
          return (
            <div className="d-flex justify-content-center align-items-center">
              <Link
                href={`/loan-new?action=continue&idx=${
                  params?.row?.customerApplicationId ?? ""
                }`}
              >
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  style={{ fontWeight: 500 }}
                >
                  Continue
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                size="small"
                className="ms-2"
                style={{ fontWeight: 500 }}
                //startIcon={<DeleteForeverOutlined />}
                onClick={() => {
                  deleteApplication(params?.row?.customerApplicationId ?? 0);
                }}
              >
                Delete
              </Button>
            </div>
          );
        }
        return <div></div>;
      },
    },
  ];
  return (
    // <DashboardCard title="My Loan Applications">
    <div style={{ maxWidth: "100%", display: "flex", flexDirection: "column" }}>
      <DataGrid
        // autoPageSize
        // disableAutosize
        //disableColumnResize
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
      {/* {selected != null && <CustomerLoanDetail loanId={selected} />} */}
    </div>
    // </DashboardCard>
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
