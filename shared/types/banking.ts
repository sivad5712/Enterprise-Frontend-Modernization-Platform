import { Severity } from './common';

export interface Customer {
  id: string;
  name: string;
  email: string;
  riskScore: number;
  kycStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  joinedDate: string;
}

export interface Account {
  id: string;
  customerId: string;
  accountNumber: string;
  type: 'CHECKING' | 'SAVINGS' | 'INVESTMENT';
  balance: number;
  currency: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
}

export interface Transaction {
  id: string;
  accountId: string;
  customerName: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'PAYMENT';
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'REVERSED';
  timestamp: string;
  merchant: string;
  category: 'RETAIL' | 'FINANCE' | 'UTILITIES' | 'TRAVEL' | 'ENTERTAINMENT';
  isSuspicious: boolean;
}

export interface FraudAlert {
  id: string;
  transactionId: string;
  accountNumber: string;
  customerName: string;
  amount: number;
  timestamp: string;
  score: number; // 0-100 fraud probability
  severity: Severity;
  status: 'NEW' | 'UNDER_INVESTIGATION' | 'DISMISSED' | 'CONFIRMED_FRAUD';
  triggerReason: string;
}

export interface BankingMetric {
  totalAssetsUnderManagement: number;
  activeAccountsCount: number;
  dailyTransactionVolume: number;
  fraudAlertsOpen: number;
  monthlyGrowthRate: number;
}

export interface BankingReport {
  id: string;
  title: string;
  generatedAt: string;
  generatedBy: string;
  format: 'PDF' | 'CSV' | 'XLSX';
  downloadUrl: string;
  size: string;
}
