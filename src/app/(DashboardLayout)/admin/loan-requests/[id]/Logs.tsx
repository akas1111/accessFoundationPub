"use client";
import { ADMIN } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import { Divider, Skeleton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export default function RemarksLog({ loanId }: { loanId: string }) {
  const { at }: any = getUserData();
  const [loading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<any>(null);
  console.log(logs);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await axios.get(ADMIN.remarksLogs, {
          params: { customerApplicationId: loanId },
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        const data = resp?.data?.data ?? null;
        if (data) {
          setLogs(data);
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
  if (loading === false && logs == null) {
    return (
      <div className="border p-3">
        <Typography>Unable to load logs for this application.</Typography>
      </div>
    );
  }
  const columns: GridColDef<any[]>[] = [
    {
      field: "id",
      headerName: "SN",
      width: 35,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      minWidth: 180,
    },
    {
      field: "updatedDate",
      headerName: "Update Date",
      width: 150,
      valueGetter: (value, row) =>
        value
          ? moment(value ?? new Date()).format("MMM DD, YYYY h:mm a")
          : "N/A",
    },
    // {
    //   field: "updatedBy",
    //   headerName: "Updated By",
    //   sortable: false,
    //   minWidth: 180,
    //   maxWidth: 200,
    // },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
      minWidth: 180,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 100,
    //   renderCell: (params) => (
    //     <Chip
    //       label={params?.value}
    //       sx={{
    //         fontSize: 10,
    //         backgroundColor: getChipColor(params?.value),
    //         color: "#fff",
    //         fontWeight: 600,
    //       }}
    //       size="small"
    //     />
    //   ),
    // },
  ];
  return (
    <div className="">
      <Typography variant="h5" className="mb-3">
        Remarks Logs
      </Typography>
      <DataGrid
        loading={loading}
        rows={
          logs?.content?.map((item: any, index: number) => ({
            ...item,
            id: index + 1,
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
        //getRowId={(r) => r.customerApplicationId}
        sx={sx}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
      />
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
