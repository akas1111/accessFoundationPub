import React, { useState } from "react";
import MyTextInput from "../elements/MyTextInput";
import MyRadioInput from "../elements/MyRadioInput";
import { useForm } from "react-hook-form";
import { Divider, Grid } from "@mui/material";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import MyLoadingButton, {
  BackButton,
  SecSectionTitle,
  SectionTitle,
} from "../elements/Common";
import { toast } from "react-toastify";
import { apiErrorToToast } from "@/utils/helper";
import { FormStepsProps } from "../elements/elemTypes";
import appEnums from "../../_components/dashboard/enums";

export default function BankingInfo({
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
    defaultValues: {
      haveBankAccount: loanData?.haveBankAccount === true ? "Yes" : "No",
      bankingAccountType: loanData?.bankingAccountType ?? null,
      bankName: loanData?.bankName ?? null,
      accountNumber: loanData?.accountNumber ?? null,
      routingNumber: loanData?.routingNumber ?? null,
      savingBalance: loanData?.savingBalance ?? null,
      checkingBalance: loanData?.checkingBalance ?? null,
      other: loanData?.other ?? null,
    },
  });
  const onFormSubmit = async (data: any) => {
    if (data?.haveBankAccount === "Yes") {
      data.haveBankAccount = true;
    } else {
      data.haveBankAccount = false;
    }
    console.log(data);
    try {
      setSaving(true);
      const resp = await axios.post(
        USER.newLoan,
        {
          stage: "BANKING_INFORMATION",
          id: loanId,
          bankingInformation: data,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        }
      );
      toast.success("Success, information saved.");
      setLoanData({ bankingInformation: { ...loanData, ...data } });
      nextStep({ toPreview: quickEdit });
    } catch (e: any) {
      apiErrorToToast(e);
      console.log(e?.response ?? e);
    } finally {
      setSaving(false);
    }
  };
  const [haveBankAcc, accountType] = watch([
    "haveBankAccount",
    "bankingAccountType",
  ]);

  const setNumberValue = (value: any) => {
    if (!value || value === "") {
      return null;
    }
    if (value.length > 0) {
      return parseFloat(value);
    } else {
      return value;
    }
  };
  return (
    <div>
      <div>
        <SectionTitle title="Bank Information" />
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container rowSpacing={1} columnSpacing={2} className="py-3">
            <Grid item xs={12} lg={8}>
              <SecSectionTitle title="Do you have a bank account?" />
              <MyRadioInput
                label="Please select"
                name="haveBankAccount"
                register={register}
                validation={{
                  required: "This is required.",
                }}
                error={errors?.haveBankAccount}
                fields={[
                  { label: "Yes", value: "Yes" },
                  {
                    label: "No",
                    value: "No",
                  },
                ]}
                required
                displayProps={{
                  placeholder: "",
                  value: haveBankAcc ?? "",
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <SecSectionTitle title="What types of account do you have?" />
              <MyRadioInput
                label="Please select the account type"
                name="bankingAccountType"
                register={register}
                validation={{
                  required:
                    haveBankAcc === "Yes" ? "Account Type is required." : false,
                }}
                error={errors?.bankingAccountType}
                fields={[
                  { label: "Savings", value: "SAVINGS" },
                  {
                    label: "Checking",
                    value: "CHECKING",
                  },
                  {
                    label: "401k",
                    value: "FOUR_ZERO_ONE_K",
                  },
                  {
                    label: "CD",
                    value: "CD",
                  },
                  {
                    label: "Others",
                    value: "OTHERS",
                  },
                ]}
                required={haveBankAcc === "Yes" ? true : false}
                displayProps={{
                  placeholder: "Savings",
                  value: appEnums?.[accountType] ?? "", //
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <MyTextInput
                label="Bank Name"
                name="bankName"
                register={register}
                error={errors?.bankName}
                validation={{
                  required:
                    haveBankAcc === "Yes" ? "Bank Name is required." : false,
                }}
                required={haveBankAcc === "Yes" ? true : false}
                placeholder="Bank Name"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                label="Account Number"
                name="accountNumber"
                register={register}
                error={errors?.accountNumber}
                validation={{
                  required:
                    haveBankAcc === "Yes" ? "Bank Account is required." : false,
                }}
                required={haveBankAcc === "Yes" ? true : false}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                label="Routing Number"
                name="routingNumber"
                register={register}
                error={errors?.routingNumber}
                validation={{
                  required:
                    haveBankAcc === "Yes"
                      ? "Routing Number is required."
                      : false,
                }}
                required={haveBankAcc === "Yes" ? true : false}
                placeholder="12345"
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <SecSectionTitle title="Estimated balance in the account" />
              <MyTextInput
                preElement="$"
                type="number"
                label="Saving Account"
                name="savingBalance"
                register={register}
                error={errors?.savingBalance}
                placeholder="50"
                validation={{
                  setValueAs: setNumberValue,
                  max: {
                    value: 10.0e6,
                    message: "Invalid value.",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <MyTextInput
                preElement="$"
                type="number"
                label="Checking Account"
                name="checkingBalance"
                register={register}
                error={errors?.checkingBalance}
                placeholder="50"
                validation={{
                  setValueAs: setNumberValue,
                  max: {
                    value: 10.0e6,
                    message: "Invalid value.",
                  },
                }}
                // required
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <MyTextInput
                preElement="$"
                type="number"
                label="Other"
                name="other"
                register={register}
                error={errors?.other}
                placeholder="50"
                validation={{
                  setValueAs: setNumberValue,
                  max: {
                    value: 10.0e6,
                    message: "Invalid value.",
                  },
                }}
                // required
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
