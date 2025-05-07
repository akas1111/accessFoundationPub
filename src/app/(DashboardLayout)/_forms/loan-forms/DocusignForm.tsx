import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { toast } from "react-toastify";

const DocusignModal = ({
  docUrl,
  updateSigningStatus,
}: {
  docUrl: string;
  updateSigningStatus: () => void;
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  const handleIframeLoad = (event: any) => {
    try {
      const iframeWindow = event.target.contentWindow;
      const iframeUrl = iframeWindow.location.href;
      console.log("iframeURL:", iframeUrl);

      if (iframeUrl.startsWith(window.location.origin)) {
        const urlParams = new URLSearchParams(new URL(iframeUrl).search);
        const eventParam = urlParams.get("event");
        if (eventParam === "signing_complete") {
          updateSigningStatus();
          toast.success("Signing completed.");
          handleClose();
        } else {
          toast.error("Error! Signing failed.");
          handleClose();
        }
      }
    } catch (error) {
      console.log(
        "Unable to access iframe URL or cross-origin restriction",
        error
      );
    }
  };

  return (
    <div>
      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="docusign-modal-title"
        aria-describedby="docusign-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <iframe
            src={docUrl}
            style={{ width: "100%", height: "600px", border: "none" }}
            title="DocuSign"
            onLoad={handleIframeLoad}
          ></iframe>
        </Box>
      </Modal>
    </div>
  );
};

export default DocusignModal;
