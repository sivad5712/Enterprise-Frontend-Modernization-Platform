export interface Member {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  primaryPayer: string;
  riskScore: number;
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
  gapName: string;
  measureCode: string;
  status: 'OPEN' | 'CLOSED' | 'EXEMPT';
  openedDate: string;
  dueDate: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
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
