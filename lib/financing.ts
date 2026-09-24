// ============================================================
//  Financing math  standard amortization formula
//  Same formula Kenyan banks use for asset finance.
// ============================================================

export type EmploymentType =
  | 'Salaried'
  | 'Self-employed'
  | 'Business owner';

export interface FinancingInputs {
  vehiclePrice: number;   // KES
  depositPercent: number; // 1050
  loanTermMonths: number; // 12, 24, 36, 48, 60, 72
  annualRate: number;     // e.g. 13.5 (%)
}

export interface FinancingResult {
  deposit: number;
  principal: number;
  monthlyRate: number;
  monthlyPayment: number;
  totalRepayable: number;
  totalInterest: number;
}

export function calculateFinancing(
  input: FinancingInputs
): FinancingResult {
  const { vehiclePrice, depositPercent, loanTermMonths, annualRate } = input;

  const deposit = Math.round((vehiclePrice * depositPercent) / 100);
  const principal = Math.max(vehiclePrice - deposit, 0);
  const monthlyRate = annualRate / 12 / 100;
  const n = loanTermMonths;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = n > 0 ? principal / n : 0;
  } else {
    const factor = Math.pow(1 + monthlyRate, n);
    monthlyPayment = (principal * (monthlyRate * factor)) / (factor - 1);
  }

  const totalRepayable = monthlyPayment * n;
  const totalInterest = totalRepayable - principal;

  return {
    deposit,
    principal,
    monthlyRate,
    monthlyPayment: Math.round(monthlyPayment),
    totalRepayable: Math.round(totalRepayable),
    totalInterest: Math.round(totalInterest),
  };
}

export function formatKES(value: number): string {
  return 'KES ' + Math.round(value).toLocaleString('en-KE');
}

export const LOAN_TERMS = [12, 24, 36, 48, 60, 72] as const;

export const DEFAULT_INPUTS: FinancingInputs = {
  vehiclePrice: 8_950_000,
  depositPercent: 20,
  loanTermMonths: 60,
  annualRate: 13.5,
};