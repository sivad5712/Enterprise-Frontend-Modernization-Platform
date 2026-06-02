<script setup lang="ts">
// Vue main application root component
</script>

<template>
  <div class="vue-container bg-primary min-vh-100 flex-column">
    <!-- Inline Sub-Header Navigation for Cloud MFE module -->
    <header class="bg-secondary bg-opacity-75 border-bottom border-secondary py-2 px-4 d-flex justify-content-between align-items-center">
      <span class="d-flex align-items-center gap-2">
        <i class="fa-solid fa-cloud text-cyan"></i>
        <strong class="text-white small font-monospace">MFE: Cloud Operations (Vue 3)</strong>
      </span>
      <nav class="d-flex gap-2">
        <router-link to="/" class="vue-nav-link small"><i class="fa-solid fa-gauge me-1"></i> Dashboard</router-link>
        <router-link to="/services" class="vue-nav-link small"><i class="fa-solid fa-server me-1"></i> Services</router-link>
        <router-link to="/deployments" class="vue-nav-link small"><i class="fa-solid fa-code-compare me-1"></i> Deployments</router-link>
        <router-link to="/incidents" class="vue-nav-link small"><i class="fa-solid fa-triangle-exclamation me-1"></i> Incidents</router-link>
        <router-link to="/clusters" class="vue-nav-link small"><i class="fa-solid fa-circle-nodes me-1"></i> Clusters</router-link>
        <router-link to="/costs" class="vue-nav-link small"><i class="fa-solid fa-wallet me-1"></i> Costs</router-link>
      </nav>
    </header>

    <main class="vue-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
@import './styles/styles.scss';
</style>
