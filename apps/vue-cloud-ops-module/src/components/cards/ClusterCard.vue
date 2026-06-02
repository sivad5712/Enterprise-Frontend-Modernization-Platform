<script setup lang="ts">
import { KubernetesCluster } from '../../types';

defineProps<{
  cluster: KubernetesCluster;
}>();

const getStatusClass = (status: string) => {
  if (status === 'ACTIVE') return 'success';
  if (status === 'SCALING') return 'warning';
  return 'danger';
};

const getProviderIcon = (provider: string) => {
  if (provider === 'GKE') return 'fa-brands fa-google text-info';
  if (provider === 'EKS') return 'fa-brands fa-aws text-warning';
  return 'fa-brands fa-microsoft text-primary';
};
</script>

<template>
  <div class="card bg-dark text-light border-secondary">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="d-flex align-items-center gap-2">
          <i :class="[getProviderIcon(cluster.provider), 'fa-lg']"></i>
          <strong class="text-white">{{ cluster.name }}</strong>
        </span>
        <span :class="['status-badge', getStatusClass(cluster.status)]">
          <span class="badge-dot"></span>
          {{ cluster.status }}
        </span>
      </div>

      <div class="row g-2 text-center text-secondary small pt-2 border-top border-secondary">
        <div class="col-4 border-end border-secondary">
          <div class="text-secondary small font-monospace">REGION</div>
          <div class="text-white font-monospace">{{ cluster.region }}</div>
        </div>
        <div class="col-4 border-end border-secondary">
          <div class="text-secondary small font-monospace">NODE COUNT</div>
          <div class="text-white font-monospace font-bold">{{ cluster.nodeCount }} Nodes</div>
        </div>
        <div class="col-4">
          <div class="text-secondary small font-monospace">CORES / GB</div>
          <div class="text-white font-monospace">{{ cluster.cpuCapacityCore }}c / {{ cluster.memoryCapacityGb }}G</div>
        </div>
      </div>
    </div>
  </div>
</template>
