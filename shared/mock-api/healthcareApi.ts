import healthcareData from '../data/healthcare-data.json';
import { HealthcareMetric, Member, Claim, CareGap, RiskScore, Observation } from '../types/healthcare';

const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const healthcareApi = {
  async getHealthcareMetrics(): Promise<HealthcareMetric> {
    await delay(300);
    return healthcareData.healthcareMetrics as HealthcareMetric;
  },

  async getMembers(): Promise<Member[]> {
    await delay(450);
    return healthcareData.members as Member[];
  },

  async searchMembers(query: string): Promise<Member[]> {
    await delay(350);
    const members = healthcareData.members as Member[];
    if (!query) return members;
    const term = query.toLowerCase();
    return members.filter(
      (m) =>
        m.firstName.toLowerCase().includes(term) ||
        m.lastName.toLowerCase().includes(term) ||
        m.mrn.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term)
    );
  },

  async getClaims(filters?: { status?: string; memberId?: string }): Promise<Claim[]> {
    await delay(500);
    let claims = healthcareData.claims as Claim[];
    if (filters) {
      if (filters.status && filters.status !== 'ALL') {
        claims = claims.filter((c) => c.status === filters.status);
      }
      if (filters.memberId) {
        claims = claims.filter((c) => c.memberId === filters.memberId);
      }
    }
    return claims;
  },

  async getCareGaps(filters?: { status?: string; severity?: string }): Promise<CareGap[]> {
    await delay(400);
    let gaps = healthcareData.careGaps as CareGap[];
    if (filters) {
      if (filters.status && filters.status !== 'ALL') {
        gaps = gaps.filter((g) => g.status === filters.status);
      }
      if (filters.severity && filters.severity !== 'ALL') {
        gaps = gaps.filter((g) => g.severity === filters.severity);
      }
    }
    return gaps;
  },

  async getRiskScores(): Promise<RiskScore[]> {
    await delay(300);
    return healthcareData.riskScores as RiskScore[];
  },

  async getObservations(memberId?: string): Promise<Observation[]> {
    await delay(350);
    const observations = healthcareData.observations as Observation[];
    if (memberId) {
      return observations.filter((o) => o.memberId === memberId);
    }
    return observations;
  }
};
