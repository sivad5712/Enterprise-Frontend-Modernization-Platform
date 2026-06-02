<script setup lang="ts">
import { Microservice } from '../../types';
import { formatPercent } from '../../utils/formatters';

defineProps<{
  service: Microservice;
}>();

defineEmits<{
  (e: 'restart', id: string): void;
}>();

const getStatusClass = (status: string) => {
  if (status === 'HEALTHY') return 'success';
  if (status === 'DEGRADED') return 'warning';
  return 'danger';
};
</script>

<template>
  <div class="card bg-dark text-light border-secondary h-100 position-relative">
    <div class="card-body d-flex flex-column justify-content-between p-3">
      <!-- Title & Status Badge -->
      <div class="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h6 class="mb-1 text-white font-monospace">{{ service.name }}</h6>
          <span class="text-secondary small">{{ service.version }}</span>
        </div>
        <span :class="['status-badge', getStatusClass(service.status)]">
          <span class="badge-dot"></span>
          {{ service.status }}
        </span>
      </div>

      <!-- Telemetry Progress bars -->
      <div class="mb-3">
        <div class="mb-2">
          <div class="d-flex justify-content-between small text-secondary mb-1">
            <span>CPU UTILIZATION</span>
            <span class="font-monospace text-white">{{ service.cpuUsage }}%</span>
          </div>
          <div class="progress bg-secondary bg-opacity-25" style="height: 4px;">
            <div 
              :class="['progress-bar', service.cpuUsage > 80 ? 'bg-danger' : 'bg-cyan']"
              :style="{ width: service.cpuUsage + '%' }"
            ></div>
          </div>
        </div>

        <div>
          <div class="d-flex justify-content-between small text-secondary mb-1">
            <span>MEMORY CONSUMPTION</span>
            <span class="font-monospace text-white">{{ service.memoryUsage }}%</span>
          </div>
          <div class="progress bg-secondary bg-opacity-25" style="height: 4px;">
            <div 
              :class="['progress-bar', service.memoryUsage > 85 ? 'bg-danger' : 'bg-indigo']"
              :style="{ width: service.memoryUsage + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Health Telemetry Grid -->
      <div class="row g-2 text-center text-secondary small mb-3 border-top border-secondary pt-2">
        <div class="col-4 border-end border-secondary">
          <div class="text-secondary font-monospace" style="font-size: 0.7rem;">LATENCY</div>
          <div class="text-white font-monospace">{{ service.latencyMs }}ms</div>
        </div>
        <div class="col-4 border-end border-secondary">
          <div class="text-secondary font-monospace" style="font-size: 0.7rem;">ERROR RATE</div>
          <div class="text-white font-monospace">{{ service.errorRate }}%</div>
        </div>
        <div class="col-4">
          <div class="text-secondary font-monospace" style="font-size: 0.7rem;">UPTIME</div>
          <div class="text-white font-monospace">{{ formatPercent(service.uptime) }}</div>
        </div>
      </div>

      <!-- Action Button -->
      <button 
        class="btn btn-sm btn-outline-cyan w-100"
        @click="$emit('restart', service.id)"
        :disabled="service.status === 'DOWN'"
      >
        <i class="fa-solid fa-arrows-rotate me-1"></i> Graceful Restart
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn-outline-cyan {
  color: #06b6d4;
  border-color: rgba(6, 182, 212, 0.3);
}
.btn-outline-cyan:hover:not(:disabled) {
  background-color: #06b6d4;
  color: white;
}
.progress-bar.bg-cyan {
  background-color: #06b6d4;
}
.progress-bar.bg-indigo {
  background-color: #6366f1;
}
</style>
