import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Typography, Fab } from "@mui/material";
import { IconDeviceIpadCheck } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";

const SubmittedRequests = ({ today }: { today: number }) => {
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

  return (
    <DashboardCard
      title="Submitted Applications"
      action={
        <Fab
          color="info"
          size="medium"
          sx={{ color: "#ffffff", backgroundColor: "#2ecc71" }}
        >
          <IconDeviceIpadCheck width={24} />
        </Fab>
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {today}
        </Typography>
      </>
    </DashboardCard>
  );
};

export default SubmittedRequests;
