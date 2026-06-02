export type Role = 'SUPER_ADMIN' | 'BANKING_OPERATOR' | 'CLINICAL_MANAGER' | 'DEVOPS_ENGINEER';

export type Permission = 
  | 'VIEW_DASHBOARD'
  | 'MANAGE_USERS'
  | 'APPROVE_TRANSACTIONS'
  | 'VIEW_PATIENTS'
  | 'EDIT_PATIENTS'
  | 'RESTART_SERVICES'
  | 'ACCESS_AUDIT_LOGS';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: Role;
  permissions: Permission[];
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  lastLogin: string;
  avatarUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type Status = 'SUCCESS' | 'PENDING' | 'FAILED' | 'RESOLVED' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  username: string;
  role: Role;
  action: string;
  category: 'SECURITY' | 'TRANSACTION' | 'PATIENT_DATA' | 'INFRASTRUCTURE' | 'SYSTEM';
  severity: Severity;
  ipAddress: string;
  details: string;
}
