import { Severity } from './common';

export interface Member {
  id: string;
  mrn: string; // Medical Record Number
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  primaryPayer: string;
  riskScore: number; // 0.0 to 10.0 (HCC risk score)
  assignedCareManagerId?: string;
  status: 'ACTIVE' | 'DISCHARGED' | 'INACTIVE';
}

export interface Claim {
  id: string;
  memberId: string;
  memberName: string;
  claimNumber: string;
  serviceDate: string;
  providerName: string;
  diagnosisCodes: string[];
  totalCharged: number;
  totalAllowed: number;
  status: 'PAID' | 'PENDING' | 'DENIED' | 'ADJUDICATED';
}

export interface CareGap {
  id: string;
  memberId: string;
  memberName: string;
  gapName: string; // e.g. "Colorectal Cancer Screening", "HbA1c Testing"
  measureCode: string; // e.g. "HEDIS-COL", "HEDIS-A1C"
  status: 'OPEN' | 'CLOSED' | 'EXEMPT';
  openedDate: string;
  dueDate: string;
  severity: Severity;
}

export interface RiskScore {
  id: string;
  memberId: string;
  score: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  lastAssessmentDate: string;
  riskCategory: 'LOW' | 'MEDIUM' | 'HIGH' | 'COMPLEX';
}

export interface Observation {
  id: string;
  memberId: string;
  timestamp: string;
  type: 'BLOOD_PRESSURE' | 'GLUCOSE' | 'WEIGHT' | 'HEART_RATE';
  value: string;
  unit: string;
  status: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
}

export interface HealthcareMetric {
  totalMembersTracked: number;
  openCareGaps: number;
  pendingClaims: number;
  highRiskMembersCount: number;
  averageHccRiskScore: number;
}
