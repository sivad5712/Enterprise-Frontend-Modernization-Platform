import { describe, it, expect } from 'vitest';

describe('SRE DevOps Telemetry Tests', () => {
  it('correctly calculates service status color maps', () => {
    const getStatusClass = (status: string) => {
      if (status === 'HEALTHY') return 'success';
      if (status === 'DEGRADED') return 'warning';
      return 'danger';
    };

    expect(getStatusClass('HEALTHY')).toBe('success');
    expect(getStatusClass('DEGRADED')).toBe('warning');
    expect(getStatusClass('DOWN')).toBe('danger');
  });

  it('verifies billing growth changes MoM alerts', () => {
    const checkCostAlert = (percent: number) => percent > 10;
    
    expect(checkCostAlert(12.8)).toBe(true); // Azure warning
    expect(checkCostAlert(2.4)).toBe(false); // GCP stable
  });
});
