<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sreApi } from '../services/api';
import { Incident } from '../types';
import IncidentList from '../components/cards/IncidentList.vue';

const incidents = ref<Incident[]>([]);
const filteredIncidents = ref<Incident[]>([]);
const filterStatus = ref('ACTIVE');
const loading = ref(true);

const loadIncidents = async () => {
  try {
    loading.value = true;
    const res = await sreApi.getIncidents();
    incidents.value = res;
    applyFilter();
  } catch (err) {
    console.error('Failed to load incident history', err);
  } finally {
    loading.value = false;
  }
};

const applyFilter = () => {
  if (filterStatus.value === 'ACTIVE') {
    filteredIncidents.value = incidents.value.filter(i => i.status !== 'RESOLVED');
  } else if (filterStatus.value === 'RESOLVED') {
    filteredIncidents.value = incidents.value.filter(i => i.status === 'RESOLVED');
  } else {
    filteredIncidents.value = incidents.value;
  }
};

const handleResolve = (id: string) => {
  const incident = incidents.value.find(i => i.id === id);
  if (incident) {
    incident.status = 'RESOLVED';
    incident.resolvedAt = new Date().toISOString();
    applyFilter();
  }
};

onMounted(() => {
  loadIncidents();
});
</script>

<template>
  <div v-if="loading" class="text-center py-5">
    <i class="fa-solid fa-spinner fa-spin fa-2x text-cyan"></i>
    <p class="text-secondary mt-2">Loading historical incidents register...</p>
  </div>

  <div v-else class="page-container p-0">
    <div class="page-header">
      <div class="breadcrumbs">INFRASTRUCTURE TELEMETRY / INCIDENTS</div>
      <div class="title-row">
        <div>
          <h1>SRE Incident Board</h1>
          <p>Monitor critical outages, assign engineers, inspect system issues, and trigger mitigations.</p>
        </div>
      </div>
    </div>

    <!-- Filter selectors -->
    <div class="filter-panel bg-secondary bg-opacity-25 border border-secondary p-3 rounded-3 mb-4">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <label class="small text-secondary me-2">TICKET STATE</label>
          <select 
            v-model="filterStatus" 
            @change="applyFilter" 
            class="filter-select bg-dark text-white border-secondary p-1 rounded"
          >
            <option value="ALL">All Incidents</option>
            <option value="ACTIVE">Active Incidents</option>
            <option value="RESOLVED">Resolved Incidents</option>
          </select>
        </div>
        <span class="text-secondary small font-monospace">TOTAL TICKETS: {{ filteredIncidents.length }}</span>
      </div>
    </div>

    <!-- Active List -->
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <IncidentList 
          :incidents="filteredIncidents"
          @resolve="handleResolve"
        />
      </div>
    </div>
  </div>
</template>
