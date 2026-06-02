<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sreApi } from '../services/api';
import { Deployment } from '../types';
import DeploymentTable from '../components/tables/DeploymentTable.vue';

const deployments = ref<Deployment[]>([]);
const loading = ref(true);

const loadDeployments = async () => {
  try {
    loading.value = true;
    const res = await sreApi.getDeployments();
    deployments.value = res;
  } catch (err) {
    console.error('Failed to load deployment ledger', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadDeployments();
});
</script>

<template>
  <div v-if="loading" class="text-center py-5">
    <i class="fa-solid fa-spinner fa-spin fa-2x text-cyan"></i>
    <p class="text-secondary mt-2">Accessing git pipeline registries...</p>
  </div>

  <div v-else class="page-container p-0">
    <div class="page-header">
      <div class="breadcrumbs">INFRASTRUCTURE TELEMETRY / DEPLOYMENTS</div>
      <div class="title-row">
        <div>
          <h1>CI/CD Delivery Pipelines</h1>
          <p>Inspect production, staging, and development build states, git hashes, and pipeline performance logs.</p>
        </div>
      </div>
    </div>

    <div class="card bg-dark text-light border-secondary">
      <div class="card-header border-secondary bg-secondary bg-opacity-25">
        <h6 class="mb-0"><i class="fa-solid fa-code-merge me-2 text-cyan"></i>Build Pipeline Audit Ledger</h6>
      </div>
      <div class="card-body p-0">
        <DeploymentTable :deployments="deployments"/>
      </div>
    </div>
  </div>
</template>
