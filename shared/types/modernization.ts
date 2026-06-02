import { Severity } from './common';

export interface LegacyApplication {
  id: string;
  name: string;
  technology: string; // e.g. "jQuery 1.11, ASP.NET Web Forms"
  linesOfCode: number;
  complexityScore: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  modernizationStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'STABILIZED';
  migrationProgress: number; // percentage
  businessValue: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedRetirementDate: string;
}

export interface ModernizationStage {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';
  startDate: string;
  endDate: string;
  keyDeliverables: string[];
}

export interface MigrationRisk {
  id: string;
  title: string;
  description: string;
  impact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  probability: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  mitigationStrategy: string;
  status: 'MONITORED' | 'MITIGATED' | 'TRIGGERED';
}

export interface SuccessMetric {
  id: string;
  category: 'PERFORMANCE' | 'DEVELOPER_VELOCITY' | 'RELIABILITY' | 'SECURITY';
  metricName: string;
  baselineValue: string;
  targetValue: string;
  currentValue: string;
  unit: string;
}

export interface RoadmapItem {
  id: string;
  quarter: string; // e.g. "2026-Q1"
  title: string;
  targetFramework: 'REACT' | 'ANGULAR' | 'VUE' | 'SHARED';
  dependencies: string[];
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED';
}
