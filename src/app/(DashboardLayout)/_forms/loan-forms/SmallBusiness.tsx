import React, { useEffect, useState } from "react";
import MyTextInput from "../elements/MyTextInput";
import MyRadioInput from "../elements/MyRadioInput";
import { useForm } from "react-hook-form";
import { Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";
import MyLoadingButton, { BackButton } from "../elements/Common";
import { apiErrorToToast, EMAIL_REGEX } from "@/utils/helper";
import { FormStepsProps } from "../elements/elemTypes";
import { toast } from "react-toastify";

export default function SmallBusinessInfo({
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
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      businessInformation: {
        businessName: loanData?.businessInformation?.businessName ?? null,
        businessAddress: loanData?.businessInformation?.businessAddress ?? null,
        businessType: loanData?.businessInformation?.businessType ?? null,
        industrySector: loanData?.businessInformation?.industrySector ?? null,
        businessStartDate:
          loanData?.businessInformation?.businessStartDate ?? null,
        taxIdentificationNumber:
          loanData?.businessInformation?.taxIdentificationNumber ?? null,
        annualGrossRevenue:
          loanData?.businessInformation?.annualGrossRevenue ?? null,
        netProfitLastYear:
          loanData?.businessInformation?.netProfitLastYear ?? null,
        numberOfEmployees:
          loanData?.businessInformation?.numberOfEmployees ?? null,
      },
      loanDetailsForBusiness: {
        loanAmountRequested:
          loanData?.loanDetailsForBusiness?.loanAmountRequested ?? null,
        loanPurposeEnum:
          loanData?.loanDetailsForBusiness?.loanPurposeEnum ?? null,
        preferredLoanTerm:
          loanData?.loanDetailsForBusiness?.preferredLoanTerm ?? null,
        collateralRequired:
          loanData?.loanDetailsForBusiness?.collateralRequired === true
            ? "true"
            : "false",
        collateralDetails:
          loanData?.loanDetailsForBusiness?.collateralDetails ?? null,
        otherLoanPurpose:
          loanData?.loanDetailsForBusiness?.otherLoanPurpose ?? null,
        otherLoanTerm: loanData?.loanDetailsForBusiness?.otherLoanTerm ?? null,
      },
      ownershipInformation: [
        {
          fullName: "",
          ownershipPercentage: null,
          ssnEncrypted: null,
          phoneNumber: "",
          emailAddress: "",
        },
      ],
      businessBankingInformation: {
        businessBankName:
          loanData?.businessBankingInformation?.businessBankName ?? null,
        accountType: loanData?.businessBankingInformation?.accountType ?? null,
      },
      ownersNumber: Array.isArray(loanData?.ownershipInformation)
        ? loanData?.ownershipInformation?.length
        : 0,
    },
  });
  //default value for ownership array
  if (Array.isArray(loanData?.ownershipInformation)) {
    //ask to remove id from api response
    const loanInfoFormatted = loanData?.ownershipInformation?.map(
      (item: any) => {
        const { id, ...rest } = item;
        return rest;
      }
    );
    if (loanInfoFormatted.length > 0) {
      setValue("ownershipInformation", loanInfoFormatted);
    }
  }
  //const businessType = watch("businessInformation.businessType");
  const loanPurpose = watch("loanDetailsForBusiness.loanPurposeEnum");
  const loanTerm = watch("loanDetailsForBusiness.preferredLoanTerm");
  const collateralReq = watch("loanDetailsForBusiness.collateralRequired");

  const ownersNumber = watch("ownersNumber");
  //handle owners on number change
  useEffect(() => {
    const ownersList = getValues("ownershipInformation");
    if (Array.isArray(ownersList) && ownersList.length > ownersNumber) {
      const ownersUpdated = ownersList?.slice(0, ownersNumber);
      setValue("ownershipInformation", ownersUpdated);
    }
  }, [ownersNumber]);

  const onFormSubmit = async (data: any) => {
    setSaving(true);
    console.log(data);
    const { ownersNumber, ...rest } = data;
    if (rest?.loanDetailsForBusiness?.collateralRequired === "true") {
      rest.loanDetailsForBusiness.collateralRequired = true;
    } else {
      rest.loanDetailsForBusiness.collateralRequired = false;
    }
    try {
      const resp = await axios.post(
        USER.newLoan,
        {
          stage: "SMALL_BUSINESS_LOAN_INFORMATION",
          id: loanId,
          smallBusinessLoanInformationRequest: rest,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        }
      );
      toast.success("Business details saved.");
      setLoanData({ smallBusinessLoanInformation: rest });
      nextStep({ toPreview: quickEdit });
    } catch (e: any) {
      apiErrorToToast(e);
      console.log(e?.response ?? e);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Divider className="mb-3">
            <Typography>Business Information</Typography>
          </Divider>
          <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="text"
                label="Business Name"
                name="businessInformation.businessName"
                className={`form-control ${
                  errors?.businessInformation?.businessName ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.businessInformation?.businessName}
                validation={{
                  required: "Name is required.",
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="text"
                label="Business Address"
                name="businessInformation.businessAddress"
                className={`form-control ${
                  errors?.businessInformation?.businessAddress
                    ? "is-invalid"
                    : ""
                }`}
                register={register}
                error={errors?.businessInformation?.businessAddress}
                validation={{
                  required: "Address is required.",
                }}
                required
              />
            </Grid>
            <Grid
              item
              xs={12}
              //lg={businessType === "OTHER" ? 6 : 12}
            >
              <MyRadioInput
                label="Business Type"
                name="businessInformation.businessType"
                register={register}
                validation={{
                  required: "Business Type is required.",
                }}
                error={errors?.businessInformation?.businessType}
                fields={[
                  {
                    label: "Sole Proprietorship",
                    value: "SOLE_PROPRIETORSHIP",
                  },
                  {
                    label: "Partnership",
                    value: "PARTNERSHIP",
                  },
                  {
                    label: "Limited Liability Company (LLC)",
                    value: "LLC",
                  },
                  {
                    label: "Corporation",
                    value: "CORPORATION",
                  },
                  {
                    label: "Nonprofit",
                    value: "NONPROFIT",
                  },
                  {
                    label: "Other",
                    value: "OTHER",
                  },
                ]}
                required
              />
            </Grid>
            {/* {businessType === "OTHER" && (
              <Grid item xs={12} lg={6}>
                <MyTextInput
                  type="text"
                  label="Enter Business Type"
                  name=""
                  className={`form-control ${
                    errors?. ? "is-invalid" : ""
                  }`}
                  register={register}
                  error={errors?.}
                  validation={{
                    required: "This is required.",
                  }}
                />
              </Grid>
            )} */}
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="text"
                label="Industry/Business Sector"
                name="businessInformation.industrySector"
                className={`form-control ${
                  errors?.businessInformation?.industrySector
                    ? "is-invalid"
                    : ""
                }`}
                register={register}
                error={errors?.businessInformation?.industrySector}
                validation={{
                  required: "This is required.",
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="date"
                label="Business Start Date"
                name="businessInformation.businessStartDate"
                className={`form-control ${
                  errors?.businessInformation?.businessStartDate
                    ? "is-invalid"
                    : ""
                }`}
                register={register}
                error={errors?.businessInformation?.businessStartDate}
                validation={{
                  required: "Start date is required.",
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="text"
                label="Tax Identification Number (TIN)"
                name="businessInformation.taxIdentificationNumber"
                className={`form-control ${
                  errors?.businessInformation?.taxIdentificationNumber
                    ? "is-invalid"
                    : ""
                }`}
                register={register}
                error={errors?.businessInformation?.taxIdentificationNumber}
                validation={{
                  required: "TIN is required.",
                  minLength: { value: 9, message: "Invalid TIN." },
                  maxLength: { value: 15, message: "Invalid TIN." },
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="number"
                preElement="$"
                label="Annual Gross Revenue"
                name="businessInformation.annualGrossRevenue"
                className={`form-control ${
                  errors?.businessInformation?.annualGrossRevenue
                    ? "is-invalid"
                    : ""
                }`}
                register={register}
                error={errors?.businessInformation?.annualGrossRevenue}
                validation={{
                  setValueAs: (value: string) => parseFloat(value),
                  required: "This is required.",
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="number"
                preElement="$"
                label="Net Profit (Last Year)"
                name="businessInformation.netProfitLastYear"
                className={`form-control ${
                  errors?.businessInformation?.netProfitLastYear
                    ? "is-invalid"
                    : ""
                }`}
                register={register}
                error={errors?.businessInformation?.netProfitLastYear}
                validation={{
                  setValueAs: (value: string) => parseFloat(value),
                  required: "This is required.",
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="number"
                label="Number of Employees"
                name="businessInformation.numberOfEmployees"
                className={`form-control ${
                  errors?.businessInformation?.numberOfEmployees
                    ? "is-invalid"
                    : ""
                }`}
                register={register}
                error={errors?.businessInformation?.numberOfEmployees}
                validation={{
                  setValueAs: (value: string) => parseInt(value),
                  required: "This is required.",
                }}
                required
              />
            </Grid>
          </Grid>
          <Divider className="mb-3">
            <Typography>Loan Details</Typography>
          </Divider>
          <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="text"
                preElement="$"
                label="Loan Amount Requested"
                name="loanDetailsForBusiness.loanAmountRequested"
                className={`form-control ${
                  errors?.loanDetailsForBusiness?.loanAmountRequested
                    ? "is-invalid"
                    : ""
                }`}
                register={register}
                error={errors?.loanDetailsForBusiness?.loanAmountRequested}
                validation={{
                  required: "This is required.",
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyRadioInput
                label="Purpose of Loan"
                name="loanDetailsForBusiness.loanPurposeEnum"
                register={register}
                validation={{
                  required: "Purpose is required.",
                }}
                error={errors?.loanDetailsForBusiness?.loanPurposeEnum}
                fields={[
                  {
                    label: "Inventory/Equipment Purchase",
                    value: "INVENTORY_EQUIPMENT_PURCHASE",
                  },
                  {
                    label: "Working Capital",
                    value: "WORKING_CAPITAL",
                  },
                  {
                    label: "Expansion",
                    value: "EXPANSION",
                  },
                  {
                    label: "Debt Consolidation",
                    value: "DEBT_CONSOLIDATION",
                  },
                  {
                    label: "Other",
                    value: "OTHER",
                  },
                ]}
                required
              />
            </Grid>
            {loanPurpose === "OTHER" && (
              <Grid item xs={12} lg={6}>
                <MyTextInput
                  type="text"
                  label="Purpose of Loan (Other)"
                  name="loanDetailsForBusiness.otherLoanPurpose"
                  className={`form-control ${
                    errors?.loanDetailsForBusiness?.otherLoanPurpose
                      ? "is-invalid"
                      : ""
                  }`}
                  register={register}
                  error={errors?.loanDetailsForBusiness?.otherLoanPurpose}
                  validation={{
                    required: "This is required.",
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} lg={6}>
              <MyRadioInput
                label="Preferred Loan Term"
                name="loanDetailsForBusiness.preferredLoanTerm"
                register={register}
                validation={{
                  required: "Preferred term is required.",
                }}
                error={errors?.loanDetailsForBusiness?.preferredLoanTerm}
                fields={[
                  {
                    label: "6 Months",
                    value: "SIX_MONTHS",
                  },
                  {
                    label: "12 Months",
                    value: "TWELVE_MONTHS",
                  },
                  {
                    label: "18 Months",
                    value: "EIGHTEEN_MONTHS",
                  },
                  {
                    label: "Other",
                    value: "OTHER",
                  },
                ]}
                required
              />
            </Grid>
            {loanTerm === "OTHER" && (
              <Grid item xs={12} lg={6}>
                <MyTextInput
                  type="text"
                  label="Loan Term (Other)"
                  name="loanDetailsForBusiness.otherLoanTerm"
                  className={`form-control ${
                    errors?.loanDetailsForBusiness?.otherLoanTerm
                      ? "is-invalid"
                      : ""
                  }`}
                  register={register}
                  error={errors?.loanDetailsForBusiness?.otherLoanTerm}
                  placeholder=""
                  validation={{
                    required: "This is required.",
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} lg={6}>
              <MyRadioInput
                label="Collateral (If required)"
                name="loanDetailsForBusiness.collateralRequired"
                register={register}
                validation={{
                  required: "This is required.",
                }}
                error={errors?.loanDetailsForBusiness?.collateralRequired}
                fields={[
                  {
                    label: "Yes",
                    value: "true",
                  },
                  {
                    label: "No",
                    value: "false",
                  },
                ]}
              />
            </Grid>
            {collateralReq === "true" && (
              <Grid item xs={12} lg={6}>
                <MyTextInput
                  type="text"
                  label="Collateral Details"
                  name="loanDetailsForBusiness.collateralDetails"
                  className={`form-control ${
                    errors?.loanDetailsForBusiness?.collateralDetails
                      ? "is-invalid"
                      : ""
                  }`}
                  register={register}
                  error={errors?.loanDetailsForBusiness?.collateralDetails}
                  placeholder=""
                  validation={{
                    required: "This is required.",
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Divider className="mb-3">
            <Typography>Ownership Information</Typography>
          </Divider>
          <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid item xs={12} lg={4}>
              <MyTextInput
                type="number"
                label="Number of Owners"
                name="ownersNumber"
                className={`form-control ${
                  errors?.ownersNumber ? "is-invalid" : ""
                }`}
                register={register}
                error={errors?.ownersNumber}
                validation={{
                  setValueAs: (value: string) => parseInt(value),
                  required: "This is required.",
                  min: {
                    value: 1,
                    message: "Mininum value is 1.",
                  },
                  max: {
                    value: 5,
                    message: "Maximum value is 5.",
                  },
                }}
                helpText="With 20% or more ownership. (Max: 5)"
                required
                onInput={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  if (parseInt(value) > 5) {
                    setValue("ownersNumber", 5);
                  }
                  if (parseInt(value) < 1) {
                    setValue("ownersNumber", 1);
                  }
                }}
                min={1}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              {Array.from(
                Array(isNaN(ownersNumber) ? 0 : Math.abs(ownersNumber))
              ).map((itm, index) => (
                <div className="border p-3 mb-2" key={index + " "}>
                  <Typography variant="h6" className="mb-2">
                    {index + 1}. Owner #{index + 1} Details
                  </Typography>
                  <Grid container columnSpacing={2}>
                    <Grid item xs={12} lg={4}>
                      <MyTextInput
                        type="text"
                        label="Owner Full Name"
                        name={`ownershipInformation.${index}.fullName`}
                        className={`form-control ${
                          errors?.ownershipInformation?.[index]?.fullName
                            ? "is-invalid"
                            : ""
                        }`}
                        register={register}
                        error={errors?.ownershipInformation?.[index]?.fullName}
                        validation={{
                          required: "This is required.",
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                      <MyTextInput
                        type="number"
                        label="Ownership Percentage"
                        name={`ownershipInformation.${index}.ownershipPercentage`}
                        className={`form-control ${
                          errors?.ownershipInformation?.[index]
                            ?.ownershipPercentage
                            ? "is-invalid"
                            : ""
                        }`}
                        register={register}
                        error={
                          errors?.ownershipInformation?.[index]
                            ?.ownershipPercentage
                        }
                        validation={{
                          setValueAs: (value: string) => parseFloat(value),
                          required: "This is required.",
                          min: {
                            value: 20,
                            message: "20% ownership is required.",
                          },
                          max: {
                            value: 100,
                            message: "Invalid percentage.",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <MyTextInput
                        type="password"
                        label="SSN"
                        name={`ownershipInformation.${index}.ssnEncrypted`}
                        className={`form-control ${
                          errors?.ownershipInformation?.[index]?.ssnEncrypted
                            ? "is-invalid"
                            : ""
                        }`}
                        register={register}
                        error={
                          errors?.ownershipInformation?.[index]?.ssnEncrypted
                        }
                        validation={{
                          required: "This is required.",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <MyTextInput
                        type="number"
                        label="Phone Number"
                        name={`ownershipInformation.${index}.phoneNumber`}
                        className={`form-control ${
                          errors?.ownershipInformation?.[index]?.phoneNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        register={register}
                        error={
                          errors?.ownershipInformation?.[index]?.phoneNumber
                        }
                        validation={{
                          required: "This is required.",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <MyTextInput
                        type="text"
                        label="Email Address"
                        name={`ownershipInformation.${index}.emailAddress`}
                        className={`form-control ${
                          errors?.ownershipInformation?.[index]?.emailAddress
                            ? "is-invalid"
                            : ""
                        }`}
                        register={register}
                        error={
                          errors?.ownershipInformation?.[index]?.emailAddress
                        }
                        validation={{
                          required: "This is required.",
                          pattern: {
                            value: EMAIL_REGEX,
                            message: "Invalid email address.",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Grid>
          </Grid>

          <Divider className="my-3">
            <Typography>Business Banking Information</Typography>
          </Divider>
          <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid item xs={12} lg={6}>
              <MyTextInput
                type="text"
                label="Business Bank Name"
                name="businessBankingInformation.businessBankName"
                className={`form-control ${
                  errors?.businessBankingInformation?.businessBankName
                    ? "is-invalid"
                    : ""
                }`}
                register={register}
                error={errors?.businessBankingInformation?.businessBankName}
                validation={{
                  required: "This is required.",
                }}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MyRadioInput
                label="Business Account Type"
                name="businessBankingInformation.accountType"
                register={register}
                validation={{
                  required: "This is required.",
                }}
                error={errors?.businessBankingInformation?.accountType}
                fields={[
                  {
                    label: "Business Checking",
                    value: "BUSINESS_CHECKING",
                  },
                  {
                    label: "Business Savings",
                    value: "BUSINESS_SAVINGS",
                  },
                ]}
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
