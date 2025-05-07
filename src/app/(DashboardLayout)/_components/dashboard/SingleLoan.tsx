import { useState, ReactNode, SyntheticEvent, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ShowLoanInfo from "../../_views/LoanDetails";
import ShowPersonalInfo from "../../_views/PersonalInfo";
import ShowEmploymentInfo from "../../_views/EmploymentInfo";
import ShowLandlordInfo from "../../_views/LandlordInfo";
import { ArrowForward } from "@mui/icons-material";
import ShowDocuments from "../../_views/Documents";
import ShowBusinessInfo from "../../_views/BusinessInfo";
import ShowSavingProgram from "../../_views/SavingProgramInfo";
import ShowBankInfo from "../../_views/BankInfo";

interface TabPanelProps {
  children?: ReactNode;
  id: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, id, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id={`vertical-tabpanel-${id}`}
      aria-labelledby={`vertical-tab-${id}`}
      {...other}
      style={{ flex: 1 }}
    >
      {value === id && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function SingleDetailTabs({ data }: { data: any }) {
  console.log(data);
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const [tabsList, setTabsList] = useState<any[]>([]);
  const loanType = data?.customerApplication?.loanInformation ?? null;

  useEffect(() => {
    const filtered = steps.filter((item) => {
      if (item?.loanType == null) {
        if (item?.id === 1 && loanType === "SAVING_PROGRAM") {
          return false;
        } else {
          return true;
        }
      }
      return item?.loanType === loanType;
    });
    setTabsList(filtered);
  }, [loanType]);
  const activeTabObjectId = tabsList?.[activeTab]?.id ?? 0;
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Tabs
        variant="scrollable"
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Vertical tabs example"
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
        {tabsList?.map((item, index) => (
          <Tab
            label={item?.label}
            {...a11yProps(index)}
            key={index + " " + item?.id}
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
      <TabPanel value={activeTabObjectId} id={0}>
        <ShowSavingProgram data={data?.savingProgram ?? null} />
      </TabPanel>
      <TabPanel value={activeTabObjectId} id={1}>
        <ShowLoanInfo
          data={data?.customerApplication ?? null}
          showSign={true}
        />
      </TabPanel>
      <TabPanel value={activeTabObjectId} id={2}>
        <ShowPersonalInfo data={data?.personalInformation ?? null} />
      </TabPanel>
      <TabPanel value={activeTabObjectId} id={3}>
        <ShowEmploymentInfo data={data?.employmentInformation ?? null} />
      </TabPanel>
      <TabPanel value={activeTabObjectId} id={4}>
        <ShowBusinessInfo data={data?.smallBusinessLoanInformation ?? null} />
      </TabPanel>
      <TabPanel value={activeTabObjectId} id={5}>
        <ShowLandlordInfo data={data?.landlordInformation ?? null} />
      </TabPanel>
      <TabPanel value={activeTabObjectId} id={6}>
        <ShowDocuments data={data?.documentUpload ?? null} />
      </TabPanel>
      <TabPanel value={activeTabObjectId} id={7}>
        <ShowBankInfo data={data?.bankingInformation ?? null} />
      </TabPanel>{" "}
      <button
        className={`btn btn-primary d-flex align-items-center ${
          activeTab >= tabsList.length - 1 ? "d-none" : ""
        }`}
        style={{ gap: 5 }}
        onClick={() => {
          if (activeTab < tabsList.length - 1) {
            setActiveTab((v) => v + 1);
          }
        }}
        disabled={activeTab >= tabsList.length - 1}
      >
        Next <ArrowForward sx={{ fontSize: 18 }} />
      </button>
    </Box>
  );
}

const steps = [
  { id: 0, label: "Saving Program", loanType: "SAVING_PROGRAM" },
  { id: 1, label: "Loan Information" },
  { id: 2, label: "Personal Information" },
  { id: 3, label: "Employment Information" },
  { id: 4, label: "Business Information", loanType: "SMALL_BUSINESS_LOAN" },
  { id: 5, label: "Landlord Information", loanType: "EMERGENCY_LOAN" },
  { id: 6, label: "Documents" },
  { id: 7, label: "Banking Information" },
];
