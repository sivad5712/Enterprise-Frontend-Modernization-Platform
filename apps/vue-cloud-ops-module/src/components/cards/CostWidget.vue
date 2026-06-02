<script setup lang="ts">
import { CloudCost } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/formatters';

defineProps<{
  costs: CloudCost[];
}>();
</script>

<template>
  <div class="card bg-dark text-light border-secondary">
    <div class="card-header border-secondary bg-secondary bg-opacity-25 d-flex justify-content-between align-items-center">
      <h6 class="mb-0"><i class="fa-solid fa-file-invoice-dollar me-2 text-success"></i>Monthly Cloud Cost Accrual</h6>
      <span class="badge bg-secondary">May 2026</span>
    </div>
    <div class="card-body">
      <div v-for="cost in costs" :key="cost.id" class="mb-3">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="d-flex align-items-center gap-2 font-monospace text-secondary small">
            <i v-if="cost.provider === 'GCP'" class="fa-brands fa-google text-cyan"></i>
            <i v-else-if="cost.provider === 'AWS'" class="fa-brands fa-aws text-warning"></i>
            <i v-else class="fa-brands fa-microsoft text-primary"></i>
            {{ cost.provider }} TELEMETRY ACCRUAL
          </span>
          <span class="font-monospace text-white font-bold">{{ formatCurrency(cost.amount) }}</span>
        </div>
        <div class="d-flex justify-content-between align-items-center small">
          <span class="text-secondary text-opacity-75">Month-over-Month</span>
          <span :class="cost.changePercent > 0 ? 'text-danger' : 'text-success'">
            {{ cost.changePercent > 0 ? '+' : '' }}{{ cost.changePercent }}% MoM
            <i :class="cost.changePercent > 0 ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down'"></i>
          </span>
        </div>
        <hr class="border-secondary mt-2 mb-0">
      </div>
    </div>
  </div>
</template>
