<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sreApi } from '../services/api';
import { CloudMetric, Microservice, Incident, CloudCost } from '../types';
import MetricCard from '../components/common/MetricCard.vue';
import ServiceHealthCard from '../components/cards/ServiceHealthCard.vue';
import IncidentList from '../components/cards/IncidentList.vue';
import CostWidget from '../components/cards/CostWidget.vue';
import ChartWidget from '../components/charts/ChartWidget.vue';
import { formatCurrency } from '../utils/formatters';

const metrics = ref<CloudMetric | null>(null);
const services = ref<Microservice[]>([]);
const activeIncidents = ref<Incident[]>([]);
const costs = ref<CloudCost[]>([]);
const loading = ref(true);

// Hardcoded data for SVG chart representation
const chartData = [
  { label: '08:00', value: 38 },
  { label: '09:00', value: 45 },
  { label: '10:00', value: 92 },
  { label: '11:00', value: 54 },
  { label: '12:00', value: 41 }
];

const loadDashboardData = async () => {
  try {
    loading.value = true;
    const [mRes, sRes, iRes, cRes] = await Promise.all([
      sreApi.getCloudMetrics(),
      sreApi.getServices(),
      sreApi.getIncidents(),
      sreApi.getCloudCosts()
    ]);
    
    metrics.value = mRes;
    services.value = sRes.slice(0, 3); // Display top 3
    activeIncidents.value = iRes.filter(i => i.status !== 'RESOLVED');
    costs.value = cRes;
  } catch (err) {
    console.error('Failed to load dashboard metrics', err);
  } finally {
    loading.value = false;
  }
};

const handleServiceRestart = (id: string) => {
  const service = services.value.find(s => s.id === id);
  if (service) {
    const originalStatus = service.status;
    service.status = 'DEGRADED';
    setTimeout(() => {
      service.status = 'HEALTHY';
      service.cpuUsage = 22;
      service.memoryUsage = 35;
      service.latencyMs = 20;
      service.errorRate = 0.0;
    }, 2000);
  }
};

const handleIncidentResolution = (id: string) => {
  activeIncidents.value = activeIncidents.value.filter(i => i.id !== id);
  if (metrics.value) {
    metrics.value.openIncidentsCount = Math.max(0, metrics.value.openIncidentsCount - 1);
  }
};

onMounted(() => {
  loadDashboardData();
});
</script>

<template>
  <div v-if="loading" class="text-center py-5">
    <i class="fa-solid fa-spinner fa-spin fa-2x text-cyan"></i>
    <p class="text-secondary mt-2">Querying cloud control registries...</p>
  </div>

  <div v-else class="page-container p-0">
    <div class="page-header">
      <div class="breadcrumbs">INFRASTRUCTURE TELEMETRY / VUE.JS COMMANDS</div>
      <div class="title-row">
        <div>
          <h1>DevOps Telemetry Control</h1>
          <p>Real-time microservice status, active SRE operations, billing changes, and K8s clusters.</p>
        </div>
      </div>
    </div>

    <!-- Metrics Row -->
    <div class="dashboard-kpi-row" v-if="metrics">
      <MetricCard 
        title="Infrastructure Uptime"
        :value="metrics.overallUptime + '%'"
        icon="fa-solid fa-circle-check"
        trend="0.02%"
        :trendUp="true"
        theme="emerald"
      />
      <MetricCard 
        title="Active Deployments"
        :value="metrics.activeDeployments"
        icon="fa-solid fa-code-compare"
        theme="indigo"
      />
      <MetricCard 
        title="Open SRE Incidents"
        :value="metrics.openIncidentsCount"
        icon="fa-solid fa-triangle-exclamation"
        theme="rose"
      />
      <MetricCard 
        title="Monthly Telemetry Spend"
        :value="formatCurrency(metrics.totalMonthlySpend)"
        icon="fa-solid fa-credit-card"
        trend="4.2%"
        :trendUp="false"
        theme="cyan"
      />
    </div>

    <!-- Middle Split Content -->
    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <div class="card bg-dark text-light border-secondary mb-4">
          <div class="card-header border-secondary bg-secondary bg-opacity-25 d-flex justify-content-between align-items-center">
            <h6 class="mb-0"><i class="fa-solid fa-server me-2 text-cyan"></i>Active Microservices Health Grid</h6>
            <router-link to="/services" class="btn btn-sm btn-outline-cyan font-monospace">View All Services</router-link>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div v-for="svc in services" :key="svc.id" class="col-md-4">
                <ServiceHealthCard 
                  :service="svc"
                  @restart="handleServiceRestart"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- SVG latency chart -->
        <ChartWidget 
          title="Overall Platform Traffic Latency (Last 5h)"
          :data="chartData"
          yAxisLabel="Milliseconds (ms)"
          color="#06b6d4"
        />
      </div>

      <div class="col-lg-4">
        <!-- Incidents List -->
        <div class="card bg-dark text-light border-secondary mb-4">
          <div class="card-header border-secondary bg-secondary bg-opacity-25">
            <h6 class="mb-0"><i class="fa-solid fa-triangle-exclamation me-2 text-danger"></i>Active Operational Incidents</h6>
          </div>
          <div class="card-body">
            <IncidentList 
              :incidents="activeIncidents"
              @resolve="handleIncidentResolution"
            />
          </div>
        </div>

        <!-- Cost Widget -->
        <CostWidget :costs="costs"/>
      </div>
    </div>
  </div>
</template>
