import { FormLabel, Skeleton, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import { toast } from "react-toastify";
import { docRequestDocumentsList } from "../_components/dashboard/common/lists";

export default function ShowDocuments({ data }: any) {
  const { at }: any = getUserData();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  //file src
  const [file, setFile] = useState<{ src: string; fileType: string } | null>(
    null
  );

  useEffect(() => {
    const loadDoc = async () => {
      try {
        setFile(null);
        setLoading(true);
        const token = data?.[activeKey ?? ""] ?? null;
        if (!token) {
          toast.error("Selected docs not uploaded.");
          return;
        }
        const resp = await axios.get(USER.getFileUrl, {
          params: {
            token,
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
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (activeKey) {
      loadDoc();
    }
  }, [activeKey]);

  console.log("file", file);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const docKey = formData.get("document");
    if (docKey) {
      setActiveKey(String(docKey));
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="d-flex align-items-end mb-3"
        style={{ gap: 10 }}
      >
        <div>
          <FormLabel>Select document to view</FormLabel>
          <select
            className="form-select"
            name="document"
            style={{ height: 42 }}
          >
            {docRequestDocumentsList.map((item, index) => (
              <option
                value={item.id}
                key={index + " " + item?.id}
                disabled={data?.[item?.id] == null}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-primary"
          style={{ height: 42 }}
          disabled={loading}
        >
          {loading ? "Loading..." : "View Document"}
        </button>
      </form>
      <div>
        <Typography variant="h6">
          {docFields.filter((it) => it.id === activeKey)?.[0]?.label ?? ""}
        </Typography>
        <div>
          {loading ? (
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
  );
}

const docFields = [
  {
    id: "bankStatements",
    label: "Bank Statement",
  },
  {
    id: "lastPayStub",
    label: "Last Pay Stub",
  },
  {
    id: "leaseAgreement",
    label: "Lease Agreement",
  },
  {
    id: "otherSupportingDocuments",
    label: "Other Supporting Documents",
  },
  {
    id: "priorYearTaxReturns",
    label: "Prior Year Tax Returns",
  },
  {
    id: "supportingDocuments",
    label: "Supporting Documents",
  },
  {
    id: "tenantSupportingDocuments",
    label: "Tenant Supporting Documents",
  },
  {
    id: "recentPayStubs",
    label: "Recent Pay Stubs",
  },
];
