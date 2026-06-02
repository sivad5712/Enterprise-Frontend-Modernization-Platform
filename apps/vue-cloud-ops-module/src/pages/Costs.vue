<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sreApi } from '../services/api';
import { CloudCost } from '../types';
import CostWidget from '../components/cards/CostWidget.vue';

const costs = ref<CloudCost[]>([]);
const loading = ref(true);

const loadCosts = async () => {
  try {
    loading.value = true;
    const res = await sreApi.getCloudCosts();
    costs.value = res;
  } catch (err) {
    console.error('Failed to load costs details', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadCosts();
});
</script>

<template>
  <div v-if="loading" class="text-center py-5">
    <i class="fa-solid fa-spinner fa-spin fa-2x text-cyan"></i>
    <p class="text-secondary mt-2">Accessing cloud billing registry APIs...</p>
  </div>

  <div v-else class="page-container p-0">
    <div class="page-header">
      <div class="breadcrumbs">INFRASTRUCTURE TELEMETRY / COSTS</div>
      <div class="title-row">
        <div>
          <h1>Cloud Financial Telemetry</h1>
          <p>Examine multi-provider cloud expenditures, billing periods totals, and MoM spikes.</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 mx-auto">
        <CostWidget :costs="costs"/>
      </div>
    </div>
  </div>
</template>
