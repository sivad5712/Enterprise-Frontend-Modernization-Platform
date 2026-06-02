<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sreApi } from '../services/api';
import { KubernetesCluster } from '../types';
import ClusterCard from '../components/cards/ClusterCard.vue';

const clusters = ref<KubernetesCluster[]>([]);
const loading = ref(true);

const loadClusters = async () => {
  try {
    loading.value = true;
    const res = await sreApi.getClusters();
    clusters.value = res;
  } catch (err) {
    console.error('Failed to load clusters list', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadClusters();
});
</script>

<template>
  <div v-if="loading" class="text-center py-5">
    <i class="fa-solid fa-spinner fa-spin fa-2x text-cyan"></i>
    <p class="text-secondary mt-2">Connecting to Kubernetes clusters gateway...</p>
  </div>

  <div v-else class="page-container p-0">
    <div class="page-header">
      <div class="breadcrumbs">INFRASTRUCTURE TELEMETRY / KUBERNETES</div>
      <div class="title-row">
        <div>
          <h1>Kubernetes Clusters</h1>
          <p>Verify active pods node counts, cloud provider types, regions, and resources capacity.</p>
        </div>
      </div>
    </div>

    <!-- Cluster Cards Grid -->
    <div class="row g-3">
      <div v-for="cls in clusters" :key="cls.id" class="col-md-4">
        <ClusterCard :cluster="cls"/>
      </div>
    </div>
  </div>
</template>
