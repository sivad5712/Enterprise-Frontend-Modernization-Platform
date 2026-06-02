import { describe, it, expect } from 'vitest';

describe('React Host Platform Tests', () => {
  it('correctly formats compact financial numbers for metrics widgets', () => {
    const formatCompactNumber = (value: number): string => {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short'
      }).format(value);
    };

    expect(formatCompactNumber(12845000)).toBe('13M'); // clearing average
    expect(formatCompactNumber(2450890000)).toBe('2.5B'); // AUM ledger
  });

  it('filters banking operations records based on custom queries', () => {
    const mockTxs = [
      { id: 'tx-201', customerName: 'Sarah Connor', category: 'RETAIL' },
      { id: 'tx-203', customerName: 'Tony Stark', category: 'UTILITIES' }
    ];

    const filterTransactions = (txs: typeof mockTxs, search: string) => {
      const q = search.toLowerCase();
      return txs.filter(t => t.customerName.toLowerCase().includes(q));
    };

    const results = filterTransactions(mockTxs, 'Stark');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('tx-203');
  });

  it('correctly maps severity badges configurations', () => {
    const getSeverityBadgeClass = (severity: string) => {
      if (severity === 'CRITICAL') return 'bg-danger text-light';
      if (severity === 'HIGH') return 'bg-warning text-dark';
      return 'bg-secondary';
    };

    expect(getSeverityBadgeClass('CRITICAL')).toBe('bg-danger text-light');
    expect(getSeverityBadgeClass('HIGH')).toBe('bg-warning text-dark');
  });
});
