<script setup lang="ts">
import { Incident } from '../../types';
import { formatTimeAgo } from '../../utils/formatters';

defineProps<{
  incidents: Incident[];
}>();

defineEmits<{
  (e: 'resolve', id: string): void;
}>();

const getSeverityClass = (sev: string) => {
  return sev.toLowerCase();
};
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <div 
      v-for="inc in incidents" 
      :key="inc.id"
      :class="['alert-panel-card', inc.severity === 'CRITICAL' ? 'danger' : 'warning']"
    >
      <div class="alert-header">
        <span class="text-white d-flex align-items-center gap-2">
          <span :class="['severity-indicator', getSeverityClass(inc.severity)]">{{ inc.severity }}</span>
          <strong>{{ inc.serviceName }}</strong>
        </span>
        <span class="text-secondary small font-monospace">{{ formatTimeAgo(inc.createdAt) }}</span>
      </div>

      <div class="alert-body my-2">
        <h6 class="text-white mb-1">{{ inc.title }}</h6>
        <p class="mb-2">{{ inc.summary }}</p>
        <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary border-opacity-50">
          <span class="small text-secondary">
            <i class="fa-solid fa-user-circle me-1"></i> Assignee: <strong>{{ inc.assignedTo }}</strong>
          </span>
          <button 
            v-if="inc.status !== 'RESOLVED'" 
            class="btn btn-sm btn-outline-success py-1 px-3"
            @click="$emit('resolve', inc.id)"
          >
            <i class="fa-solid fa-circle-check me-1"></i> Acknowledge & Resolve
          </button>
          <span v-else class="text-success small"><i class="fa-solid fa-check-double me-1"></i> Resolved</span>
        </div>
      </div>
    </div>

    <div v-if="incidents.length === 0" class="text-center py-4 text-secondary">
      <i class="fa-solid fa-shield-halved fa-2x mb-2 text-success"></i>
      <p class="mb-0">No active operational incident registers reported.</p>
    </div>
  </div>
</template>
