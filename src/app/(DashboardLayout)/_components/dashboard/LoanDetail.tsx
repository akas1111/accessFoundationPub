import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import { Divider, FormLabel } from "@mui/material";
import ShowPersonalInfo from "../../_views/PersonalInfo";
import LoanInfo from "../../_forms/loan-forms/LoanInfo";
import ShowLoanInfo from "../../_views/LoanDetails";
import ViewSingleLoan from "./SingleLoan";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 400,
  width: "90%",
  maxWidth: 968,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

export default function CustomerLoanDetail({ loanId }: { loanId: number }) {
  const { at }: any = getUserData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const targetRef = useRef(null);

  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("1");

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await axios.post(
          USER.loanDetailC,
          { id: loanId },
          {
            headers: {
              Authorization: `Bearer ${at}`,
            },
          }
        );
        const allData = resp?.data?.data ?? null;
        if (allData) {
          setData(allData);
        }
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, [loanId]);

  return (
    <div ref={targetRef}>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        //container={targetRef.current}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            className="mb-3"
          >
            View Application Details
          </Typography>
          <Divider />
          {/* <div className="my-3">
            <FormLabel>Select Information</FormLabel>
            <select
              className="form-select"
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement)?.value;
                setActiveTab(value);
              }}
            >
              {steps?.map((item, index) => (
                <option key={item?.id + " " + index} value={item?.id}>
                  {item?.label ?? ""}
                </option>
              ))}
            </select>
          </div> */}
          {/* {activeTab === "1" && (
            <ShowLoanInfo data={data?.customerApplication ?? null} />
          )}
          {activeTab === "2" && (
            <ShowPersonalInfo data={data?.personalInformation ?? null} />
          )} */}
          <ViewSingleLoan data={data} />
        </Box>
      </Modal>
    </div>
  );
}

const steps = [
  { id: "1", label: "Loan Information" },
  { id: "2", label: "Personal Information" },
  { id: "3", label: "Personal Information - Continue" },
  { id: "4", label: "Employment Information" },
  { id: "5", label: "Landlord Information" },
  { id: "6", label: "Upload Documents" },
  { id: "7", label: "Confirmation" },
];
