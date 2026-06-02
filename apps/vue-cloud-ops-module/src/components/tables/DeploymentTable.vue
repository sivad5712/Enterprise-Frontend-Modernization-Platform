<script setup lang="ts">
import { Deployment } from '../../types';
import { formatDateTime } from '../../utils/formatters';

defineProps<{
  deployments: Deployment[];
}>();

const getStatusClass = (status: string) => {
  if (status === 'SUCCESS') return 'success';
  if (status === 'IN_PROGRESS') return 'warning';
  if (status === 'FAILED') return 'danger';
  return 'neutral';
};
</script>

<template>
  <div class="table-responsive-wrapper">
    <table class="enterprise-table">
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Version / Commit</th>
          <th>Environment</th>
          <th>Timestamp</th>
          <th>Triggered By</th>
          <th>Duration</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dep in deployments" :key="dep.id">
          <td>
            <div class="primary-text font-monospace">{{ dep.serviceName }}</div>
            <div class="secondary-text small">ID: {{ dep.id }}</div>
          </td>
          <td>
            <span class="text-white">{{ dep.version }}</span>
            <div class="secondary-text"><i class="fa-solid fa-code-commit me-1"></i><code>{{ dep.commitHash }}</code></div>
          </td>
          <td>
            <span class="badge bg-secondary">{{ dep.environment }}</span>
          </td>
          <td class="small text-secondary">
            {{ formatDateTime(dep.deployedAt) }}
          </td>
          <td class="small">
            <i class="fa-solid fa-user-gear text-secondary me-1"></i> {{ dep.deployedBy }}
          </td>
          <td class="font-monospace text-secondary small">
            {{ dep.durationSeconds }}s
          </td>
          <td>
            <span :class="['status-badge', getStatusClass(dep.status)]">
              <span class="badge-dot"></span>
              {{ dep.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
