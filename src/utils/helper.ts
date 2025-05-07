import { toast } from "react-toastify";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function apiErrorToToast(e: any, msg = "Error! request failed.") {
  const status = e?.status ?? 500;
  if (status === 400) {
    const fieldErrors = e?.response?.data?.fieldErrors ?? null;
    if (Array.isArray(fieldErrors)) {
      fieldErrors.map((item: any) => {
        toast.error(item?.messages?.[0] ?? "Error! validation failed.");
      });
    }
  } else {
    const message = e?.response?.data?.message ?? msg;
    toast.error(message);
  }
}

export function formatAddress(main: string, address2: string) {
  if (!main || !address2) {
    return main;
  }
  const splits = main?.split(",");
  if (splits?.length === 4) {
    splits.splice(1, 0, address2);
    return splits.join(",");
  } else {
    return main;
  }
}

export const getChipColor = (status: string) => {
  let color = "primary.main";
  switch (status) {
    case "COMPLETED":
      color = "success.main";
      break;
    case "PENDING":
      color = "warning.main";
      break;
    case "CANCELLED":
      color = "grey.400";
      break;
    case "REJECTED":
      color = "error.dark";
      break;
    case "APPROVED":
      color = "success.dark";
      break;
    case "APPLICATION_IN_REVIEW":
      color = "warning.dark";
      break;
    case "UNDERWRITING":
      color = "secondary.main";
      break;
    case "SUCCESSFUL":
      color = "grey.600";
      break;
  }
  return color;
};
