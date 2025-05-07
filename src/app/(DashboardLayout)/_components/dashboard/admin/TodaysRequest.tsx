import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Fab, Button } from "@mui/material";
import {
  IconArrowDownRight,
  IconCalendar,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import Link from "next/link";
import { ChevronRight } from "@mui/icons-material";

const TodaysRequest = ({ today }: { today: number }) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = "#f5fcff";
  const errorlight = "#fdede8";

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const seriescolumnchart: any = [
    {
      name: "",
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Today's Applications"
      action={
        <Fab color="secondary" size="medium" sx={{ color: "#ffffff" }}>
          <IconCalendar width={24} />
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
        <Stack direction="row" alignItems="center" mt="-20px">
          <Typography variant="h3" fontWeight="700">
            {today}
          </Typography>
          <Button
            className="fw-bold ms-2 py-0"
            LinkComponent={Link}
            href="/admin/loan-requests"
          >
            View All <ChevronRight />
          </Button>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default TodaysRequest;
