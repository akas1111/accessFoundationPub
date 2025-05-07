import React, { useState } from "react";
import MyTextInput from "../elements/MyTextInput";
import MyRadioInput from "../elements/MyRadioInput";
import { useForm } from "react-hook-form";
import { Grid, Typography } from "@mui/material";
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
import appEnums from "../../_components/dashboard/enums";
import { usePathname, useRouter } from "next/navigation";

type SavingProgramProps = {
  loanId: number | null;
  nextStep: (data: any) => void;
  setLoanId: (id: number) => void;
  loanData: any;
  setLoanData: (data: any) => void;
  quickEdit: boolean;
};

export default function SavingProgramInfo({
  loanId,
  nextStep,
  loanData,
  setLoanData,
  quickEdit,
  setLoanId,
}: SavingProgramProps) {
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
      haveEmergencySaving:
        loanData?.haveEmergencySaving === true ? "Yes" : "No",
      savingAccount: loanData?.savingAccount ?? null,
      savePerMonth: loanData?.savePerMonth ?? null,
      targetMonth: loanData?.targetMonth ?? null,
    },
  });
  const onFormSubmit = async (data: any) => {
    if (data?.haveEmergencySaving === "Yes") {
      data.haveEmergencySaving = true;
    } else {
      data.haveEmergencySaving = false;
    }

    try {
      setSaving(true);
      const resp = await axios.post(
        USER.newLoan,
        {
          stage: "SAVING_PROGRAM",
          id: loanId ?? null,
          savingProgram: data,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        }
      );
      const newId = resp?.data?.data?.id ?? null;
      if (newId) {
        if (!loanId) {
          //add id in url
          const params = new URLSearchParams();
          params.set("idx", String(newId));
          replace(`${pathname}?${params.toString()}`);
        }
        setLoanId(newId);
        setLoanData({ savingProgram: data });
        toast.success("Success, information saved.");
        nextStep({ toPreview: quickEdit });
      }
    } catch (e: any) {
      apiErrorToToast(e);
      console.log(e?.response ?? e);
    } finally {
      setSaving(false);
    }
  };
  const [savingAccount, targetMonth, haveEmSaving] = watch([
    "savingAccount",
    "targetMonth",
    "haveEmergencySaving",
  ]);
  return (
    <div>
      <div>
        <SectionTitle title="Saving Program" />
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container rowSpacing={1} columnSpacing={2} className="py-3">
            <Grid item xs={12} lg={8}>
              <SecSectionTitle title="Do you have Emergency saving of at least $1000?" />
              <MyRadioInput
                label="Please select"
                name="haveEmergencySaving"
                register={register}
                validation={{
                  required: "This is required.",
                }}
                error={errors?.haveEmergencySaving}
                fields={[
                  { label: "Yes", value: "Yes" },
                  {
                    label: "No",
                    value: "No",
                  },
                ]}
                required
                displayProps={{
                  value: haveEmSaving ?? "",
                  readOnly: true,
                }}
              />
              {haveEmSaving === "No" && (
                <div
                  className="p-3 mb-2"
                  style={{
                    background: "rgba(255,0,0,0.1)",
                    borderRadius: 6,
                    border: "1px solid rgba(255,0,0,0.1)",
                  }}
                >
                  <Typography className="text-danger">
                    You must have an active saving account to participate in
                    this program. Please open the saving account before we can
                    finalize your application.
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid item xs={12} lg={8}>
              <SecSectionTitle title="What is the specific goal you are saving for?" />
              <MyRadioInput
                label="Please select"
                name="savingAccount"
                register={register}
                validation={{
                  required:
                    haveEmSaving === "Yes" ? "This is required." : false,
                }}
                error={errors?.savingAccount}
                fields={[
                  { label: "Emergency Fund", value: "EMERGENCY_FUND" },
                  {
                    label: "Down Payment",
                    value: "DOWN_PAYMENT",
                  },
                  {
                    label: "Pay Off Debt",
                    value: "PAY_OFF_DEBT",
                  },
                ]}
                required={haveEmSaving === "Yes" ? true : false}
                displayProps={{
                  placeholder: "Savings Goal",
                  value: appEnums?.[savingAccount] ?? "",
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <SectionTitle title="Monthly Saving Goal" />
              <SecSectionTitle title="How much do you plan to save per month?" />
              <MyTextInput
                type="number"
                preElement="$"
                label="Enter Amount"
                name="savePerMonth"
                register={register}
                error={errors?.savePerMonth}
                validation={{
                  setValueAs: (value: string) => parseFloat(value),
                  required:
                    haveEmSaving === "Yes" ? "Amount is required." : false,
                  max: {
                    value: 10.0e6,
                    message: "Invalid value.",
                  },
                }}
                required={haveEmSaving === "Yes" ? true : false}
                placeholder="500"
                step={0.1}
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <SecSectionTitle title="What is your target months you want to achieve your goal by?" />
              <MyRadioInput
                label="Please select"
                name="targetMonth"
                register={register}
                validation={{
                  required:
                    haveEmSaving === "Yes"
                      ? "Savings goal is required."
                      : false,
                }}
                error={errors?.targetMonth}
                fields={[
                  { label: "2 months", value: "TWO_MONTHS" },
                  {
                    label: "3 Months",
                    value: "THREE_MONTHS",
                  },
                  {
                    label: "4 Months",
                    value: "FOUR_MONTHS",
                  },
                  {
                    label: "5 Months",
                    value: "FIVE_MONTHS",
                  },
                ]}
                required={haveEmSaving === "Yes" ? true : false}
                displayProps={{
                  placeholder: "Savings Goal",
                  value: appEnums?.[targetMonth] ?? "",
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <div className="lform-btn-wrapper">
            <BackButton hidden />
            <MyLoadingButton title="Save and Continue" loading={saving} />
          </div>
        </form>
      </div>
    </div>
  );
}
