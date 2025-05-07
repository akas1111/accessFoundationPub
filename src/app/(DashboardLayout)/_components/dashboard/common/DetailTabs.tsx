import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function DetailTabs({
  activeTab,
  handleChange,
  steps,
}: {
  activeTab: number;
  handleChange: (e: React.SyntheticEvent, value: number) => void;
  steps: any[];
}) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        //bgcolor: "background.paper",
        //display: "flex",
        //height: 250,
        //backgroundColor: "#eee",
      }}
    >
      <Tabs
        //orientation="vertical"
        variant="scrollable"
        value={activeTab}
        onChange={handleChange}
        aria-label="Loan Detail Tabs"
        // sx={{ borderRight: 1, borderColor: "divider", backgroundColor: "#eee" }}
        sx={{
          //borderRight: 1,
          //borderLeft: 1,
          borderColor: "divider",

          backgroundColor: "#f1f1f1",
          "& .MuiTabs-indicator": {
            //backgroundColor: "#4570EA",
            //display: "none",
          },
        }}
      >
        {steps?.map((item, index) => (
          <Tab
            label={item?.label}
            {...a11yProps(index)}
            key={index + " " + item?.label}
            sx={{
              //alignItems: "flex-start",
              //borderBottom: "1px solid #eee",
              fontWeight: 600,
              "&.Mui-selected": {
                backgroundColor: "#5D87FF",
                color: "#FFFFFF",
              },
              //borderColor: "#5D87FF",
              //},
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
// const steps = [
//   { label: "Loan Information" },
//   { label: "Personal Information" },
//   { label: "Employment Information" },
//   { label: "Landlord Information" },
//   { label: "Business Information" },
//   { label: "Documents" },
// ];
