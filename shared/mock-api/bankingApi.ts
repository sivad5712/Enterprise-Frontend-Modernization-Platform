import bankingData from '../data/banking-data.json';
import { Customer, Account, Transaction, FraudAlert, BankingMetric, BankingReport } from '../types/banking';

// Helper to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const bankingApi = {
  async getBankingMetrics(): Promise<BankingMetric> {
    await delay(300);
    return bankingData.bankingMetrics as BankingMetric;
  },

  async getCustomers(): Promise<Customer[]> {
    await delay(400);
    return bankingData.customers as Customer[];
  },

  async getAccounts(): Promise<Account[]> {
    await delay(350);
    return bankingData.accounts as Account[];
  },

  async getTransactions(filters?: {
    status?: string;
    type?: string;
    search?: string;
    isSuspicious?: boolean;
  }): Promise<Transaction[]> {
    await delay(500);
    let txs = bankingData.transactions as Transaction[];

    if (filters) {
      if (filters.status && filters.status !== 'ALL') {
        txs = txs.filter((t) => t.status === filters.status);
      }
      if (filters.type && filters.type !== 'ALL') {
        txs = txs.filter((t) => t.type === filters.type);
      }
      if (filters.isSuspicious !== undefined) {
        txs = txs.filter((t) => t.isSuspicious === filters.isSuspicious);
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        txs = txs.filter(
          (t) =>
            t.customerName.toLowerCase().includes(query) ||
            t.merchant.toLowerCase().includes(query) ||
            t.id.toLowerCase().includes(query)
        );
      }
    }

    return txs;
  },

  async getFraudAlerts(): Promise<FraudAlert[]> {
    await delay(450);
    return bankingData.fraudAlerts as FraudAlert[];
  },

  async getReports(): Promise<BankingReport[]> {
    await delay(300);
    return bankingData.reports as BankingReport[];
  }
};
