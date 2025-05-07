import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar, Fab, Button } from "@mui/material";
import { IconHeartHandshake } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";

const TotalLoan = ({ total, pending }: { total: number; pending: number }) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [38, 40, 25];

  return (
    <DashboardCard
      title="Total Applications"
      action={
        <Fab color="error" size="medium" sx={{ color: "#ffffff" }}>
          {/* <IconCurrencyDollar width={24} /> */}
          <IconHeartHandshake width={24} />
        </Fab>
      }
      //   footer={
      //     <Chart
      //       options={optionscolumnchart}
      //       series={seriescolumnchart}
      //       type="area"
      //       height={60}
      //       width={"100%"}
      //     />
      //   }
    >
      <>
        <Stack
          direction="row"
          //spacing={1}
          //my={1}
          alignItems="center"
          //justifyContent="space-between"
          mt="-20px"
        >
          <Typography variant="h3" fontWeight="700">
            {total}
          </Typography>
          {/* <Button
            className="fw-bold ms-2 py-0"
            LinkComponent={Link}
            href="/admin/loan-requests"
          >
            View All <ChevronRight />
          </Button> */}
        </Stack>
      </>
    </DashboardCard>
  );
};

export default TotalLoan;
