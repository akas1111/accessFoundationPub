"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { ADMIN, ROLES, USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import PageContainer from "@/app/(DashboardLayout)/_components/container/PageContainer";
import moment from "moment";
import BlankCard from "@/app/(DashboardLayout)/_components/shared/BlankCard";
import { toast } from "react-toastify";
import DetailTabs from "@/app/(DashboardLayout)/_components/dashboard/common/DetailTabs";
import ShowPersonalInfo from "@/app/(DashboardLayout)/_views/PersonalInfo";
import ShowEmploymentInfo from "@/app/(DashboardLayout)/_views/EmploymentInfo";
import ShowLandlordInfo from "@/app/(DashboardLayout)/_views/LandlordInfo";
import ShowDocuments from "@/app/(DashboardLayout)/_views/Documents";
import { ArrowForward, CheckCircle, RemoveCircle } from "@mui/icons-material";
import ShowBusinessInfo from "@/app/(DashboardLayout)/_views/BusinessInfo";
import ShowPlaidData from "@/app/(DashboardLayout)/_views/PlaidData";
import { useRouter } from "next/navigation";
import CreditReport from "./CreditReport";
import appEnums from "@/app/(DashboardLayout)/_components/dashboard/enums";
import ShowBankInfo from "@/app/(DashboardLayout)/_views/BankInfo";
import ShowSavingProgram from "@/app/(DashboardLayout)/_views/SavingProgramInfo";
import { useForm } from "react-hook-form";
import RemarksLog from "./Logs";
import { DocumentRequestAdmin } from "./DocRequest";

export default function AdminLoanDetail({
  params,
}: {
  params: { id: string };
}) {
  const { at, role = "" }: any = getUserData();
  const [reload, setReload] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  console.log(data);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const statusList = data?.statusResponses ?? [];
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    defaultValues: {
      status: "",
      remarks: null,
    },
    mode: "onChange",
  });

  //tabs
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const [tabsList, setTabsList] = useState<any[]>([]);
  const loanType = data?.customerApplication?.loanInformation ?? null;

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await axios.post(
          ADMIN.loanDetail,
          { id: params?.id },
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
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    if (params?.id) {
      loadData();
    }
  }, [params, reload]);

  const submitStatus = async (fields: any) => {
    try {
      setSaving(true);
      fields.customerApplicationId = data?.customerApplication?.id ?? null;
      const resp = await axios.post(ADMIN.updateStatus, fields, {
        headers: { Authorization: `Bearer ${at}` },
      });
      toast.success("Success, status updated.");
      setReload((r) => r + 1);
      reset();
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? "Update failed.";
      toast.error(msg);
      console.log(e);
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    const filtered = steps.filter((item) => {
      //hide credit report and logs if SAVING PROGRAM
      if (loanType === "SAVING_PROGRAM" && [8, 10].includes(item.id)) {
        return false;
      }
      if (item?.loanType == null) return true;
      //show only if exact type match
      return item?.loanType === loanType;
    });
    setTabsList(filtered);
  }, [loanType]);

  if (loading) {
    return (
      <PageContainer title="View Application">
        <DashboardCard title="View Loan Application">
          <>
            <Skeleton variant="rectangular" height={50} className="mb-3" />
            <Skeleton variant="text" height={30} width={220} className="mb-3" />
            <Skeleton variant="rectangular" height={200} className="mb-3" />
          </>
        </DashboardCard>
      </PageContainer>
    );
  }

  const activeTabObjectId = tabsList?.[activeTab]?.id ?? 0;

  const deleteApplication = async () => {
    if (window.confirm("Are you sure to delete this application?")) {
      try {
        const resp = await axios.get(ADMIN.deleteApplication, {
          params: { id: params?.id },
          headers: { Authorization: `Bearer ${at}` },
        });
        console.log(resp);
        toast.success("Application deleted.");
        router.push("/");
      } catch (e) {
        console.log(e);
        toast.error("Error! delete failed.");
      }
    }
  };
  //show status update form and doc request
  const showStatusAndDocReq = !["PENDING", "CANCELLED", "DELETED"].includes(
    data?.customerApplication?.applicationStatus
  );
  //show status update form to superadmin only if REJECTED
  const showStatusForAdmin =
    data?.customerApplication?.loanProccessingStatus === "REJECTED" &&
    role !== ROLES.superadmin
      ? false
      : true;
  return (
    <div>
      <PageContainer title="View Application">
        <div>
          {data?.customerApplication?.plaidStatus === "COMPLETED" && (
            <div
              className="d-flex p-3 text-success border border-success mb-3 align-items-center"
              style={{ gap: 8 }}
            >
              <CheckCircle />
              <Typography sx={{ fontWeight: 500 }}>
                Plaid identity verification for this request has been
                successfully completed.
              </Typography>
            </div>
          )}
          {data?.customerApplication?.plaidStatus === "FAILED" && (
            <div
              className="d-flex p-3 text-danger border border-danger mb-3 align-items-center"
              style={{ gap: 8 }}
            >
              <RemoveCircle />
              <Typography sx={{ fontWeight: 500 }}>
                Plaid identity verification for this request was failed.
              </Typography>
            </div>
          )}
        </div>
        <DashboardCard>
          <>
            <Typography variant="h5">
              Loan Application Request {params?.id ? `(#${params.id})` : ""}
            </Typography>
            <Divider
              sx={{
                borderColor: "primary.main",
                width: 100,
                borderWidth: 2,
                opacity: "0.75",
                marginTop: 1,
                marginBottom: 3,
              }}
            />
            <Grid
              container
              //style={{ alignItems: "none" }}
              gap={0}
            >
              <Grid
                item
                xs={12}
                md={8}
                className="d-flex flex-wrap"
                //alignItems="stretch"
                style={{ minHeight: 220 }}
                gap={2}
                order={{ xs: 2, md: 1 }}
              >
                <SingleGeneralInfo
                  title="Loan Type"
                  text={
                    appEnums?.[data?.customerApplication?.loanInformation] ??
                    data?.customerApplication?.loanInformation ??
                    "-"
                  }
                />
                <SingleGeneralInfo
                  title="Amount"
                  text={`$${
                    data?.customerApplication?.loanAmountRequested ?? "0"
                  }`}
                />
                <SingleGeneralInfo
                  title="Loan Purpose"
                  text={
                    appEnums?.[data?.customerApplication?.purposeOfLoan] ??
                    data?.customerApplication?.purposeOfLoan ??
                    "-"
                  }
                  //text={data?.customerApplication?.?.value ?? "-"}
                />
                <SingleGeneralInfo
                  title="Loan Term"
                  text={
                    appEnums?.[data?.customerApplication?.loanTerm] ??
                    data?.customerApplication?.loanTerm ??
                    "-"
                  }
                />
                <SingleGeneralInfo
                  title="REQUEST DATE"
                  text={moment(
                    data?.customerApplication?.applicationSubmittedDate ??
                      new Date()
                  ).format("MMM DD, YYYY")}
                />
                {/* <SingleGeneralInfo
                  title="Application status"
                  text={data?.customerApplication?.applicationStatus ?? "N/A"}
                /> */}
                <div className="" style={{ minWidth: 120 }}>
                  <Typography
                    variant="body2"
                    className="text-uppercase"
                    // color="text.secondary"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                    color="grey.400"
                  >
                    Application Status
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: getStatusColor(
                        data?.customerApplication?.applicationStatus ?? "-"
                      ),
                    }}
                  >
                    {data?.customerApplication?.applicationStatus ?? "N/A"}
                  </Typography>
                </div>
                <SingleGeneralInfo
                  title="Loan status"
                  text={
                    appEnums?.[
                      data?.customerApplication?.loanProccessingStatus
                    ] ??
                    data?.customerApplication?.loanProccessingStatus ??
                    "N/A"
                  }
                />
                <div className="" style={{ width: "100%" }}>
                  <Typography
                    variant="body2"
                    className="text-uppercase fw-bold text-secondary"
                  >
                    Reason for Loan
                  </Typography>
                  <Typography className="fw-bold">
                    {data?.customerApplication?.reasonForLoan ?? "-"}
                  </Typography>
                </div>
                {data?.customerApplication?.signature && (
                  <CustomerSignature
                    signToken={data?.customerApplication?.signature}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
                {showStatusAndDocReq &&
                  data?.trackingAllowed === true &&
                  showStatusForAdmin && (
                    <div className="mb-3">
                      <BlankCard>
                        <div className="">
                          <Typography
                            //variant="body1"
                            className="text-uppercase p-3 border-bottom"
                            sx={{
                              bgcolor: "grey.200",
                              mb: 2,
                              fontWeight: 600,
                              fontSize: "0.9375rem",
                            }}
                          >
                            Manage Application Status
                          </Typography>
                          {/* <Divider
                        sx={{ borderColor: "#ddd", opacity: 1, my: 2 }}
                      /> */}
                          <form
                            onSubmit={handleSubmit(submitStatus)}
                            className="px-3 pb-3"
                          >
                            <div className="mb-3">
                              <Typography>Select new Status</Typography>
                              <select
                                className="form-select"
                                {...register("status", {
                                  required: "Status is required.",
                                })}
                              >
                                <option value="" disabled>
                                  Select New Status
                                </option>
                                {statusList?.map((item: any, index: number) => (
                                  <option
                                    value={item?.name}
                                    key={item?.name + " " + index}
                                  >
                                    {item?.label ?? ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-3">
                              <Typography>Remarks*</Typography>
                              <textarea
                                className="form-control"
                                {...register("remarks", {
                                  required: "Remarks is required",
                                })}
                              ></textarea>
                            </div>
                            <button
                              className="btn btn-primary"
                              disabled={saving || !isValid}
                            >
                              {saving ? "Saving..." : "Save Changes"}
                            </button>
                          </form>
                        </div>
                      </BlankCard>
                    </div>
                  )}
              </Grid>
            </Grid>
            <DetailTabs
              activeTab={activeTab}
              handleChange={handleTabChange}
              steps={tabsList}
            />
            <TabPanel value={activeTabObjectId} id={0}>
              <ShowSavingProgram data={data?.savingProgram ?? null} />
            </TabPanel>
            <TabPanel value={activeTabObjectId} id={1}>
              <ShowPersonalInfo data={data?.personalInformation ?? null} />
            </TabPanel>
            <TabPanel value={activeTabObjectId} id={2}>
              <ShowEmploymentInfo data={data?.employmentInformation ?? null} />
            </TabPanel>

            <TabPanel value={activeTabObjectId} id={3}>
              <ShowBusinessInfo
                data={data?.smallBusinessLoanInformation ?? null}
              />
            </TabPanel>
            <TabPanel value={activeTabObjectId} id={4}>
              <ShowLandlordInfo data={data?.landlordInformation ?? null} />
            </TabPanel>
            <TabPanel value={activeTabObjectId} id={5}>
              <ShowDocuments data={data?.documentUpload ?? null} />
            </TabPanel>
            <TabPanel value={activeTabObjectId} id={6}>
              <ShowPlaidData
                data={
                  data?.customerApplication?.plaidIntegrationResponse ?? null
                }
              />
            </TabPanel>
            <TabPanel value={activeTabObjectId} id={7}>
              {showStatusAndDocReq ? (
                <DocumentRequestAdmin loanId={params?.id} />
              ) : (
                <div className="border p-3">
                  <Typography>
                    Document request not available for this application.
                  </Typography>
                </div>
              )}
            </TabPanel>
            <TabPanel value={activeTabObjectId} id={8}>
              <CreditReport loanId={params?.id} />
            </TabPanel>
            <TabPanel value={activeTabObjectId} id={9}>
              <ShowBankInfo data={data?.bankingInformation ?? null} />
            </TabPanel>
            <TabPanel value={activeTabObjectId} id={10}>
              <RemarksLog loanId={params?.id} />
            </TabPanel>

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
            <div className="mt-4 d-flex justify-content-end">
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  deleteApplication();
                }}
              >
                Delete Application
              </button>
            </div>
          </>
        </DashboardCard>
      </PageContainer>
    </div>
  );
}

const SingleGeneralInfo = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <div className="" style={{ minWidth: 120 }}>
      <Typography
        variant="body2"
        className="text-uppercase"
        // color="text.secondary"
        sx={{ fontWeight: 600, mb: 0.5 }}
        color="grey.400"
      >
        {title}
      </Typography>
      <Typography variant="h6">{text}</Typography>
    </div>
  );
};

const getStatusColor = (status: string) => {
  let color = "primary.main";
  switch (status) {
    case "COMPLETED":
      color = "#27ae60";
      break;
    case "PENDING":
      color = "#e67e22";
      break;
  }
  return color;
};

interface TabPanelProps {
  children?: React.ReactNode;
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
const steps = [
  { id: 0, label: "Saving Program", loanType: "SAVING_PROGRAM" },
  { id: 1, label: "Personal Information" },
  { id: 2, label: "Employment Information" },
  { id: 3, label: "Business Information", loanType: "SMALL_BUSINESS_LOAN" },
  { id: 4, label: "Landlord Information", loanType: "EMERGENCY_LOAN" },
  { id: 5, label: "Documents" },
  { id: 6, label: "Identity Check" },
  { id: 7, label: "Document Request" },
  { id: 8, label: "Credit Report" },
  { id: 9, label: "Banking Information" },
  { id: 10, label: "Logs" },
];

const CustomerSignature = ({ signToken }: { signToken: string }) => {
  const { at }: any = getUserData();
  const [file, setFile] = useState<{ src: string; fileType: string } | null>(
    null
  );
  useEffect(() => {
    const loadDoc = async (docToken: string) => {
      try {
        const resp = await axios.get(USER.getFileUrl, {
          params: {
            token: docToken,
          },
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        console.log(resp);
        const fileData = resp?.data?.data ?? null;
        if (fileData) {
          setFile({
            src: fileData?.file ?? null,
            fileType: fileData?.fileType ?? "",
          });
          console.log(fileData);
        }
      } catch (e) {
        console.log("Unable to load signature.");
      }
    };
    loadDoc(signToken);
  }, []);
  if (file?.fileType === "IMAGE") {
    return (
      <div className="mt-2 mb-3">
        <Typography variant="h6" className="mb-2">
          Customer&apos;s Signature
        </Typography>
        <img
          src={file?.src}
          alt="Signature"
          width={200}
          className="border"
          draggable={false}
        />
      </div>
    );
  } else {
    return <></>;
  }
};
