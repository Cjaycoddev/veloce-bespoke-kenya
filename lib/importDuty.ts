// ============================================================
//  Kenya vehicle import duty calculator
//  Rates per current Finance Act (KEBS age limit: 8 years)
// ============================================================

export interface DutyInputs {
  cifKes: number;         // Cost, Insurance, Freight (in KES)
  engineCc: number;
  year: number;
}

export interface DutyResult {
  cif: number;
  importDutyRate: number;
  importDuty: number;
  exciseRate: number;
  exciseDuty: number;
  vatRate: number;
  vat: number;
  idfRate: number;
  idf: number;
  rdlRate: number;
  rdl: number;
  totalTaxes: number;
  landedCost: number;
  isAgeEligible: boolean;
  ageYears: number;
}

export const IMPORT_DUTY_RATE = 0.25; // 25% of CIF
export const VAT_RATE = 0.16;          // 16%
export const IDF_RATE = 0.02;          // 2% of CIF
export const RDL_RATE = 0.015;         // 1.5% of CIF
export const MAX_AGE_YEARS = 8;

export function getExciseRate(cc: number): number {
  if (cc <= 1500) return 0.20;
  if (cc <= 2500) return 0.25;
  if (cc <= 3000) return 0.30;
  return 0.35;
}

export function calculateImportDuty(input: DutyInputs): DutyResult {
  const { cifKes, engineCc, year } = input;

  const importDuty = cifKes * IMPORT_DUTY_RATE;
  const exciseRate = getExciseRate(engineCc);
  const exciseDuty = (cifKes + importDuty) * exciseRate;
  const vat = (cifKes + importDuty + exciseDuty) * VAT_RATE;
  const idf = cifKes * IDF_RATE;
  const rdl = cifKes * RDL_RATE;

  const totalTaxes = importDuty + exciseDuty + vat + idf + rdl;
  const landedCost = cifKes + totalTaxes;

  const currentYear = new Date().getFullYear();
  const ageYears = currentYear - year;
  const isAgeEligible = ageYears <= MAX_AGE_YEARS;

  return {
    cif: Math.round(cifKes),
    importDutyRate: IMPORT_DUTY_RATE,
    importDuty: Math.round(importDuty),
    exciseRate,
    exciseDuty: Math.round(exciseDuty),
    vatRate: VAT_RATE,
    vat: Math.round(vat),
    idfRate: IDF_RATE,
    idf: Math.round(idf),
    rdlRate: RDL_RATE,
    rdl: Math.round(rdl),
    totalTaxes: Math.round(totalTaxes),
    landedCost: Math.round(landedCost),
    isAgeEligible,
    ageYears,
  };
}

export function formatKES(value: number): string {
  return 'KES ' + Math.round(value).toLocaleString('en-KE');
}

export const DEFAULT_DUTY_INPUTS: DutyInputs = {
  cifKes: 3500000,
  engineCc: 2000,
  year: new Date().getFullYear() - 3,
};

export const USD_TO_KES = 130; // editable on the page