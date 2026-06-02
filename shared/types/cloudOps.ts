import { Severity } from './common';

export interface Microservice {
  id: string;
  name: string;
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  version: string;
  uptime: number; // percentage
  latencyMs: number;
  errorRate: number; // percentage
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  lastDeploy: string;
}

export interface Deployment {
  id: string;
  serviceId: string;
  serviceName: string;
  version: string;
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  status: 'SUCCESS' | 'IN_PROGRESS' | 'FAILED' | 'ROLLBACK';
  deployedAt: string;
  deployedBy: string;
  commitHash: string;
  durationSeconds: number;
}

export interface Incident {
  id: string;
  title: string;
  serviceId: string;
  serviceName: string;
  severity: Severity;
  status: 'INVESTIGATING' | 'IDENTIFIED' | 'MONITORING' | 'RESOLVED';
  createdAt: string;
  resolvedAt?: string;
  summary: string;
  assignedTo: string;
}

export interface KubernetesCluster {
  id: string;
  name: string;
  provider: 'GKE' | 'EKS' | 'AKS';
  region: string;
  nodeCount: number;
  cpuCapacityCore: number;
  memoryCapacityGb: number;
  status: 'ACTIVE' | 'SCALING' | 'MAINTENANCE' | 'UNHEALTHY';
}

export interface CloudCost {
  id: string;
  billingPeriod: string;
  provider: 'GCP' | 'AWS' | 'AZURE';
  amount: number;
  currency: string;
  changePercent: number; // month over month
}

export interface CloudMetric {
  overallUptime: number;
  activeDeployments: number;
  openIncidentsCount: number;
  totalMonthlySpend: number;
}
