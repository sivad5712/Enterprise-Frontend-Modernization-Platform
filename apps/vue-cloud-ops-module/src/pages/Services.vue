<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sreApi } from '../services/api';
import { Microservice } from '../types';
import ServiceHealthCard from '../components/cards/ServiceHealthCard.vue';
import FilterBar from '../components/filters/FilterBar.vue';

const services = ref<Microservice[]>([]);
const filteredServices = ref<Microservice[]>([]);
const loading = ref(true);

const loadServices = async () => {
  try {
    loading.value = true;
    const res = await sreApi.getServices();
    services.value = res;
    filteredServices.value = res;
  } catch (err) {
    console.error('Failed to load microservices', err);
  } finally {
    loading.value = false;
  }
};

const handleFilter = (filters: { environment: string; status: string }) => {
  let result = services.value;

  if (filters.environment !== 'ALL') {
    result = result.filter((s) => s.environment === filters.environment);
  }
  if (filters.status !== 'ALL') {
    result = result.filter((s) => s.status === filters.status);
  }

  filteredServices.value = result;
};

const handleRestart = (id: string) => {
  const service = filteredServices.value.find(s => s.id === id);
  if (service) {
    service.status = 'DEGRADED';
    setTimeout(() => {
      service.status = 'HEALTHY';
      service.cpuUsage = 18;
      service.memoryUsage = 24;
      service.latencyMs = 15;
      service.errorRate = 0.0;
    }, 2000);
  }
};

onMounted(() => {
  loadServices();
});
</script>

<template>
  <div v-if="loading" class="text-center py-5">
    <i class="fa-solid fa-spinner fa-spin fa-2x text-cyan"></i>
    <p class="text-secondary mt-2">Connecting to service mesh API...</p>
  </div>

  <div v-else class="page-container p-0">
    <div class="page-header">
      <div class="breadcrumbs">INFRASTRUCTURE TELEMETRY / MICROSERVICES</div>
      <div class="title-row">
        <div>
          <h1>Microservice Clusters</h1>
          <p>Verify live deployment health, error indicators, resource configurations, and graceful service cycles.</p>
        </div>
      </div>
    </div>

    <!-- Filter Control bar -->
    <FilterBar @filter="handleFilter"/>

    <!-- Services Grid -->
    <div class="row g-3">
      <div v-for="svc in filteredServices" :key="svc.id" class="col-md-4">
        <ServiceHealthCard 
          :service="svc"
          @restart="handleRestart"
        />
      </div>

      <div v-if="filteredServices.length === 0" class="col-12 text-center py-5 text-secondary">
        <i class="fa-solid fa-server fa-2x mb-2 text-danger"></i>
        <p>No active microservices match the selected operational filters.</p>
      </div>
    </div>
  </div>
</template>
