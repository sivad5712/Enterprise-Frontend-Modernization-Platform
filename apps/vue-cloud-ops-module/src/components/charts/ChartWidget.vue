<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  data: { label: string; value: number }[];
  yAxisLabel?: string;
  color?: string;
  gridCount?: number;
}>();

const maxVal = computed(() => {
  if (props.data.length === 0) return 100;
  return Math.max(...props.data.map(d => d.value)) * 1.15;
});

// SVG canvas dimensions
const width = 500;
const height = 200;
const paddingLeft = 40;
const paddingBottom = 25;
const paddingTop = 15;
const paddingRight = 15;

const chartWidth = width - paddingLeft - paddingRight;
const chartHeight = height - paddingTop - paddingBottom;

// Compute point positions
const points = computed(() => {
  if (props.data.length === 0) return [];
  const len = props.data.length;
  const max = maxVal.value;

  return props.data.map((d, i) => {
    const x = paddingLeft + (i / (len - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.value / max) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });
});

// Compute SVG path string for line
const linePath = computed(() => {
  const pts = points.value;
  if (pts.length === 0) return '';
  return pts.reduce((path, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${path} L ${pt.x} ${pt.y}`;
  }, '');
});

// Compute SVG path string for filled area under the line
const areaPath = computed(() => {
  const pts = points.value;
  if (pts.length === 0) return '';
  const firstPt = pts[0];
  const lastPt = pts[pts.length - 1];
  const baselineY = height - paddingBottom;
  
  return `M ${firstPt.x} ${baselineY} L ${firstPt.x} ${firstPt.y} ${linePath.value.substring(1)} L ${lastPt.x} ${baselineY} Z`;
});
</script>

<template>
  <div class="chart-card bg-dark text-light border border-secondary p-3 rounded-3" style="height: auto;">
    <div class="chart-header d-flex justify-content-between align-items-center mb-3">
      <h6 class="mb-0 text-white"><i class="fa-solid fa-chart-line me-2 text-cyan"></i>{{ title }}</h6>
      <span class="text-secondary small font-monospace" v-if="yAxisLabel">{{ yAxisLabel }}</span>
    </div>

    <div class="chart-container" style="position: relative; width: 100%;">
      <!-- SVG rendering container -->
      <svg 
        viewBox="0 0 500 200" 
        width="100%" 
        height="100%" 
        class="sre-svg-chart"
      >
        <defs>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Horizontal gridlines -->
        <g stroke="rgba(255, 255, 255, 0.05)" stroke-width="1">
          <line 
            v-for="i in (gridCount || 4)" 
            :key="i"
            :x1="paddingLeft" 
            :y1="paddingTop + ((i - 1) / ((gridCount || 4) - 1)) * chartHeight"
            :x2="width - paddingRight"
            :y2="paddingTop + ((i - 1) / ((gridCount || 4) - 1)) * chartHeight"
          />
        </g>

        <!-- Y Axis Labels -->
        <text 
          v-for="i in (gridCount || 4)" 
          :key="'lbl-' + i"
          class="small text-secondary font-monospace" 
          fill="#9ca3af"
          font-size="8"
          :x="paddingLeft - 8"
          :y="paddingTop + ((i - 1) / ((gridCount || 4) - 1)) * chartHeight + 3"
          text-anchor="end"
        >
          {{ Math.round(maxVal - ((i - 1) / ((gridCount || 4) - 1)) * maxVal) }}
        </text>

        <!-- Area fill under line -->
        <path :d="areaPath" fill="url(#area-grad)"/>

        <!-- Main plot line -->
        <path :d="linePath" fill="none" stroke="#06b6d4" stroke-width="2"/>

        <!-- Active telemetry dots -->
        <g>
          <circle 
            v-for="(pt, idx) in points" 
            :key="'dot-' + idx"
            :cx="pt.x" 
            :cy="pt.y" 
            r="4" 
            fill="#0b0f19" 
            stroke="#06b6d4" 
            stroke-width="2"
          />
        </g>

        <!-- X Axis Labels -->
        <g>
          <text 
            v-for="(pt, idx) in points" 
            :key="'xlbl-' + idx"
            class="small text-secondary font-monospace" 
            fill="#6b7280"
            font-size="8"
            :x="pt.x"
            :y="height - 5"
            text-anchor="middle"
          >
            {{ pt.label }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.sre-svg-chart {
  display: block;
}
</style>
