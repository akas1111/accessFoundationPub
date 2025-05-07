import React, { useState, useRef, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import { useRouter } from "next/navigation";
import MyLoadingButton, { BackButton } from "../elements/Common";
import { apiErrorToToast } from "@/utils/helper";
import { toast } from "react-toastify";
// import DocusignModal from "./DocusignForm";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import FormPreview from "./FormPreview";
import SignatureCanvas from "react-signature-canvas";
import FormPreview from "./FormPreview";
import BlankCard from "../../_components/shared/BlankCard";
import MyRadioInput from "../elements/MyRadioInput";
import appEnums from "../../_components/dashboard/enums";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// @ts-ignore
pdfMake.vfs = pdfFonts?.pdfMake?.vfs;

type PInfoProps = {
  loanId: number | null;
  previousStep: () => void;
  loanData: any;
  steps: any[];
  gotoStep: (index: number) => void;
};

export default function ConfirmationStep({
  loanId,
  previousStep,
  loanData,
  steps,
  gotoStep,
}: PInfoProps) {
  const [saving, setSaving] = useState<boolean>(false);
  const { at }: any = getUserData();

  const sigCanvas = useRef<SignatureCanvas>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [signBase64, setSignBase64] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tcAgree: "yes",
    },
  });
  // const generateDocusignUrl = async () => {
  //   setSaving(true);
  //   try {
  //     const resp = await axios.post(
  //       USER.newLoan,
  //       {
  //         stage: "COMPLETE_INFORMATION",
  //         id: loanId,
  //         completeApplicationRequest: {
  //           //...data,
  //           //signature: "signature_iohcjndkscnds",
  //           signatureType: "SIGNATURE_INITIATED",
  //           redirectUri: window.location.origin + "/static/loading",
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${at}`,
  //         },
  //       }
  //     );
  //     console.log(resp?.data?.data);
  //     const docUrl = resp?.data?.data?.redirectUrl ?? null;
  //     if (docUrl) {
  //       console.log(docUrl);
  //       setSignUrl(docUrl);
  //       handleClose();
  //     }
  //   } catch (e: any) {
  //     apiErrorToToast(e);
  //     console.log(e?.response ?? e);
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const generateAndPreviewPDF = (ld: any) => {
    const formatted: any = {};
    const loanInfo = ld?.customerApplication ?? null;
    if (loanInfo) {
      formatted.general = [
        {
          label: "Loan Type",
          value:
            appEnums?.[loanInfo?.loanInformation] ??
            loanInfo?.loanInformation ??
            "-",
        },
        {
          label: "Loan Amount",
          value: `$${loanInfo?.loanAmountRequested ?? "0"}`,
        },
        {
          label: "Loan Term",
          value: appEnums?.[loanInfo?.loanTerm] ?? loanInfo?.loanTerm ?? "-",
        },
        {
          label: "Loan Purpose",
          value:
            appEnums?.[loanInfo?.purposeOfLoan] ??
            loanInfo?.purposeOfLoan ??
            "-",
        },
        {
          label: "Reason for Loan",
          value: loanInfo?.reasonForLoan ?? "-",
          width: "100%",
        },
      ];
    }
    const personalInfo = ld?.personalInformation ?? null;
    if (personalInfo) {
      formatted.personal = [
        {
          label: "First Name",
          value: personalInfo?.firstName ?? "-",
        },
        {
          label: "Middle Name",
          value: personalInfo?.middleName ?? "-",
        },
        {
          label: "Last Name",
          value: personalInfo?.lastName ?? "-",
        },
        {
          label: "Phone",
          value: personalInfo?.phoneNumber ?? "-",
        },
        {
          label: "Address",
          value: personalInfo?.address ?? "-",
          width: "50%",
        },
        {
          label: "Email",
          value: personalInfo?.email ?? "-",
          width: "50%",
        },
      ];
      formatted.residence = [
        {
          label: "Type of Residence",
          value:
            appEnums?.[personalInfo?.typeOfResidence] ??
            personalInfo?.typeOfResidence ??
            "-",
        },
        {
          label: "Years In Residence",
          value: `${personalInfo?.yearsInResidence ?? "0"} years`,
        },
        {
          label: "Civil Status",
          value:
            appEnums?.[personalInfo?.civilStatus] ??
            personalInfo?.civilStatus ??
            "-",
        },
        {
          label: "Dependents",
          value: personalInfo?.numberOfDependents ?? "-",
        },
        {
          label: "Monthly Rent",
          value: `$${personalInfo?.monthlyRent ?? "0"}`,
        },
        {
          label: "Total Monthly Expenses",
          value: `$${personalInfo?.totalMonthlyExpenses ?? "0"}`,
        },
      ];
    }
    const employmentInfo = ld?.employmentInformation ?? null;
    if (employmentInfo) {
      formatted.employment = [
        {
          label: "Source of Income",
          value:
            appEnums?.[employmentInfo?.sourceOfIncome] ??
            employmentInfo?.sourceOfIncome ??
            "-",
        },
        {
          label: "Occupation",
          value: employmentInfo?.occupation ?? "-",
        },
        {
          label: "Job Position/Title",
          value: employmentInfo?.jobPositionTitle ?? "-",
        },
        {
          label: "Years with the Company",
          value: employmentInfo?.yearsWithCompany ?? "-",
        },
        {
          label: "Company Name",
          value: employmentInfo?.companyName ?? "-",
        },
        {
          label: "Company Address",
          value: employmentInfo?.companyName ?? "-",
        },
        {
          label: "Monthly Gross Income",
          value: `$${employmentInfo?.monthlyGrossIncome ?? "-"}`,
        },
        {
          label: "Previous Employment",
          value: employmentInfo?.previousEmployment ?? "-",
        },
      ];
    }

    const bankingInfo = ld?.bankingInformation ?? null;
    if (bankingInfo) {
      formatted.banking = [
        {
          label: "Have Bank Account",
          value: bankingInfo?.haveBankAccount === true ? "Yes" : "No",
        },
        {
          label: "Account Type",
          value:
            appEnums?.[bankingInfo?.bankingAccountType] ??
            bankingInfo?.bankingAccountType ??
            "-",
        },
        {
          label: "Bank Name",
          value: bankingInfo?.bankName ?? "-",
        },
        {
          label: "Account Number",
          value: bankingInfo?.accountNumber ?? "-",
        },
        {
          label: "Routing Number",
          value: bankingInfo?.routingNumber ?? "-",
        },
        {
          label: "Checking Balance",
          value: `$${bankingInfo?.checkingBalance ?? "0"}`,
        },
        {
          label: "Saving Balance",
          value: `$${bankingInfo?.savingBalance ?? "0"}`,
        },
        {
          label: "Other Balance",
          value: `$${bankingInfo?.other ?? "0"}`,
        },
      ];
    }

    const savingPInfo = ld?.savingProgram ?? null;
    if (savingPInfo) {
      formatted.saving = [
        {
          label: "Have Emergency Saving",
          value: savingPInfo?.haveEmergencySaving === true ? "Yes" : "No",
        },
        {
          label: "Saving per Month",
          value: `$${savingPInfo?.savePerMonth ?? 0}`,
        },
        {
          label: "Saving Account",
          value:
            appEnums?.[savingPInfo?.savingAccount] ??
            savingPInfo?.savingAccount ??
            "-",
        },
        {
          label: "Target Months",
          value:
            appEnums?.[savingPInfo?.targetMonth] ??
            savingPInfo?.targetMonth ??
            "-",
        },
      ];
    }
    const landlordInfo = ld?.landlordInformation ?? null;
    if (landlordInfo) {
      formatted.landlord = [
        {
          label: "Landlord or Company",
          value: landlordInfo?.landlordOrCompanyName ?? "-",
        },
        {
          label: "Address",
          value: landlordInfo?.address ?? "-",
        },
        {
          label: "Postal Code",
          value: landlordInfo?.companyPostalCode ?? "-",
        },
        {
          label: "Phone Number",
          value: landlordInfo?.phoneNumber ?? "-",
        },
        {
          label: "Email",
          value: landlordInfo?.email ?? "-",
        },
        {
          label: "Manager Name",
          value: landlordInfo?.managerName ?? "-",
        },
      ];
    }

    const generalData = createChunkForCol(formatted?.general ?? [], 4);
    const generalInfoRows = generalData.map(createSingleCol);

    const personalData = createChunkForCol(formatted?.personal ?? [], 4);
    const personalInfoRows = personalData.map(createSingleCol);

    const residenceData = createChunkForCol(formatted?.residence ?? [], 4);
    const residenceInfoRows = residenceData.map(createSingleCol);

    const employmentData = createChunkForCol(formatted?.employment ?? [], 4);
    const employmentInfoRows = employmentData.map(createSingleCol);

    //saving program
    let savingProgramRows = null;
    if (formatted?.saving) {
      const savingPData = createChunkForCol(formatted?.saving ?? [], 4);
      savingProgramRows = savingPData.map(createSingleCol);
    }

    //banking
    const bankingData = createChunkForCol(formatted?.banking ?? [], 4);
    const bankingInfoRows = bankingData.map(createSingleCol);

    //landlord
    let landlordRows = null;
    if (formatted?.landlord) {
      const landlordData = createChunkForCol(formatted?.landlord ?? [], 4);
      landlordRows = landlordData.map(createSingleCol);
    }

    const docDefinition = {
      content: [
        //add image maybe
        {
          text: "Axcess Foundation Loan Application\n\n",
          fontSize: 18,
          bold: true,
        },
        //{ text: "This PDF will be previewed before downloading.\n\n" },
        //{ text: "Loan Information\n", style: "section" },
        //saving program or loan info genera
        {
          ...(Array.isArray(savingProgramRows)
            ? { text: "Saving Program Information\n", style: "section" }
            : { text: "Loan Information\n", style: "section" }),
        },
        //...generalInfoRows,
        //manage loan info
        ...(loanInfo?.loanInformation === "SAVING_PROGRAM"
          ? []
          : generalInfoRows),
        //manage saving program
        ...(Array.isArray(savingProgramRows) ? savingProgramRows : []),

        { text: "\nPersonal Information\n", style: "section" },
        ...personalInfoRows,
        ...residenceInfoRows,
        { text: "\nEmployment Information\n", style: "section" },
        ...employmentInfoRows,
        { text: "\nBanking Information\n", style: "section" },
        ...bankingInfoRows,
        {
          ...(Array.isArray(landlordRows)
            ? { text: "\nLandlord Information\n", style: "section" }
            : {}),
        },
        ...(Array.isArray(landlordRows) ? landlordRows : []),

        { text: "\nSignature\n", style: "section" },
        signBase64
          ? { image: signBase64, width: 80, height: 40 }
          : { text: "No signature added", italics: true },
      ],
      styles: {
        //property
        section: { fontSize: 15, bold: true },
        pTitle: { fontSize: 10, width: 100 },
        pBody: { bold: true },
      },
    };

    // Open the PDF in a new tab for preview
    // @ts-ignore
    //pdfMake.createPdf(docDefinition).open();
    // @ts-ignore
    pdfMake.createPdf(docDefinition).getBlob(async (pdfBlob) => {
      const formData = new FormData();
      formData.append("file", pdfBlob, "document.pdf");
      formData.append("id", String(loanId));
      let pdfToken = null;
      try {
        setSaving(true);
        const resp = await axios.post(USER.uploadSummary, formData, {
          headers: {
            Authorization: `Bearer ${at}`,
            "Content-Type": "multipart/form-data",
          },
        });
        pdfToken = resp?.data?.data?.file ?? null;
        toast.success("Success, PDF uploaded.");
      } catch (e: any) {
        apiErrorToToast(e);
        console.log(e?.response ?? e);
      } finally {
        setSaving(false);
      }

      if (pdfToken) {
        setSaving(true);
        try {
          await axios.post(
            USER.newLoan,
            {
              stage: "COMPLETE_INFORMATION",
              id: loanId,
              completeApplicationRequest: {
                signature: pdfToken, //pdf token
              },
            },
            {
              headers: {
                Authorization: `Bearer ${at}`,
              },
            }
          );
          toast.success("Success, application submitted.");
          router.push("/");
        } catch (e: any) {
          apiErrorToToast(e);
          console.log(e?.response ?? e);
        } finally {
          setSaving(false);
        }
      }
    });
  };
  const onFormSubmit = async (data: any) => {
    generateAndPreviewPDF(loanData);
    return;
    setSaving(true);
    try {
      if (!imageFile) {
        toast.error("Error! Signature not verified.");
        return;
      }
      //upload signature
      const signToken = await uploadSignature(imageFile);
      if (signToken) {
        const resp = await axios.post(
          USER.newLoan,
          {
            stage: "COMPLETE_INFORMATION",
            id: loanId,
            completeApplicationRequest: {
              signature: signToken, //signature token
            },
          },
          {
            headers: {
              Authorization: `Bearer ${at}`,
            },
          }
        );
        toast.success("Success, application submitted.");
        router.push("/");
      } else {
        toast.error("Error! Signature save failed. Try again.");
      }
    } catch (e: any) {
      apiErrorToToast(e);
      console.log(e?.response ?? e);
    } finally {
      setSaving(false);
    }
    //handleOpen();
  };
  // const updateSigningStatus = () => {
  //   setSigned(true);
  // };
  const termsAgreed = watch("tcAgree");

  // useEffect(() => {
  //   if (signed === true) {
  //     const completeRequest = async () => {
  //       setSaving(true);
  //       try {
  //         const resp = await axios.post(
  //           USER.newLoan,
  //           {
  //             stage: "COMPLETE_INFORMATION",
  //             id: loanId,
  //             completeApplicationRequest: {
  //               signatureType: "SIGNATURE_COMPLETED",
  //               // redirectUri: window.location.origin + "/static/loading",
  //             },
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${at}`,
  //             },
  //           }
  //         );
  //         toast.success("Success, application submitted.");
  //         router.push("/");
  //       } catch (e: any) {
  //         apiErrorToToast(e);
  //         console.log(e?.response ?? e);
  //       } finally {
  //         setSaving(false);
  //       }
  //     };
  //     completeRequest();
  //   }
  // }, [signed]);
  const saveSignature = () => {
    if (sigCanvas.current) {
      //for pdf
      const signatureDataURL = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setSignBase64(signatureDataURL);
      //file
      sigCanvas.current.getCanvas().toBlob((blob: any) => {
        if (blob) {
          const file = new File([blob], "signature.png", { type: "image/png" });
          setImageFile(file);
        }
      }, "image/png");
    }
  };

  const clearCanvas = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setImageFile(null);
    }
  };

  const uploadSignature = async (imageFile: File | null) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      try {
        const resp = await axios.post(USER.uploadFile, formData, {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        const fileToken = resp?.data?.data?.file ?? null;
        if (fileToken) {
          return fileToken;
        } else {
          return null;
        }
      } catch (error) {
        toast.error("Error! Signature not saved.");
        return null;
      }
    }
  };
  return (
    <div>
      <FormPreview loanData={loanData} steps={steps} gotoStep={gotoStep} />
      <div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container rowSpacing={1} columnSpacing={3} className="py-3">
            <Grid item xs={12} lg={12}>
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <SingleCard title="Terms and Conditions">
                  <div
                    className="px-3 py-2"
                    style={{ maxHeight: 380, overflowY: "auto" }}
                  >
                    <h4>
                      <b>Authorization to Obtain Credit Information</b>
                    </h4>
                    <p className="small">
                      By signing or electronically agreeing below, I authorize{" "}
                      <b>Axcess Foundation</b> (nonprofit lender) to obtain my
                      credit report and related credit information from one or
                      more credit reporting agencies (e.g., Experian, Equifax,
                      or TransUnion). This information will be used solely for
                      evaluating my eligibility for the financial product or
                      service I am applying for.
                    </p>

                    <h5>
                      <b>Acknowledgments</b>
                    </h5>
                    <p className="small">
                      I understand and agree by signing below that:
                    </p>
                    <ol className="small">
                      <li>
                        <b>Permissible Purpose:</b> This authorization is
                        provided in accordance with the FCRA for evaluating my
                        application for either emergency (rental) loan, credit
                        building loan or small-business loan.
                      </li>
                      <li>
                        <b>Privacy & Security:</b> My information will be
                        securely stored and not shared with unauthorized third
                        parties.
                      </li>
                      <li>
                        <b>Adverse Actions:</b> If adverse action is taken based
                        on my credit report, I will receive written notification
                        and instructions to obtain a copy of my report.
                      </li>
                      <li>
                        <b>Right to Withdraw:</b> I may withdraw my consent by
                        not clicking the submit button right away before my
                        credit report is pulled, which happens after I click on
                        submit my application.
                      </li>
                      <li>
                        <b>Access to Information:</b> I have the right to
                        request a copy of the credit report obtained for this
                        application. I may contact Axcess Foundation anytime.
                      </li>
                    </ol>

                    <h5 className="text-center">
                      <b>Disclosure of Rights Under the FCRA</b>
                    </h5>
                    <p className="small text-center">
                      A summary of your rights under the Fair Credit Reporting
                      Act is available here:{" "}
                      <a href="#">Link to FCRA rights document</a>.
                    </p>
                  </div>
                </SingleCard>
                <SingleCard title="Acknowledgment, Consent and Signature">
                  <div className="px-3 py-2">
                    <h4>
                      <Typography variant="h6">
                        Do you agree to the terms and conditions?
                      </Typography>
                    </h4>
                    <MyRadioInput
                      //vertical
                      fields={[
                        {
                          label: "Yes, I agree to the terms and conditions.",
                          value: "yes",
                        },
                        {
                          label:
                            "No, I do not agree to the terms and conditions.",
                          value: "no",
                        },
                      ]}
                      name="tcAgree"
                      register={register}
                    />
                    {/* <div className="mb-3 d-flex" style={{ gap: 10 }}>
                      <input
                        type="checkbox"
                        className="form-check"
                        {...register("tcAgree", {
                          required: "You must agree to the terms.",
                        })}
                      />{" "}
                      I agree to the terms and conditions of the Axcess
                      Foundation.
                    </div> */}
                    <div className="d-flex gap-4 align-items-start">
                      <div>
                        <Typography sx={{ fontWeight: 500 }}>
                          Sign Below
                        </Typography>
                        <SignatureCanvas
                          ref={sigCanvas}
                          penColor="black"
                          canvasProps={{
                            width: 220,
                            height: 120,
                            className: "border",
                          }}
                          minWidth={1}
                          maxWidth={1}
                        />
                        <div className="d-flex gap-3 mt-2">
                          <Button
                            type="button"
                            variant="contained"
                            onClick={saveSignature}
                          >
                            Verify Signature
                          </Button>
                          <Button
                            type="button"
                            variant="outlined"
                            onClick={clearCanvas}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                      {imageFile && (
                        <div>
                          <Typography sx={{ fontWeight: 500 }}>
                            Signature Preview
                          </Typography>
                          <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Signature Preview"
                            className="border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </SingleCard>

                {/* {signUrl && (
                  <DocusignModal
                    docUrl={signUrl}
                    updateSigningStatus={updateSigningStatus}
                  />
                )} */}
                <div className="lform-btn-wrapper mt-3">
                  <BackButton
                    onClick={() => {
                      previousStep();
                    }}
                  />
                  <MyLoadingButton
                    title="Complete Application"
                    loading={saving}
                    disabled={!(termsAgreed === "yes") || imageFile == null}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
        {/* <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <FormPreview loanData={loanData} />
              <Typography id="modal-modal-title" variant="h5">
                Complete Your Application with DocuSign
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You're almost done! To finalize your application, please sign
                the agreement using DocuSign. This secure and convenient process
                ensures your application is completed quickly and efficiently.
              </Typography>
              <button
                className="btn btn-primary mt-3"
                disabled={saving}
                onClick={() => {
                  generateDocusignUrl();
                }}
              >
                {saving ? "Processing..." : "Proceed to Signing"}
              </button>
            </Box>
          </Modal>
        </div> */}
      </div>
    </div>
  );
}

const SingleCard = ({
  children,
  title,
}: {
  children: React.ReactElement;
  title: string;
}) => {
  return (
    <Box sx={{ background: "#f7f7f7", marginBottom: "1rem" }}>
      <div
        className="px-3 py-3 text-white"
        style={{
          backgroundColor: "#5D87FF",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <Typography variant="h6">{title}</Typography>
      </div>
      <div className="p-3">
        <BlankCard className="py-3">{children}</BlankCard>
      </div>
    </Box>
  );
};

const createChunkForCol = (array: any[], size: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
const createSingleCol = (row: any) => ({
  columns: row.map((item: any) => ({
    stack: [
      { text: item?.label, style: "pTitle" },
      { text: item?.value, style: "pBody" },
    ],
    width: item?.width ?? "25%",
  })),
  margin: [0, 5],
});
