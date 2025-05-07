import { docRequestDocumentsList } from "@/app/(DashboardLayout)/_components/dashboard/common/lists";
import { ADMIN, USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import { Check, CheckCircle } from "@mui/icons-material";
import { FormLabel, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";

export const DocumentRequestAdmin = ({ loanId }: any) => {
  const { at }: any = getUserData();
  const [loading, setLoading] = useState<boolean>(true);

  const [reqDocs, setReqDocs] = useState<any[]>([]);
  const [reload, setReload] = useState<number>(0);

  const uploadedDocs = reqDocs?.filter((item) => item?.documentToken != null);

  //document token to view
  const [saving, setSaving] = useState<boolean>(false);
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const [file, setFile] = useState<{ src: string; fileType: string } | null>(
    null
  );
  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await axios.post(
          ADMIN.getDocumentRequest,
          { customerApplicationId: loanId },
          {
            headers: {
              Authorization: `Bearer ${at}`,
            },
          }
        );
        const allData = resp?.data?.data?.documentRequestResponses ?? null;
        setReqDocs(allData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, [reload]);
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const docKeys = formData.getAll("docKeys");
    const payload = docKeys?.map((item) => ({ documentKeyName: item }));
    if (payload.length === 0) {
      toast.error("No document selected.");
      return;
    }
    try {
      setLoading(true);
      const resp = await axios.post(
        ADMIN.addDocumentRequest,
        {
          customerApplicationId: loanId,
          documentRequest: payload,
        },
        { headers: { Authorization: `Bearer ${at}` } }
      );
      console.log(resp);
      toast.success("Document request successful.");
      setReload((r) => r + 1);
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? "Document request failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  //load document from token
  useEffect(() => {
    const loadDoc = async (docToken: string) => {
      setSaving(true);
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
        toast.error("Unable to load document.");
      } finally {
        setSaving(false);
      }
    };
    if (activeToken) {
      loadDoc(activeToken);
    }
  }, [activeToken]);

  if (loading) {
    return <Skeleton variant="rectangular" height={150} />;
  }
  const documentObj: { [key: string]: string } = {};
  docRequestDocumentsList.map((item) => {
    documentObj[item?.id] = item?.label;
  });
  const submitDocumentToLoad = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const docToken = formData.get("document");
    if (docToken) {
      setActiveToken(String(docToken));
    }
  };

  return (
    <div className="">
      <Typography variant="h5" className="mb-3">
        Document Request
      </Typography>
      <form onSubmit={onSubmit} className="mb-3">
        <FormLabel>Select document(s) to request</FormLabel>
        <Select
          isMulti
          name="docKeys"
          options={docRequestDocumentsList}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.id}
          placeholder="Document Name..."
        />
        <button className="btn btn-primary mt-3" disabled={loading}>
          Save changes
        </button>
      </form>
      {reqDocs.length > 0 && (
        <div>
          <Typography
            variant="h6"
            color="success.dark"
            style={{ display: "flex", gap: 5 }}
          >
            <CheckCircle fontSize="small" /> Request already submitted
          </Typography>
          <Typography variant="body1">
            The request has already been submitted to the customer.
          </Typography>
          <Typography variant="h6" className="mt-3 mb-2">
            Requested Documents
          </Typography>
          <div className="mb-3 d-flex flex-wrap" style={{ gap: 10 }}>
            {reqDocs?.map((item, index) => (
              <Typography key={index + " " + item?.keyName}>
                {index + 1}. {documentObj?.[item?.keyName] ?? "Document"}{" "}
                {item?.documentToken != null && (
                  <Check color="success" sx={{ fontSize: 14 }} />
                )}
              </Typography>
            ))}
          </div>
          <div className="border-top pt-3">
            <form
              className="d-flex align-items-end mb-3"
              style={{ gap: 10 }}
              onSubmit={submitDocumentToLoad}
            >
              <div>
                <FormLabel>Select document to view</FormLabel>
                <select
                  className="form-select"
                  style={{ height: 42 }}
                  name="document"
                >
                  <option value="" disabled selected>
                    Select Document
                  </option>
                  {uploadedDocs?.map((item, index) => (
                    <option
                      value={item?.documentToken}
                      key={index + " " + item?.keyName}
                    >
                      {documentObj?.[item?.keyName]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-primary"
                style={{ height: 42 }}
                disabled={saving}
              >
                {saving ? "Loading..." : "View Document"}
              </button>
            </form>
            <div>
              {saving ? (
                <Skeleton variant="rectangular" height={180} className="mt-3" />
              ) : (
                <div className="my-2">
                  {file?.src && file?.fileType === "IMAGE" && (
                    <img src={file.src} width="100%" className="border" />
                  )}
                  {file?.src && file?.fileType === "PDF" && (
                    <div>
                      <Typography>PDF file preview</Typography>
                      <div>
                        <object
                          data={file.src}
                          type="application/pdf"
                          width="500"
                          className="border"
                          height="600"
                          style={{ maxWidth: "100%" }}
                        >
                          <Typography className="small">
                            Your browser does not support PDF embedding.
                          </Typography>
                        </object>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
