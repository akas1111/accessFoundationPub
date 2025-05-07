import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import { BackButton, MyFormLabel } from "../elements/Common";
import { toast } from "react-toastify";
import { CloseOutlined } from "@mui/icons-material";
import { FormStepsProps } from "../elements/elemTypes";
import { useDropzone } from "react-dropzone";
import { IconCloudUpload } from "@tabler/icons-react";
import { relative } from "path";

import { Document, Page, pdfjs } from "react-pdf";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import PDFViewer from "./docStatementDialog";






export default function DocumentsUpload({
  loanId,
  nextStep,
  previousStep,
  loanData,
  setLoanData,
}: FormStepsProps) {
  const [saving, setSaving] = useState<boolean>(false);
  const { at }: any = getUserData();
  const [preview, setPreview] = useState<string | null>(null);


  //upload index
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [uploaded, setUploaded] = useState<any>(loanData ?? {});
  const [file, setFile] = useState<any>();
  const [bankStatResponse, setbankStatResponse] = useState<any>();
  const [docId, setdocId] = useState();
    const [open, setOpen] = React.useState(false);
  console.log(uploaded);

  // const documents = [
  //   {
  //     id: "recentPayStubs",
  //     label: "Recent Pay Stubs",
  //   },
  //   {
  //     id: "supportingDocuments",
  //     label: "Supporting Documents",
  //   },
  //   {
  //     id: "lastPayStub",
  //     label: "Supporting Documents (Last Pay Stub)",
  //   },
  //   {
  //     id: "otherSupportingDocuments",
  //     label: "Other Supporting Documents",
  //   },
  //   {
  //     id: "priorYearTaxReturns",
  //     label: "Prior Year Tax Return /W2",
  //   },
  //   {
  //     id: "bankStatements",
  //     label: "Bank Statements",
  //   },
  //   {
  //     id: "leaseAgreement",
  //     label: "Lease Agreements",
  //   },

  //   {
  //     id: "tenantSupportingDocuments",
  //     label: "Supporting Documents (Tenant)",
  //   },
  // ];
  // const onFormSubmit = async (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   const target = e.target as HTMLFormElement;
  //   const formData = new FormData(target);
  //   formData.append("stage", "DOCUMENT_UPLOAD");
  //   formData.append("id", String(loanId));
  //   //formData.append("id", String("48"));
  //   const docKey = formData.get("document.keyName");
  //   setSaving(true);
  //   try {
  //     console.log("Uploading...", docKey);
  //     const resp = await axios.post(USER.docUpload, formData, {
  //       headers: {
  //         Authorization: `Bearer ${at}`,
  //       },
  //     });
  //     setUploadedKeys((r) => [...r, String(docKey)]);
  //     //console.log(resp);
  //   } catch (e: any) {
  //     toast.error("Error! upload failed. Try again.");
  //     console.log(e?.response ?? e);
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const handleDrop = async (index: number, acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0]; // Only upload one file at a time
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }

    const docKey = uploadDocumentList?.[index]?.id;
    if (file && docKey) {
      //check if file is valid
      if (
        !file?.type?.startsWith("image/") &&
        !(file?.type === "application/pdf")
  
         
        
    
      ) {
        toast.error("Image or PDF file is only allowed.");
        return;
      }
      //continue
      setActiveIndex(index);
      await uploadFile(file, docKey);
    }
  };
  const uploadFile = async (file: File, docKey: string) => {
    try {
      if (file?.size > 5 * 1024 * 1024) {
        toast.error("Max allowed file size is 5MB.");
        return;
      }
      const formData = new FormData();
      // formData.append("document.file", file);
      formData.append("file", file);

      setFile(file)
      formData.append("document.keyName", docKey);
      formData.append("stage", "DOCUMENT_UPLOAD");
      formData.append("document_type", "BANK_STATEMENT");
        formData.append("document", "CHASE");
      formData.append("id", String(loanId));
      console.log("Uploading...", docKey);
      setSaving(true);

      const hasBankStatements = uploadDocumentList.some(
        (doc) => doc.id === "bankStatements"
      );

    
      if (hasBankStatements) {
        try {
           const response = await axios.post(
             USER.bankStatementdocUpload,
             formData,
             {
               headers: {
                 "Content-Type": "multipart/form-data",
                 Authorization: `Bearer ${at}`,
               },
             }
           );
          setbankStatResponse(response.data.data); 
          setdocId(response.data.id);
          toast.success(
            response?.data.message || "Bank statement uploaded successfully!"
          );
        } catch (error) {
          console.error('Bank statement upload failed:', error);
               toast.error(`Bank statement upload failed: ${error}`);
          
      
      }
      }
      
      try {
        await axios.post(USER.docUpload, formData, {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
      } catch (error) {
        console.error('Document upload failed:', error);
        toast.error(`Bank statement upload failed: ${error}`);
      }
      
  
     
      
      setUploaded((up: any) => ({ ...up, [docKey]: file?.name ?? "File" }));
    } catch (e) {
      toast.error("Error! Upload failed.");
      console.log(e);
    } finally {
      setUploaded((up: any) => ({ ...up, [docKey]: file?.name ?? "File" }));
      setSaving(false);
    }
  };
  const clearUploadedFile = (keyName: string) => {
    setUploaded((up: any) => ({ ...up, [keyName]: null }));
  };
  const handleSubmit = () => {
    console.log(uploaded);
    setLoanData({ documentUpload: { ...loanData, ...uploaded } });
    nextStep();
  };

  const handleopenDocDialog = () => {
    setOpen(true);
      // setOpen((prev) => !prev);
  };
   const handleClose = () => {
     setOpen(false);
   };



  return (
    <div>
      <Grid container rowSpacing={3} columnSpacing={3} className="py-3">
        {uploadDocumentList.map((item, index) => {
          const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: (acceptedFiles) => handleDrop(index, acceptedFiles),
            accept: { "image/*": [], "application/pdf": [] },
            multiple: false,
          });
          return (
            <Grid item xs={12} lg={6} key={item?.id + " " + index}>
              <div>
                <MyFormLabel>
                  {item?.label}{" "}
                  {uploaded?.[item?.id] != null && (
                    <span className="text-success">(Uploaded)</span>
                  )}
                </MyFormLabel>
                <div
                  className={`mb-2 px-3 py-4 border-dashed ${
                    uploaded?.[item?.id] != null ? "pe-none" : ""
                  }`}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                  }}
                  {...getRootProps()}
                >
                  <input
                    type="file"
                    {...getInputProps()}
                    name="document.file"
                    required
                    disabled={uploaded?.[item?.id] != null}
                  />
                  {isDragActive ? (
                    <Typography className="d-flex align-items-center gap-2">
                      <IconCloudUpload size={20} color="#5D87FF" />
                      Drop files here...
                    </Typography>
                  ) : (
                    <Typography className="d-flex align-items-center gap-2">
                      <IconCloudUpload size={20} color="#5D87FF" /> Drag & drop
                      files here, or{" "}
                      <u style={{ color: "#5D87FF", fontWeight: 500 }}>
                        Choose file to Upload
                      </u>
                    </Typography>
                  )}
                </div>
                {activeIndex === index && saving && (
                  <div
                    className="p-1 px-2 text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "#3498db" }}
                  >
                    <Typography>Uploading...</Typography>
                  </div>
                )}
                {uploaded?.[item?.id] != null && (
                  <div className="d-flex">
                    <div
                      className="p-1 px-2 text-white d-flex justify-content-between align-items-center "
                      style={{ backgroundColor: "#3498db", flexBasis: "70%" }}
                    >
                      <Typography>{uploaded?.[item?.id] ?? "File"}</Typography>
                      <button
                        className="btn px-0"
                        onClick={() => {
                          clearUploadedFile(item?.id);
                        }}
                      >
                        <CloseOutlined
                          fontSize="small"
                          sx={{ color: "#fff" }}
                        />
                      </button>
                    </div>
                    {item?.id === "bankStatements" && (
                      <Button
                        style={{ flexBasis: "30%" }}
                        className="whitespace-nowrap px-1 w-10"
                        variant="outlined"
                        onClick={handleopenDocDialog}
                      >
                        Open Document
                      </Button>
                    )}
                  </div>
                )}
                {/* {activeIndex === index && preview && (
               <PDFViewer />
                )} */}

                {/* {activeIndex === index && preview &&  (
                      <div style={{ width: '150px',position:'relative' }} className="relative mt-4 w-fit">
                        
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-[150px] h-auto rounded-lg shadow-md"
                          style={{ width: '150px' }}
                          
                        />
                        <button
                        style={{ position: 'absolute', top:0, right:0, border:'none'}}
                          onClick={() => {
                            setPreview(null);
                           
                          }}
                        
                          className="absolute top-0 right-0"
                        >
                          <span className="text-sm font-bold text-gray-600">×</span>
                        </button>
                      </div>
                )} */}
              </div>
            </Grid>
          );
        })}
      </Grid>
      <div className="lform-btn-wrapper">
        <BackButton
          onClick={() => {
            previousStep();
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
          style={{ minWidth: 180, fontWeight: 600, gap: 10, height: 46 }}
        >
          Save & Continue
        </Button>
        <PDFViewer
          docfile={file}
          docresponse={bankStatResponse}
          docOpen={open}
          onClose={handleClose}
          docId={docId}
        />
      </div>
    </div>
  );
}

export const uploadDocumentList = [
  {
    id: "governmentIssuedId",
    label: "Government Issued ID",
  },
  {
    id: "recentPayStubs",
    label: "Recent Pay Stubs",
  },
  {
    id: "benefitsLetter",
    label: "Benefits Letter",
  },
  {
    id: "proofOfAdditionalIncome",
    label: "Proof of Additional Income",
  },
  {
    id: "priorYearTaxReturns",
    label: "Prior Year Tax Return /W2",
  },
  {
    id: "bankStatements",
    label: "Bank Statements",
  },
  {
    id: "leaseAgreement",
    label: "Lease Agreements",
  },

  {
    id: "utilitiesBill",
    label: "Utilities Bill",
  },
];
