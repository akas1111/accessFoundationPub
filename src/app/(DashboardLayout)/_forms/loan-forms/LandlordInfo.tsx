import React, { useState } from "react";
import MyTextInput from "../elements/MyTextInput";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import MyLoadingButton, { BackButton } from "../elements/Common";
import { toast } from "react-toastify";
import { apiErrorToToast, EMAIL_REGEX } from "@/utils/helper";
import { FormStepsProps } from "../elements/elemTypes";
import MyAddressInput from "../elements/MyAddressInput";

export default function LandlordInformation({
  loanId,
  nextStep,
  previousStep,
  loanData,
  setLoanData,
  quickEdit,
}: FormStepsProps) {
  const [saving, setSaving] = useState<boolean>(false);
  const { at }: any = getUserData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm({
    defaultValues: {
      landlordOrCompanyName: loanData?.landlordOrCompanyName ?? null,
      address: loanData?.address ?? null,
      addressTwo: loanData?.addressTwo ?? null,
      phoneNumber: loanData?.phoneNumber ?? null,
      email: loanData?.email ?? null,
      managerName: loanData?.managerName ?? null,
      postalCode: loanData?.postalCode ?? null,
    },
  });
  const onFormSubmit = async (data: any) => {
    //manage address select data
    if (Array.isArray(data?.address)) {
      data.address = data?.address?.[0] ?? null;
    }
    setSaving(true);
    try {
      const resp = await axios.post(
        USER.newLoan,
        {
          stage: "LANDLORD_INFORMATION",
          id: loanId,
          landlordInformation: data,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        }
      );
      toast.success("Success, landlord details saved.");
      setLoanData({ landlordInformation: data });
      nextStep({ toPreview: quickEdit });
    } catch (e: any) {
      apiErrorToToast(e);
      console.log(e?.response ?? e);
    } finally {
      setSaving(false);
    }
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
  const populatePostalCode = (pc: string) => {
    setValue("postalCode", pc);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container rowSpacing={1} columnSpacing={3} className="py-3">
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="text"
                label="Landlords/Property Management Company Name"
                name="landlordOrCompanyName"
                className={`form-control ${
                  errors?.landlordOrCompanyName ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.landlordOrCompanyName}
                validation={{
                  required: "This is required.",
                }}
                required
                placeholder="e.g. XYZ Company"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyAddressInput
                label="Address"
                control={control}
                name="address"
                defaultValue={loanData?.address ?? ""}
                error={errors?.address}
                validation={{
                  required: "Address is required",
                }}
                required
                setPostalCode={populatePostalCode}
              />
            </Grid>
            {addressArr.length > 0 && (
              <>
                <Grid item xs={6} lg={6}>
                  <MyTextInput
                    type="text"
                    label="Street Address 2"
                    name="addressTwo"
                    register={register}
                    error={errors?.addressTwo}
                    placeholder="Suite or Apartment Number"
                  />
                </Grid>
                {/* <Grid item xs={6} lg={6}>
                  <MyTextInput
                    key={addressArr?.[addressArr.length - 4] + "4"}
                    type="text"
                    label="Street"
                    defaultValue={addressArr
                      .slice(0, addressArr.length - 3)
                      .join(",")}
                    className={`form-control`}
                    readOnly={true}
                  />
                </Grid> */}
                <Grid item xs={6} lg={6}>
                  <MyTextInput
                    key={addressArr?.[addressArr.length - 3] + "3"}
                    type="text"
                    label="City"
                    defaultValue={addressArr?.[addressArr.length - 3] ?? "N/A"}
                    className={`form-control`}
                    readOnly={true}
                  />
                </Grid>
                <Grid item xs={6} lg={6}>
                  <MyTextInput
                    key={addressArr?.[addressArr.length - 2] + "2"}
                    type="text"
                    label="State"
                    defaultValue={addressArr?.[addressArr.length - 2] ?? "N/A"}
                    className={`form-control`}
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
                className={`form-control ${
                  errors?.postalCode ? "is-invalid" : ""
                }`}
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
            <Grid item xs={12} lg={6}>
              <MyTextInput
                preElement="+1"
                type="number"
                label="Phone Number"
                name="phoneNumber"
                className={`form-control ${
                  errors?.phoneNumber ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.phoneNumber}
                validation={{
                  required: "Phone Number is required.",
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
              <MyTextInput
                type="text"
                label="Email Address"
                name="email"
                className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                register={register}
                error={errors?.email}
                validation={{
                  required: "Email is required.",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Invalid email address.",
                  },
                }}
                required
                placeholder="john@doe.com"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="text"
                label="Manager Name"
                name="managerName"
                className={`form-control ${
                  errors?.managerName ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.managerName}
                validation={{
                  required: "This is required.",
                }}
                required
              />
            </Grid>
          </Grid>
          <div className="lform-btn-wrapper">
            <BackButton
              onClick={() => {
                previousStep();
              }}
            />
            <MyLoadingButton title="Save and Continue" loading={saving} />
          </div>
        </form>
      </div>
    </div>
  );
}
