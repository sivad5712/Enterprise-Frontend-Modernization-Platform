<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  initialEnv?: string;
  initialStatus?: string;
}>();

const emit = defineEmits<{
  (e: 'filter', filters: { environment: string; status: string }): void;
}>();

const environment = ref(props.initialEnv || 'ALL');
const status = ref(props.initialStatus || 'ALL');

const handleFilterChange = () => {
  emit('filter', {
    environment: environment.value,
    status: status.value
  });
};
</script>

<template>
  <div class="filter-panel bg-secondary bg-opacity-25 border border-secondary p-3 rounded-3 mb-4">
    <div class="filter-controls w-100 d-flex flex-wrap gap-3 align-items-center justify-content-between">
      <div class="d-flex flex-wrap gap-2 align-items-center">
        <!-- Environment selector -->
        <div>
          <label class="small text-secondary me-2">ENV</label>
          <select 
            v-model="environment" 
            @change="handleFilterChange" 
            class="filter-select bg-dark text-white border-secondary p-1 rounded"
          >
            <option value="ALL">All Environments</option>
            <option value="PRODUCTION">Production</option>
            <option value="STAGING">Staging</option>
            <option value="DEVELOPMENT">Development</option>
          </select>
        </div>

        <!-- Status selector -->
        <div>
          <label class="small text-secondary me-2 ms-3">STATUS</label>
          <select 
            v-model="status" 
            @change="handleFilterChange" 
            class="filter-select bg-dark text-white border-secondary p-1 rounded"
          >
            <option value="ALL">All Statuses</option>
            <option value="HEALTHY">Healthy</option>
            <option value="DEGRADED">Degraded</option>
            <option value="DOWN">Down</option>
          </select>
        </div>
      </div>

      <button 
        class="btn btn-sm btn-secondary border-secondary text-white" 
        @click="environment = 'ALL'; status = 'ALL'; handleFilterChange()"
      >
        <i class="fa-solid fa-rotate-left"></i> Reset
      </button>
    </div>
  </div>
</template>
