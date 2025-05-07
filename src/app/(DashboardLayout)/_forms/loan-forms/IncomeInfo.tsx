import React, { useState } from "react";
import MyTextInput from "../elements/MyTextInput";
import MyRadioInput from "../elements/MyRadioInput";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import MyLoadingButton, { BackButton } from "../elements/Common";
import { toast } from "react-toastify";
import { apiErrorToToast } from "@/utils/helper";
import { FormStepsProps } from "../elements/elemTypes";
import MyAddressInput from "../elements/MyAddressInput";
import appEnums from "../../_components/dashboard/enums";

export default function IncomeInfo({
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
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sourceOfIncome: loanData?.sourceOfIncome ?? null,
      occupation: loanData?.occupation ?? null,
      jobPositionTitle: loanData?.jobPositionTitle ?? null,
      yearsWithCompany: loanData?.yearsWithCompany ?? null,
      companyName: loanData?.companyName ?? null,
      companyAddress: loanData?.companyAddress ?? null,
      addressTwo: loanData?.addressTwo ?? null,
      monthlyGrossIncome: loanData?.monthlyGrossIncome ?? null,
      previousEmployment: loanData?.previousEmployment ?? null,

      //check
      companyPostalCode: loanData?.companyPostalCode ?? null,
    },
  });

  const onFormSubmit = async (data: any) => {
    //manage address select data
    if (Array.isArray(data?.companyAddress)) {
      data.companyAddress = data?.companyAddress?.[0] ?? null;
    }
    setSaving(true);
    try {
      const resp = await axios.post(
        USER.newLoan,
        {
          stage: "EMPLOYMENT_INFORMATION",
          id: loanId,
          employmentInformation: data,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        }
      );
      toast.success("Success, income information saved.");
      setLoanData({ employmentInformation: data });
      nextStep({ toPreview: quickEdit });
    } catch (e: any) {
      apiErrorToToast(e);
      console.log(e?.response ?? e);
    } finally {
      setSaving(false);
    }
  };
  const incomeSource = watch("sourceOfIncome");
  const isEmployed = incomeSource === "EMPLOYED";
  //const isSelfEmployed = incomeSource === "SELF_EMPLOYED";
  const workYears = watch("yearsWithCompany");

  //address split
  const rawAddress = watch("companyAddress");
  const addressStr =
    Array.isArray(rawAddress) && rawAddress.length > 0
      ? rawAddress[0]
      : rawAddress;
  let addressArr: string[] = [];
  if (typeof addressStr === "string" && addressStr.length > 0) {
    addressArr = addressStr.split(",");
  }

  const populatePostalCode = (pc: string) => {
    setValue("companyPostalCode", pc);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container rowSpacing={1} columnSpacing={3} className="py-3">
          <Grid item xs={12} lg={12}>
            <MyRadioInput
              label="Source of Income"
              name="sourceOfIncome"
              register={register}
              validation={{
                required: "Income source is required.",
              }}
              error={errors?.sourceOfIncome}
              fields={[
                { label: "Employed", value: "EMPLOYED" },
                {
                  label: "Self-Employed",
                  value: "SELF_EMPLOYED",
                },
                {
                  label: "Not Employed (looking for a job)",
                  value: "NOT_EMPLOYED",
                },
                {
                  label: "Other",
                  value: "OTHER",
                },
              ]}
              required
              displayProps={{
                value: appEnums?.[incomeSource] ?? "",
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MyTextInput
              type="text"
              label="Occupation"
              name="occupation"
              className={`form-control ${
                errors?.occupation ? "is-invalid" : ""
              }`}
              register={register}
              error={errors?.occupation}
              validation={{
                required: isEmployed ? "Occupation is required." : false,
              }}
              helpText="What do you do?"
              required={isEmployed ? true : false}
              placeholder="e.g. Nurse"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MyTextInput
              type="text"
              label="Job Position/Title"
              name="jobPositionTitle"
              className={`form-control ${
                errors?.jobPositionTitle ? "is-invalid" : ""
              }`}
              register={register}
              error={errors?.jobPositionTitle}
              //helpText="If unemployed, previous job title/position."
              validation={{
                required: isEmployed ? "This is required." : false,
              }}
              required={isEmployed ? true : false}
              placeholder="e.g. Registered Nurse"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MyTextInput
              type="number"
              label="How many years have you been working with this company?"
              name="yearsWithCompany"
              className={`form-control ${
                errors?.yearsWithCompany ? "is-invalid" : ""
              }`}
              register={register}
              error={errors?.yearsWithCompany}
              //helpText="Current/Previous"
              validation={{
                required: isEmployed ? "This is required." : false,
                max: {
                  value: 100,
                  message: "Invalid value.",
                },
              }}
              required={isEmployed ? true : false}
              placeholder="2"
              min={0}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MyTextInput
              type="text"
              label="Company Name"
              name="companyName"
              className={`form-control ${
                errors?.companyName ? "is-invalid" : ""
              }`}
              register={register}
              error={errors?.companyName}
              validation={{
                required: isEmployed ? "Company Name is required." : false,
              }}
              //helpText="If unemployed, previous company."
              required={isEmployed ? true : false}
              placeholder="e.g. XYZ Clinic"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MyAddressInput
              label="Address"
              control={control}
              name="companyAddress"
              defaultValue={loanData?.companyAddress ?? ""}
              error={errors?.companyAddress}
              validation={{
                required: isEmployed ? "This is required." : false,
              }}
              setPostalCode={populatePostalCode}
              required={isEmployed ? true : false}
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
              {/*<Grid item xs={6} lg={6}>
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
              </Grid>
              */}
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
              name="companyPostalCode"
              label="Postal Code"
              register={register}
              className="form-control"
              validation={{
                required: isEmployed ? "This is required." : false,
                maxLength: {
                  message: "Please enter 5 digit code.",
                  value: 5,
                },
                minLength: {
                  message: "Please enter 5 digit code.",
                  value: 5,
                },
              }}
              error={errors?.companyPostalCode}
              required={isEmployed ? true : false}
              placeholder="12345"
              onInput={(event) => {
                const value = (event.target as HTMLInputElement)
                  .value as string;
                if (value?.length > 5) {
                  setValue("companyPostalCode", value?.slice(0, 5));
                }
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MyTextInput
              preElement="$"
              type="number"
              label="Monthly Gross Income"
              name="monthlyGrossIncome"
              className={`form-control ${
                errors?.monthlyGrossIncome ? "is-invalid" : ""
              }`}
              register={register}
              error={errors?.monthlyGrossIncome}
              validation={{
                setValueAs: (value: string) => parseFloat(value),
                required: isEmployed ? "This is required." : false,
                max: {
                  value: 10.0e6,
                  message: "Invalid value.",
                },
              }}
              helpText="If unemployed, last paycheck amount."
              required={isEmployed ? true : false}
              placeholder="6500"
            />
          </Grid>
          {isEmployed && workYears <= 2 && (
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="text"
                label="Previous Employment"
                name="previousEmployment"
                className={`form-control ${
                  errors?.previousEmployment ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.previousEmployment}
                validation={{
                  required: "This is required.",
                }}
                helpText="Please include company name, address, manager name and phone/email."
                required
              />
            </Grid>
          )}
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
  );
}
