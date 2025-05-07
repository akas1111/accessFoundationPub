import React, { SyntheticEvent, useEffect, useState } from "react";
import MyTextInput from "../elements/MyTextInput";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import MyLoadingButton, {
  BackButton,
  MyFormLabel,
  SectionTitle,
} from "../elements/Common";
import { apiErrorToToast } from "@/utils/helper";
import { toast } from "react-toastify";
import { FormStepsProps } from "../elements/elemTypes";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import MyAddressInput from "../elements/MyAddressInput";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function PersonalInfo({
  loanId,
  nextStep,
  previousStep,
  loanData,
  setLoanData,
  quickEdit,
}: FormStepsProps) {
  const [saving, setSaving] = useState<boolean>(false);
  const { at }: any = getUserData();
  const { user } = useAuth0();

  //plaid verification failed
  const [plaidFailed, setPlaidFailed] = useState(false);
  //plaid failed consent
  const [pfConsent, setPfConsent] = useState<boolean>(false);

  console.log("LD", loanData);
  const {
    register,
    handleSubmit,
    setFocus,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: loanData?.firstName ?? "",
      middleName: loanData?.middleName ?? null,
      lastName: loanData?.lastName ?? "",
      dateOfBirth: loanData?.dateOfBirth ?? "",
      address: loanData?.address ?? "",
      addressLine2: loanData?.addressLine2 ?? null,
      phoneNumber:
        typeof loanData?.phoneNumber === "string"
          ? loanData?.phoneNumber?.replace("+1", "")
          : null,
      email: user?.email,
      postalCode: loanData?.postalCode ?? "",

      ssn1:
        typeof loanData?.socialSecurityNumber === "string"
          ? loanData?.socialSecurityNumber.substring(0, 3)
          : "",
      ssn2:
        typeof loanData?.socialSecurityNumber === "string"
          ? loanData?.socialSecurityNumber.substring(3, 5)
          : "",
      ssn3:
        typeof loanData?.socialSecurityNumber === "string"
          ? loanData?.socialSecurityNumber.substring(5, 9)
          : "",
      //extra
      consent: loanData != null ? true : false,
    },
    mode: "onChange",
  });
  const onFormSubmit = async (data: any) => {
    //disabled edit if plaid verified
    if (loanData?.plaidVerified) {
      nextStep({ toPreview: quickEdit });
      return;
    }
    setSaving(true);
    const { ssn1, ssn2, ssn3, consent, ...rest } = data;
    const body = {
      ...rest,
      socialSecurityNumber: `${ssn1}${ssn2}${ssn3}`,
      address: Array.isArray(data?.address)
        ? data?.address?.[0]
        : data?.address,
      phoneNumber: `+1${data?.phoneNumber}`,
      email: user?.email,
    };
    console.log(body);
    try {
      const resp = await axios.post(
        USER.newLoan,
        {
          stage: "PERSONAL_INFORMATION",
          id: loanId,
          personalInformation: body,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        }
      );
      toast.success("Success, information saved.");
      setLoanData({
        personalInformation: { ...loanData, ...body, plaidVerified: true },
      });
      nextStep({ toPreview: quickEdit });
    } catch (e: any) {
      const reason = e?.response?.data?.reason ?? null;
      if (reason && reason === "PLAID_FAILED") {
        setLoanData({
          personalInformation: { ...loanData, ...body, plaidVerified: false },
        });
        setPlaidFailed(true);
      } else {
        apiErrorToToast(e);
      }
      console.log(e?.response ?? e);
    } finally {
      setSaving(false);
    }
  };
  const handleInputChange = (
    value: string,
    maxLength: number,
    nextField: any
  ) => {
    if (value.length === maxLength) {
      setFocus(nextField);
    }
  };

  const handleBackspace = (eKey: string, value: string, prevField: any) => {
    if (value.length === 0 && prevField && eKey === "Backspace") {
      setFocus(prevField);
    }
  };
  const consentChecked = watch("consent");
  const maxDOB = moment().subtract(18, "years").format("YYYY-MM-DD");
  const maxDayjsDob = dayjs().subtract(18, "year");
  const handlePlaidFailedClose = () => {
    setPlaidFailed(false);
  };
  //address split
  const rawAddress = watch("address");
  const addressStr =
    Array.isArray(rawAddress) && rawAddress.length > 0
      ? rawAddress[0]
      : rawAddress;
  let addressArr: string[] = [];
  if (typeof addressStr === "string" && addressStr.length > 0) {
    addressArr = addressStr.split(",");
  }

  const onChangeFailedConsent = (e: SyntheticEvent) => {
    const checked = (e.target as HTMLInputElement).checked as boolean;
    setPfConsent(checked);
  };
  const populatePostalCode = (pc: string) => {
    setValue("postalCode", pc);
  };
  return (
    <div style={{ position: "relative" }}>
      {saving && <OverlayLoader />}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {loanData?.plaidVerified === true && (
          <div className="text-success border-success mb-3">
            <Typography sx={{ fontWeight: 500 }}>
              The information on this page has already been verified and cannot
              be edited.
            </Typography>
          </div>
        )}
        <div
          className={`${
            loanData?.plaidVerified === true ? "disabled-div" : ""
          }`}
        >
          <SectionTitle title="Personal Details" />
          <Grid container rowSpacing={0} columnSpacing={2} className="mb-3">
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="text"
                label="First Name"
                name="firstName"
                className={`form-control ${
                  errors?.firstName ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.firstName}
                placeholder="John"
                validation={{
                  required: "First Name is required.",
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="text"
                label="Middle Name"
                name="middleName"
                className={`form-control ${
                  errors?.middleName ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.middleName}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="text"
                label="Last Name"
                name="lastName"
                className={`form-control ${
                  errors?.lastName ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.lastName}
                placeholder="Doe"
                validation={{
                  required: "Last Name is required.",
                }}
                required
              />
            </Grid>
            {/* <Grid item xs={12} lg={4}>
              <MyTextInput
                type="date"
                label="Date of Birth"
                name="dateOfBirth"
                className={`form-control ${
                  errors?.dateOfBirth ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.dateOfBirth}
                max={maxDOB}
                min="1900-01-01"
                validation={{
                  required: "Date of Birth is required.",
                  validate: (dob: string) => {
                    const val = moment().diff(moment(dob), "years");
                    if (val < 18) {
                      return "You must be 18 years old to apply.";
                    }
                    if (val > 120) {
                      return "Please enter a valid date of birth.";
                    }
                    return true;
                  },
                }}
                required
              />
            </Grid> */}
            <Grid item xs={12} lg={4}>
              {/* <MyTextInput
                type="date"
                label="Date of Birth"
                name="dateOfBirth"
                className={`form-control ${
                  errors?.dateOfBirth ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.dateOfBirth}
                max={maxDOB}
                min="1900-01-01"
                validation={{
                  required: "Date of Birth is required.",
                  validate: (dob: string) => {
                    const val = moment().diff(moment(dob), "years");
                    if (val < 18) {
                      return "You must be 18 years old to apply.";
                    }
                    if (val > 120) {
                      return "Please enter a valid date of birth.";
                    }
                    return true;
                  },
                }}
                required
              />{" "} */}
              <div className="mb-2">
                <MyFormLabel required>Date of Birth</MyFormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{
                      required: "Date of Birth is required.",
                      validate: (dob) => {
                        const dobStr = dob
                          ? dayjs(dob).format("DD/MM/YYYY")
                          : null;
                        const val = moment().diff(moment(dobStr), "years");
                        if (val < 18) {
                          return "You must be 18 years old to apply.";
                        }
                        if (val > 120) {
                          return "Please enter a valid date of birth.";
                        }
                        return true;
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        {...field}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          field.onChange(date ? dayjs(date) : null)
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: "outlined",
                            color: "info",
                            placeholder: "Select Date",
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                            sx: {
                              backgroundColor: "#fff",
                              height: "44px",
                              "& .MuiFormHelperText-root": {
                                margin: "2px 0px",
                                display: "block",
                                position: "relative",
                              },
                              "& .MuiOutlinedInput-root": {
                                "&:hover": {
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#ced4da",
                                  },
                                },
                                "&.Mui-focused": {
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderWidth: 1,
                                  },
                                },
                                "& .MuiOutlinedInput-input": {
                                  padding: "14px",
                                },
                              },
                              "& .MuiOutlinedInput-root.Mui-error": {
                                "&:hover": {
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#ced4da",
                                  },
                                },
                                "&.Mui-focused": {
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderWidth: 1,
                                  },
                                },
                                "& .MuiOutlinedInput-input": {
                                  padding: "14px",
                                },
                              },
                            },
                          },
                        }}
                        maxDate={maxDayjsDob}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </Grid>
          </Grid>
          <SectionTitle title="Contact Information" />
          <Grid container rowSpacing={0} columnSpacing={2} className="mb-3">
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="text"
                label="Email Address"
                name="email"
                className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                register={register}
                error={errors?.email}
                placeholder=""
                readOnly={true}
                validation={{
                  disabled: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="number"
                label="Cell Phone Number"
                preElement="+1"
                name="phoneNumber"
                register={register}
                error={errors?.phoneNumber}
                placeholder=""
                validation={{
                  required: "Phone number is required.",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid phone number.",
                  },
                }}
                required
                onInput={(event) => {
                  const value = (event.target as HTMLInputElement)
                    .value as string;
                  if (value?.length > 10) {
                    setValue("phoneNumber", value?.slice(0, 10));
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyAddressInput
                label="Street Address"
                control={control}
                name="address"
                defaultValue={loanData?.address ?? ""}
                error={errors?.address}
                validation={{
                  required: "Address is required.",
                }}
                setPostalCode={populatePostalCode}
                required
              />
            </Grid>

            {addressArr.length > 0 && (
              <>
                <Grid item xs={6} lg={6}>
                  <MyTextInput
                    type="text"
                    label="Street Address 2"
                    name="addressLine2"
                    register={register}
                    error={errors?.addressLine2}
                    placeholder="Suite or Apartment Number"
                  />
                </Grid>
                {/* <Grid item xs={6} lg={6}>
                  <MyTextInput
                    key={addressArr?.[addressArr.length - 4] + "4"}
                    type="text"
                    label="Street"
                    defaultValue={addressArr?.[addressArr.length - 4] ?? "N/A"}
                    // defaultValue={addressArr
                    //   .slice(0, addressArr.length - 3)
                    //   .join(",")}
                    readOnly={true}
                  />
                </Grid> */}
                <Grid item xs={6} lg={6}>
                  <MyTextInput
                    key={addressArr?.[addressArr.length - 3] + "3"}
                    type="text"
                    label="City"
                    defaultValue={addressArr?.[addressArr.length - 3] ?? "N/A"}
                    readOnly={true}
                  />
                </Grid>
                <Grid item xs={6} lg={6}>
                  <MyTextInput
                    key={addressArr?.[addressArr.length - 2] + "2"}
                    type="text"
                    label="State"
                    defaultValue={addressArr?.[addressArr.length - 2] ?? "N/A"}
                    readOnly={true}
                  />
                </Grid>
                <Grid item xs={6} lg={6}>
                  <MyTextInput
                    key={addressArr?.[addressArr.length - 1] + "1"}
                    type="text"
                    label="Country"
                    defaultValue={addressArr?.[addressArr.length - 1] ?? "N/A"}
                    className={`form-control`}
                    readOnly={true}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="number"
                label="Postal Code"
                name="postalCode"
                register={register}
                error={errors?.postalCode}
                placeholder="12345"
                validation={{
                  required: "Postal code is required",
                  maxLength: {
                    message: "Plese enter 5 digit postal code.",
                    value: 5,
                  },
                  minLength: {
                    message: "Plese enter 5 digit postal code.",
                    value: 5,
                  },
                }}
                onInput={(event) => {
                  const value = (event.target as HTMLInputElement)
                    .value as string;
                  if (value?.length > 5) {
                    setValue("postalCode", value?.slice(0, 5));
                  }
                }}
                required
              />
            </Grid>
          </Grid>
          <SectionTitle title="Social Security Number" />
          <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid item xs={12} lg={4}>
              <MyFormLabel required>
                Social Security Number or ITIN Number
              </MyFormLabel>
              <div className="input-group" style={{ alignItems: "center" }}>
                <input
                  type="password"
                  className={`form-control ${
                    errors?.ssn1 ? "border-danger" : ""
                  }`}
                  {...register("ssn1", {
                    required: "SSN is required.",
                    pattern: {
                      value: /^\d{3}$/,
                      message: "Must be 3 digits",
                    },
                    onChange: (e) =>
                      handleInputChange(e.target.value, 3, "ssn2"),
                  })}
                  onInput={(e: SyntheticEvent) => {
                    (e.target as HTMLInputElement).value = (
                      e.target as HTMLInputElement
                    ).value.replace(/\D/g, "");
                  }}
                  placeholder="XXX"
                  maxLength={3}
                  style={{ height: 46 }}
                />
                <span className="px-2">-</span>
                <input
                  type="password"
                  className={`form-control ${
                    errors?.ssn2 ? "border-danger" : ""
                  }`}
                  {...register("ssn2", {
                    required: "SSN is required.",
                    pattern: {
                      value: /^\d{2}$/,
                      message: "Must be 2 digits",
                    },
                    onChange: (e) =>
                      handleInputChange(e.target.value, 2, "ssn3"),
                  })}
                  style={{ maxWidth: 80, height: 46 }}
                  onInput={(e: SyntheticEvent) => {
                    (e.target as HTMLInputElement).value = (
                      e.target as HTMLInputElement
                    ).value.replace(/\D/g, "");
                  }}
                  placeholder="XX"
                  maxLength={2}
                  onKeyDown={(e) =>
                    handleBackspace(e.key, e.currentTarget.value, "ssn1")
                  }
                />
                <span className="px-2">-</span>
                <input
                  type="text"
                  className={`form-control ${
                    errors?.ssn3 ? "border-danger" : ""
                  }`}
                  {...register("ssn3", {
                    required: "SSN is required.",
                    pattern: {
                      value: /^\d{4}$/,
                      message: "Must be 4 digits",
                    },
                  })}
                  placeholder="XXXX"
                  maxLength={4}
                  onKeyDown={(e) =>
                    handleBackspace(e.key, e.currentTarget.value, "ssn2")
                  }
                  style={{ height: 46 }}
                  onInput={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    const replaced = target.value.replace(/\D/g, "");
                    if (replaced && replaced?.length > 4) {
                      target.value = replaced.slice(0, 4);
                    } else {
                      target.value = replaced;
                    }
                  }}
                />
              </div>
              {(errors?.ssn1 || errors?.ssn2 || errors?.ssn3) && (
                <Typography variant="body2" color="error.dark" sx={{ pt: 0.5 }}>
                  Invalid Social Security Number.
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
        <div className="mb-3 mt-3">
          <Typography variant="h4" className="mb-3 mt-2">
            Identity Verification Disclaimer
          </Typography>
          <Typography style={{ maxWidth: 700 }}>
            A disclaimer informs the user that by continuing, they agree to
            share their personal information with Plaid Inc. for identity
            verification. It also mentions Plaid's privacy policy and advises
            users to contact support if they disagree.
            {/* By continuing, you agree to share your personal information with
            Plaid Inc. for identity verification. Plaid will use this data
            according to its Privacy Policy. This is required for identity
            verification and fraud prevention. If you disagree, please stop and
            contact support. */}
          </Typography>
          <div className="mt-2 d-flex" style={{ gap: 10 }}>
            <input
              type="checkbox"
              className="form-check"
              {...register("consent", {
                required: "You must agree to the terms.",
              })}
            />{" "}
            I agree to the Identity Verification Disclaimer
          </div>
        </div>

        <div className="lform-btn-wrapper">
          <BackButton
            onClick={() => {
              previousStep();
            }}
          />
          <MyLoadingButton
            title="Save & Continue"
            loading={saving}
            disabled={!consentChecked}
          />
        </div>
      </form>
      <div>
        <Modal
          open={plaidFailed}
          onClose={handlePlaidFailedClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" color="error.dark">
              Plaid Verification Failed!
            </Typography>
            <Typography id="modal-modal-description" className="mt-2">
              Please send your document(ID) on email for further verification.
            </Typography>
            <Typography className="mb-3">
              Email: info@axcessfoundation.org
            </Typography>
            <div className="mb-3 d-flex gap-2">
              <input
                type="checkbox"
                className="form-check"
                onChange={onChangeFailedConsent}
              />{" "}
              I understand
            </div>
            <Button
              variant="contained"
              onClick={() => {
                nextStep({ toPreview: quickEdit });
              }}
              type="button"
              disabled={pfConsent === false}
            >
              Proceed
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

const OverlayLoader = () => {
  return (
    <div
      className="p-3"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        flexDirection: "column",
        zIndex: 999,
      }}
    >
      <div
        className="text-center py-4 px-5 bg-white"
        style={{ borderRadius: 5, boxShadow: "1px 1px 5px 1px #eee" }}
      >
        <CircularProgress />
        <Typography variant="h6">Verifying your identity...</Typography>
      </div>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const SSNInput = () => {
//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const ssnRef = useRef("");
//   const [masked, setMasked] = useState("");

//   const handleChange = (e) => {
//     const raw = e.target.value.replace(/\D/g, "").slice(0, 3);
//     ssnRef.current = raw;
//     setMasked("*".repeat(raw.length));
//     setValue("ssn1", "*".repeat(raw.length), {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         type="text"
//         placeholder="XXX"
//         inputMode="numeric"
//         autoComplete="off"
//         value={masked}
//         onChange={handleChange}
//         className={`form-control ${errors?.ssn1 ? "border-danger" : ""}`}
//         style={{ height: 46 }}
//         {...register("ssn1", {
//           validate: () =>
//             ssnRef.current.length === 3 || "Must be 3 digits",
//         })}
//       />

//       {errors.ssn1 && (
//         <p className="text-danger">{errors.ssn1.message}</p>
//       )}

//       <button type="submit">Submit</button>
//     </form>
//   );
// };
