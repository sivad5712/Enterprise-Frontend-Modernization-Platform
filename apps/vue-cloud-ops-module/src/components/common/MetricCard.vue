<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  theme?: string;
}>();
</script>

<template>
  <div :class="['kpi-card', theme || 'cyan']">
    <div class="kpi-header">
      <span>{{ title }}</span>
      <i :class="[icon, 'kpi-icon', theme || 'cyan']"></i>
    </div>
    <div class="kpi-value">{{ value }}</div>
    <div v-if="trend" class="kpi-footer">
      <span :class="['trend-indicator', trendUp ? 'up' : 'down']">
        <i :class="trendUp ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down'"></i>
        {{ trend }}
      </span>
      <span>vs last month</span>
    </div>
  </div>
</template>
