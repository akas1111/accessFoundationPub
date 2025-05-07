import React, { useState } from "react";
import MyTextInput from "../elements/MyTextInput";
import MyRadioInput from "../elements/MyRadioInput";
import { useForm } from "react-hook-form";
import { Grid, Typography } from "@mui/material";
import { USER } from "@/utils/endpoints";
import axios from "axios";
import { getUserData } from "@/utils/UserContext";
import MyLoadingButton, { BackButton, MyFormLabel } from "../elements/Common";
import { toast } from "react-toastify";
import { apiErrorToToast } from "@/utils/helper";
import appEnums from "../../_components/dashboard/enums";
import { usePathname, useRouter } from "next/navigation";

type LoanInfoProps = {
  loanId: number | null;
  nextStep: (data: any) => void;
  setLoanId: (id: number) => void;
  loanData: any;
  setLoanData: (data: any) => void;
  quickEdit: boolean;
};

export default function LoanInfo({
  loanId = null,
  nextStep,
  setLoanId,
  loanData,
  setLoanData,
  quickEdit,
}: LoanInfoProps) {
  const [saving, setSaving] = useState<boolean>(false);
  const { at }: any = getUserData();
  const pathname = usePathname();
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      loanInformation: loanData?.loanInformation ?? null,
      loanAmountRequested: loanData?.loanAmountRequested ?? null,
      loanTerm: loanData?.loanTerm ?? "ONE_TO_SIX_MONTHS",
      purposeOfLoan: loanData?.purposeOfLoan ?? "RENT_PAYMENT",
      reasonForLoan: loanData?.reasonForLoan ?? null,
      //test field
      //otherPurpose: null,
    },
    mode: "onChange",
  });
  const onFormSubmit = async (data: any) => {
    setSaving(true);
    try {
      const resp = await axios.post(
        USER.newLoan,
        {
          stage: "CUSTOMER_APPLICATION",
          id: loanId ?? null,
          customerApplication: data,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        }
      );
      const newId = resp?.data?.data?.id ?? null;
      console.log("id: ", newId);
      if (newId) {
        if (!loanId) {
          //add id in url
          const params = new URLSearchParams();
          params.set("idx", String(newId));
          replace(`${pathname}?${params.toString()}`);
        }
        setLoanId(newId);
        setLoanData({ customerApplication: data });
        toast.success("Success, data saved.");
        //continue
        nextStep({ toPreview: quickEdit });
      }
    } catch (e: any) {
      apiErrorToToast(e);
      console.log(e?.response ?? e);
    } finally {
      setSaving(false);
    }
  };
  const [loanInfo, loanPurpose, loanTerm] = watch([
    "loanInformation",
    "purposeOfLoan",
    "loanTerm",
  ]);

  return (
    <div>
      <Typography variant="h4">Loan Information</Typography>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={3} className="py-3">
          <Grid item xs={12} lg={12}>
            <MyTextInput
              preElement="$"
              type="number"
              label="Loan Amount"
              name="loanAmountRequested"
              className={`form-control ${
                errors?.loanAmountRequested ? "is-invalid" : ""
              }`}
              register={register}
              error={errors?.loanAmountRequested}
              validation={{
                setValueAs: (value: string) => parseFloat(value),
                required: "Loan amount is required.",
                min: {
                  value: 1,
                  message: "Minimum amount is 1",
                },
                max: {
                  value: 5000,
                  message: "Maximum amount is 5000",
                },
              }}
              min={1}
              max={5000}
              helpText="Max amount is $5000."
              required
              disabled={loanData?.loanInformation === "CREDIT_BUILDING_LOAN"}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <MyRadioInput
              label="Loan Type I am applying for"
              name="loanInformation"
              register={register}
              validation={{
                required: "Loan type is required.",
              }}
              vertical
              error={errors?.loanInformation}
              fields={[
                { label: "Emergency (Rental) Loan", value: "EMERGENCY_LOAN" },
                {
                  label: "Credit Building Loan",
                  value: "CREDIT_BUILDING_LOAN",
                },
                // {
                //   label: "Small Business Loan",
                //   value: "SMALL_BUSINESS_LOAN",
                // },
              ]}
              required
              locked
              displayProps={{
                value: appEnums?.[loanInfo] ?? "",
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <MyRadioInput
              label="Loan Terms"
              name="loanTerm"
              register={register}
              validation={{
                required: "Loan terms is required.",
              }}
              error={errors?.loanTerm}
              //vertical
              fields={[
                { label: "6 months", value: "ONE_TO_SIX_MONTHS" },
                { label: "6-12 months", value: "SIX_TO_TWELVE_MONTHS" },
                { label: "1 year", value: "ONE_YEAR" },
                { label: "2 years", value: "TWO_YEAR" },
                { label: "3 years", value: "THREE_YEAR" },
                { label: "4 years", value: "FOUR_YEAR" },
                { label: "5 years", value: "FIVE_YEAR" },
              ]}
              required
              displayProps={{
                value: appEnums?.[loanTerm] ?? "",
                readOnly: true,
              }}
              locked={loanData?.loanInformation === "CREDIT_BUILDING_LOAN"}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <MyRadioInput
              label="Purpose of Loan"
              name="purposeOfLoan"
              register={register}
              validation={{
                required: "Purpose is required.",
              }}
              error={errors?.purposeOfLoan}
              fields={[
                { label: "Rent Payment", value: "RENT_PAYMENT" },
                {
                  label: "Credit Building",
                  value: "CREDIT_BUILDING",
                  disabled: loanData?.loanInformation === "EMERGENCY_LOAN",
                },
                { label: "Utilities", value: "UTILITIES" },
                { label: "Car Repair", value: "CAR_REPAIR" },
                { label: "Medical Expenses", value: "MEDICAL_EXPENSES" },
                { label: "Other", value: "OTHER" },
              ]}
              locked={loanData?.loanInformation === "CREDIT_BUILDING_LOAN"}
              required
              displayProps={{
                value: appEnums?.[loanPurpose] ?? "",
                readOnly: true,
                //readOnly: loanPurpose === "OTHER" ? false : true,
                // ...(loanPurpose === "OTHER"
                //   ? {
                //       register: register,
                //       name: "otherPurpose",
                //       validation: { required: "This is required." },
                //       error: errors?.otherPurpose,
                //       value: otherPurpose,
                //     }
                //   : {}),
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <div className="mb-3">
              <MyFormLabel required>
                Reason why you are requesting for a loan
              </MyFormLabel>
              <textarea
                className={`form-control ${
                  errors?.reasonForLoan ? "is-invalid" : ""
                }`}
                {...register("reasonForLoan", {
                  required: "Reason is required.",
                })}
                rows={2}
              ></textarea>
              <Typography
                variant="body2"
                className="pt-1"
                color="text.secondary"
              >
                In a few sentences, please describe why you are applying for
                this loan.
              </Typography>
              {errors?.reasonForLoan && (
                <Typography variant="body2" color="error.dark" sx={{ pt: 0.5 }}>
                  <>{errors?.reasonForLoan?.message ?? ""}</>
                </Typography>
              )}
            </div>
          </Grid>
        </Grid>
        <div className="lform-btn-wrapper">
          <BackButton hidden />
          <MyLoadingButton title="Save and Continue" loading={saving} />
        </div>
      </form>
    </div>
  );
}
