export type FormStepsProps = {
  loanId: number | null;
  nextStep: (data?: any) => void;
  previousStep: () => void;
  loanData: any;
  setLoanData: (data: any) => void;
  quickEdit: boolean;
};
