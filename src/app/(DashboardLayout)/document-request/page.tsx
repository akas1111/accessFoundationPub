"use client";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import { Grid, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { docRequestDocumentsList } from "@/app/(DashboardLayout)/_components/dashboard/common/lists";
import PageContainer from "../_components/container/PageContainer";
import DashboardCard from "../_components/shared/DashboardCard";
import { IconCloudUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { MyFormLabel } from "../_forms/elements/Common";
import { CloseOutlined } from "@mui/icons-material";

export default function DocRequestCustomer() {
  const { at }: any = getUserData();
  const [loading, setLoading] = useState<boolean>(false);
  const [reqDocs, setReqDocs] = useState<any[]>([]);

  //refactor -- make better
  const notUploadedDocs = reqDocs?.filter(
    (item) => item?.documentToken == null
  );
  const notUploadedDocKeys = notUploadedDocs?.map((item) => item?.keyName);
  console.log("keys:", notUploadedDocKeys);

  const [reload, setReload] = useState<number>(0);
  const [saving, setSaving] = useState<boolean>(false);

  //for docs
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [uploaded, setUploaded] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const resp = await axios.post(
          USER.docRequestList,
          {},
          {
            headers: {
              Authorization: `Bearer ${at}`,
            },
          }
        );
        const allData = resp?.data?.data ?? [];
        setReqDocs(allData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [reload]);

  const documentObj: { [key: string]: string } = {};
  docRequestDocumentsList.map((item) => {
    documentObj[item?.id] = item?.label;
  });

  // const uploadSingleFile = async (e: SyntheticEvent, docKey: string) => {
  //   const target = e.target as HTMLInputElement;
  //   const files = target?.files;
  //   if (files && files.length) {
  //     try {
  //       const file = files[0];
  //       if (file.size > 5 * 1024 * 1024) {
  //         toast.error("Max allowed file size is 5MB.");
  //         return;
  //       }
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       console.log("Uploading single file:", docKey);
  //       //setSaving(true);
  //       const resp = await axios.post(USER.uploadFile, formData, {
  //         headers: {
  //           Authorization: `Bearer ${at}`,
  //         },
  //       });
  //       const fileToken = resp?.data?.data?.file ?? null;
  //       console.log(fileToken);
  //       if (fileToken) {
  //         setUploaded((up: any) => ({ ...up, [docKey]: fileToken }));
  //       }
  //     } catch (e) {
  //       toast.error("Error! Upload failed.");
  //       console.log(e);
  //     } finally {
  //       //setSaving(false);
  //     }
  //   }
  // };
  const uploadFile = async (file: File, docKey: string) => {
    try {
      if (file?.size > 5 * 1024 * 1024) {
        toast.error("Max allowed file size is 5MB.");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      console.log("Uploading...", docKey);
      setSaving(true);
      const resp = await axios.post(USER.uploadFile, formData, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });
      const fileToken = resp?.data?.data?.file ?? null;
      console.log(fileToken);
      if (fileToken) {
        setUploaded((up: any) => ({ ...up, [docKey]: fileToken }));
      }
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? "Error! Upload failed.";
      toast.error(msg);
      console.log(e);
    } finally {
      setSaving(false);
    }
  };
  const uploadDocsRequest = async () => {
    const uploadRequests: any = [];
    reqDocs.map((item) => {
      if (uploaded?.[item?.keyName]) {
        uploadRequests.push({
          documentRequestId: item?.id,
          keyName: item?.keyName,
          value: uploaded?.[item?.keyName],
          customerApplicationId: item?.customerApplicationId ?? 0,
        });
      }
    });
    if (uploadRequests.length !== reqDocs.length) {
      toast.error("Please upload all the docs.");
      return;
    }
    try {
      setSaving(true);
      await axios.post(
        USER.uploadDocumentRequest,
        { uploadRequests },
        { headers: { Authorization: `Bearer ${at}` } }
      );
      toast.success("Documents submitted.");
      setReload((r) => r + 1);
    } catch (e: any) {
      console.log(e);
      const msg = e?.response?.data?.message ?? "Error! Upload failed.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };
  const clearUploadedFile = (keyName: string) => {
    setUploaded((up: any) => ({ ...up, [keyName]: null }));
  };
  const handleDrop = async (index: number, acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0]; // Only upload one file at a time
    const docKey = docRequestDocumentsList?.[index]?.id;
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
      setActiveIndex(null);
    }
  };

  console.log(reqDocs, notUploadedDocs, uploaded);
  return (
    <PageContainer title="Document Requests">
      <DashboardCard
        title="Document Requests"
        subtitle="Please provide the required documents to complete the review and
                approval process for your application."
      >
        <>
          {loading && (
            <div>
              <Skeleton variant="rectangular" height={60} className="mb-2" />
              <Skeleton variant="rectangular" height={80} className="mb-2" />
            </div>
          )}

          <div
            className={notUploadedDocs.length > 0 && !loading ? "" : "d-none"}
            hidden={notUploadedDocs.length === 0 || loading}
          >
            <Grid container rowSpacing={3} columnSpacing={3} className="py-3">
              {docRequestDocumentsList?.map((item: any, index: number) => {
                const { getRootProps, getInputProps, isDragActive } =
                  useDropzone({
                    onDrop: (acceptedFiles) => handleDrop(index, acceptedFiles),
                    accept: { "image/*": [], "application/pdf": [] },
                    multiple: false,
                  });
                return (
                  <Grid
                    item
                    xs={12}
                    lg={23}
                    key={item?.id + " " + index}
                    className={
                      notUploadedDocKeys.includes(item?.id)
                        ? "d-block"
                        : "d-none"
                    }
                  >
                    <div>
                      <MyFormLabel>
                        {item?.label ?? "Document"}
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
                            <IconCloudUpload size={20} color="#5D87FF" /> Drag &
                            drop files here, or{" "}
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
                        <div
                          className="p-1 px-2 text-white d-flex justify-content-between align-items-center"
                          style={{ backgroundColor: "#3498db" }}
                        >
                          <Typography>
                            {uploaded?.[item?.id] ?? "File"}
                          </Typography>
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
                      )}
                    </div>
                  </Grid>
                );
              })}
            </Grid>
            <button
              className="btn btn-primary"
              disabled={
                saving ||
                Object.keys(uploaded).length !== notUploadedDocKeys.length
              }
              onClick={() => {
                uploadDocsRequest();
              }}
            >
              Save Uploaded Documents
            </button>
          </div>
          {notUploadedDocs.length === 0 && !loading && (
            <div className="bordr p-3 bg-light">
              <Typography variant="body1">
                No pending document request(s) found at this moment.
              </Typography>
            </div>
          )}
        </>
      </DashboardCard>
    </PageContainer>
  );
}
