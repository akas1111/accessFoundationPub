import React, { useState } from "react";
import MyTextInput from "../elements/MyTextInput";
import MyRadioInput from "../elements/MyRadioInput";
import { useForm } from "react-hook-form";
import { Divider, Grid } from "@mui/material";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import MyLoadingButton, { BackButton } from "../elements/Common";
import { toast } from "react-toastify";
import { apiErrorToToast } from "@/utils/helper";
import { FormStepsProps } from "../elements/elemTypes";
import appEnums from "../../_components/dashboard/enums";

export default function PersonalInfoContd({
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
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      typeOfResidence: loanData?.typeOfResidence ?? null,
      yearsInResidence: loanData?.yearsInResidence ?? null,
      civilStatus: loanData?.civilStatus ?? null,
      numberOfDependents: loanData?.numberOfDependents ?? null,
      monthlyRent: loanData?.monthlyRent ?? null,
      totalMonthlyExpenses: loanData?.totalMonthlyExpenses ?? null,
    },
  });
  const onFormSubmit = async (data: any) => {
    setSaving(true);
    try {
      const resp = await axios.post(
        USER.newLoan,
        {
          stage: "PERSONAL_INFORMATION_SECONDPAGE",
          id: loanId,
          personalInformationSecondPageRequest: data,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        }
      );
      toast.success("Success, information saved.");
      setLoanData({ personalInformation: { ...loanData, ...data } });
      nextStep({ toPreview: quickEdit });
    } catch (e: any) {
      apiErrorToToast(e);
      console.log(e?.response ?? e);
    } finally {
      setSaving(false);
    }
  };
  const [residenceType, civilStatus] = watch([
    "typeOfResidence",
    "civilStatus",
  ]);
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container rowSpacing={0} columnSpacing={2} className="py-3">
            <Grid item xs={12} lg={12}>
              <MyRadioInput
                label="Type of Residence"
                name="typeOfResidence"
                register={register}
                validation={{
                  required: "Residence type is required.",
                }}
                error={errors?.typeOfResidence}
                fields={[
                  { label: "Owned", value: "OWNED" },
                  {
                    label: "Rented",
                    value: "RENTED",
                  },
                  {
                    label: "Living with Family",
                    value: "LIVING_WITH_FAMILY",
                  },
                  {
                    label: "Other",
                    value: "OTHER",
                  },
                ]}
                required
                displayProps={{
                  value: appEnums?.[residenceType] ?? "",
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <MyRadioInput
                label="Civil Status"
                name="civilStatus"
                register={register}
                validation={{
                  required: "Civil Status is required.",
                }}
                error={errors?.civilStatus}
                fields={[
                  { label: "Single", value: "SINGLE" },
                  {
                    label: "Married",
                    value: "MARRIED",
                  },
                  {
                    label: "Divorced",
                    value: "DIVORCED",
                  },
                  {
                    label: "Widowed",
                    value: "WIDOWED",
                  },
                ]}
                required
                displayProps={{
                  value: appEnums?.[civilStatus] ?? "",
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="number"
                label="How many years have you been staying in this residence?"
                name="yearsInResidence"
                register={register}
                error={errors?.yearsInResidence}
                validation={{
                  setValueAs: (value: string) => parseFloat(value),
                  required: "This is required.",
                  max: {
                    value: 100,
                    message: "Invalid value.",
                  },
                }}
                required
                placeholder="e.g. 2"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="number"
                label="Number of dependents"
                name="numberOfDependents"
                className={`form-control ${
                  errors?.numberOfDependents ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.numberOfDependents}
                placeholder="e.g. 23"
                validation={{
                  setValueAs: (value: string) => parseFloat(value),
                  required: "This is required.",
                  max: {
                    value: 100,
                    message: "Invalid value.",
                  },
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="number"
                preElement="$"
                label="Monthly Rent"
                name="monthlyRent"
                className={`form-control ${
                  errors?.monthlyRent ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.monthlyRent}
                validation={{
                  setValueAs: (value: string) => parseFloat(value),
                  required:
                    residenceType !== "OWNED"
                      ? "Monthly rent is required."
                      : false,
                  max: {
                    value: 10.0e6,
                    message: "Invalid value.",
                  },
                }}
                required={residenceType !== "OWNED"}
                placeholder="2000"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="number"
                preElement="$"
                label="Total amount of other monthly expenses(bills/loan/other)"
                name="totalMonthlyExpenses"
                className={`form-control ${
                  errors?.totalMonthlyExpenses ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.totalMonthlyExpenses}
                validation={{
                  setValueAs: (value: string) => parseFloat(value),
                  required: "This is required.",
                  min: {
                    value: 1,
                    message: "Value should not be zero.",
                  },
                  max: {
                    value: 10.0e6,
                    message: "Invalid value.",
                  },
                }}
                required
                placeholder="4500"
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
