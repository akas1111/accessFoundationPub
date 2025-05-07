// PDFViewer.js
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/UserContext";
import { Document, DocumentProps, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import ocr_data from "../../../../../data.json";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import { USER } from "@/utils/endpoints";
import React from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
// import newJsonData from "../../../../../newdata.json";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface documentProps {
  docfile?: File;
  docresponse?: any;
  docId?: any;
  docOpen?: boolean;
  statementOpen?: boolean;
  onClose?: any;
}
const PDFViewer: React.FC<documentProps> = ({
  docfile,
  docresponse,
  docId,
  docOpen,
  statementOpen,
  onClose,
}) => {
  const { at }: any = getUserData();
  const [file, setFile] = useState<string | null>(null); // To hold the uploaded file
  const [fileData, setfileData] = useState<any>(undefined);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number | undefined>(1);

  const [editedData, setEditedData] = useState<any[]>([]); 
  const [open, setOpen] = React.useState(false);
  const [openbankDetails, setopenbankDetails] = React.useState(false);
  const [updatedDocData, setupdatedDocData] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);

  // For first popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  // For bank statement popup
  const openBankStatementPopup = () => {
    setopenbankDetails(true);
  };

  const closeBankStatementPopup = () => {
    setopenbankDetails(false); // Fixed this line
  };

  const handleTextChange = (
    pageIndex: number,
    dataIdx: number,
    newText: string
  ) => {
    // Make a copy of the state
    const updatedData = [...editedData];

    updatedData.filter((item) => item.page === pageNumber)[pageIndex].ocr_data[
      dataIdx
    ].text = newText;
    setEditedData(updatedData);
  };

  const handleUpdate = async () => {
    console.log("fileData", fileData);
    // setEditedData(fileData);
    const transformedData = {
      data: Object.values(editedData), // This will convert object values into an array
    };
    // const transformedData =[
    //  const transformedData=[ {
    //     ...editedData,
    //   }]
    // ]

    let id = docId;
    // let id = 56;
    try {
      setLoading(true); // Start loading

      const response = await axios.put(
        `http://104.131.171.66:8000/api/v1/document/${id}/update-json`,
        transformedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${at}`,
          },
        }
      );

      setupdatedDocData(response.data.data);
      // setOpen(false);
      onClose();
      setopenbankDetails(true);
    } catch (error) {
      // console.error("Error updating document:", error);
      // alert(error);
      toast.error(`Error updating document: ${error}`);
    } finally {
      setLoading(false); // Stop loading
    }

    // try {
    //   const response = await axios.put(
    //     `http://104.131.171.66:8000/api/v1/document/${id}/update-json`,
    //     transformedData,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${at}`,
    //       },
    //     }
    //   );
    //   setupdatedDocData(response.data.data);
    //   setOpen(false);
    //   setopenbankDetails(true);
    // } catch (error) {
    //   console.error("Fail to update:", error);
    //   alert(error);
    //   // const updata = newJsonData[0];
    //   // setupdatedDocData(updata);
    //   // console.log("updatedDocData", updatedDocData);
    //   // setOpen(false);
    //   // setopenbankDetails(true);
    // }
  };

  const handleinsight = async () => {

    interface Transaction {
      amount: { text: string };
      balance: { text: string };
      date: { text: string };
    }

    const Tdata: Transaction[] =
      updatedDocData?.checking_transaction_detail.flatMap((group: any) =>
        group
          .filter(
            (item: any) =>
              item.date?.text && item.amount?.text && item.balance?.text
          )
          .map(
            (item: any): Transaction => ({
              amount: { text: item.amount.text },
              balance: { text: item.balance.text },
              date: { text: item.date.text },
            })
          )
      ) || [];


    console.log("transformedDataT", Tdata);
    const output =
    {
      data: [Tdata],
    };
  

      console.log("transformedData", Tdata);
     let id = docId;

     try {
       setLoading(true); 

       const response = await axios.post(
         `http://104.131.171.66:8000/api/v1/document/insight/${id}`,
         output,

  
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${at}`,
           },
         }
       );


       onClose();

       console.log("res", response.data.data.insight_image);
       window.open(response.data.data.insight_image, "_blank");

     } catch (error) {
      alert(`Error Evaluating document: ${error}`);
       toast.error(`Error Evaluating document: ${error}`);
     } finally {
       setLoading(false); // Stop loading
     }
    
  }

  useEffect(() => {
    // console.log("Received docfile:", docfile);
    //  setFile(docresponse);
    // if (docresponse) {
    setOpen(docOpen ?? false);
    setfileData(docresponse);
    console.log("Received docresponse:", docresponse?.[0]?.ocr_data);
    console.log("setFileData :", docresponse);
      setEditedData(docresponse);
    // setFile(docresponse);

    if (typeof docfile === "string") {
      // if docfile is already a URL (string)
      setFile(docfile);
    } else if (docfile instanceof File) {
      // if docfile is a File object
      setFile(URL.createObjectURL(docfile));
    }
    // }
  }, [docfile, docresponse, docOpen]);

  // Handle file upload
  // const handleFileUpload = (event: any) => {
  //   const uploadedFile = event.target.files[0];
  //   console.log("Received uploadedFile:", uploadedFile);
  //   setFile(URL.createObjectURL(uploadedFile)); // Create URL for the uploaded file
  // };

  // Success handler when PDF is loaded
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  // const data = newJsonData[0];

  return (
    <div>
      <React.Fragment>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open Document
        </Button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth={false}
          sx={{
            zIndex: 99999,
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#1976d2", // Blue background
              color: "white", // White text
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Push close icon to right
              paddingY: 1,
              paddingX: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Document Extracted Data
            </Typography>
            <IconButton
              onClick={onClose} // Replace with your close function
              sx={{ color: "white" }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          {/* <DialogTitle>Document Extracted Data</DialogTitle> */}

          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Loading document details...
              </Typography>
            </div>
          ) : (
            <DialogContent>
              {file && (
                <div
                  className="flex"
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "45%",
                    }}
                  >
                    {/* Show the PDF document */}
                    <Document
                      file={docfile}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>

                    {/* Show the OCR data for the current page */}
                    {/* Page controls */}
                    <p className="mt-4">
                      Page {pageNumber} of {numPages}
                    </p>

                    <div className="mt-2 flex gap-2">
                      <button
                        disabled={!pageNumber || pageNumber <= 1}
                        onClick={() => setPageNumber(pageNumber! - 1)}
                        className="px-4 py-2 bg-gray-300 rounded"
                      >
                        Previous
                      </button>

                      <button
                        disabled={
                          !pageNumber || !numPages || pageNumber >= numPages
                        }
                        onClick={() => setPageNumber(pageNumber! + 1)}
                        className="px-4 py-2 bg-gray-300 rounded"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div
                    className="p-6"
                    style={{
                      width: "60%",
                      zIndex: 9,
                    }}
                  >
                    <div className="space-y-4">
                      {fileData
                        ?.filter((item: any) => item.page === pageNumber)
                        .map((item: any, index: any) => (
                          <div
                            key={index}
                            className="border p-2 rounded shadow my-2"
                          >
                            <p className="font-bold">Page: {item.page}</p>

                            {item.ocr_data.map((data: any, idx: any) => (
                              <div
                                key={idx}
                                className="border p-2 rounded shadow my-2 bg-gray-50"
                              >
                                <input
                                  style={{
                                    width: "100%",
                                  }}
                                  type="text"
                                  value={data.text}
                                  onChange={(e) =>
                                    handleTextChange(index, idx, e.target.value)
                                  }
                                  className="border p-2 rounded w-full"
                                />
                                <p
                                  style={{ margin: 0 }}
                                  className={
                                    data.confidence * 100 < 95
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  Confidence:{" "}
                                  {(data.confidence * 100).toFixed(2)}%
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>
                    {/* <button onClick={handleUpdate}>Update</button> */}
                  </div>
                </div>
              )}
            </DialogContent>
          )}

          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="outlined" onClick={handleUpdate}>
              View Statement
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <React.Fragment>
        {/* <Button variant="outlined" onClick={openBankStatementPopup}>
          Open Bank Statement
        </Button> */}

        <Dialog
          open={openbankDetails}
          onClose={closeBankStatementPopup}
          fullWidth
          maxWidth={false}
          sx={{
            zIndex: 99999,
          }}
        >
          {/* <DialogTitle>Bank Statement Details</DialogTitle> */}

          <DialogTitle
            sx={{
              backgroundColor: "#1976d2", // Blue background
              color: "white", // White text
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Push close icon to right
              paddingY: 1,
              paddingX: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Bank Statement Details
            </Typography>
            <IconButton
              onClick={closeBankStatementPopup} // Replace with your close function
              sx={{ color: "white" }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Loading ...
            </Typography>
          </div>
           )} 

          <DialogContent>
            {file && (
              <div
                className="flex"
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      padding: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <style>
                      {`
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        font-size: 14px;
      }
      th {
        background-color: #f0f4f8;
        color: #333;
        text-align: left;
        padding: 8px;
        border-bottom: 2px solid #dee2e6;
      }
      td {
        padding: 8px;
        border-bottom: 1px solid #eee;
      }
      tr:nth-child(even) td {
        background-color: #fafafa;
      }
      h2 {
        margin-top: 30px;
        margin-bottom: 10px;
        font-size: 18px;
        color: #2c3e50;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
      }
    `}
                    </style>
                    <div
                      style={{
                        padding: "12px 0",
                        borderRadius: "6px",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {updatedDocData?.account_identifier.text}
                    </div>
                    <div className="d-flex">
                      <div className="left">
                        <h2>Customer Information</h2>
                        <table>
                          <tbody>
                            <tr>
                              <td>Customer Name</td>
                              <td>{updatedDocData?.customer_name.text}</td>
                            </tr>
                            <tr>
                              <td>Address</td>
                              <td>{updatedDocData?.address.text}</td>
                            </tr>
                          </tbody>
                        </table>

                        <h2>Statement Period</h2>
                        <table>
                          <tbody>
                            <tr>
                              <td>Start Date</td>
                              <td>
                                {
                                  updatedDocData?.statement_period[0].start_date
                                    .text
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>End Date</td>
                              <td>
                                {
                                  updatedDocData?.statement_period[1].end_date
                                    .text
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <h2>Accounts</h2>
                        {updatedDocData?.checking_account_table[0].assets.checking_and_savings.map(
                          (acc: any, idx: any) => (
                            <table key={idx}>
                              <thead>
                                <tr>
                                  <th>Account Name</th>
                                  <th>Account Number</th>
                                  <th>Beginning Balance</th>
                                  <th>Ending Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{acc.account_name.text}</td>
                                  <td>{acc.account_number.text}</td>
                                  <td>{acc.beginning_balance.text}</td>
                                  <td>{acc.ending_balance.text}</td>
                                </tr>
                              </tbody>
                            </table>
                          )
                        )}

                        <h2>Checking Summary</h2>
                        <table>
                          <thead>
                            <tr>
                              <th>Summary</th>
                              <th>Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {updatedDocData?.checking_summary.balance_summary.map(
                              (entry: any, idx: any) => (
                                <tr key={idx}>
                                  <td>{entry.summary.text}</td>
                                  <td>{entry.balance.text}</td>
                                </tr>
                              )
                            )}
                            <tr>
                              <td colSpan={2}>
                                <em>
                                  {updatedDocData?.checking_summary.note.text}
                                </em>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <h2>Savings Summary</h2>
                        <table>
                          <thead>
                            <tr>
                              <th>Summary</th>
                              <th>Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {updatedDocData?.savings_summary.balance_summary.map(
                              (entry: any, idx: any) => (
                                <tr key={idx}>
                                  <td>{entry.summary.text}</td>
                                  <td>{entry.balance.text}</td>
                                </tr>
                              )
                            )}
                            <tr>
                              <td colSpan={2}>
                                <em>
                                  {updatedDocData?.savings_summary.note.text}
                                </em>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="right">
                        <h2>Transaction Details</h2>
                        {updatedDocData?.checking_transaction_detail.map(
                          (transactions: any, idx: any) => (
                            <table key={idx}>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Description</th>
                                  <th>Amount</th>
                                  <th>Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {transactions.map((tx: any, i: any) => (
                                  <tr key={i}>
                                    <td>{tx.date.text}</td>
                                    <td>{tx.description.text}</td>
                                    <td>{tx.amount.text}</td>
                                    <td>{tx.balance.text}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={closeBankStatementPopup}>Close</Button>
            <Button onClick={handleinsight}>Insight</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default PDFViewer;
