import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Services from '../pages/Services.vue';
import Deployments from '../pages/Deployments.vue';
import Incidents from '../pages/Incidents.vue';
import Clusters from '../pages/Clusters.vue';
import Costs from '../pages/Costs.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/services', component: Services },
  { path: '/deployments', component: Deployments },
  { path: '/incidents', component: Incidents },
  { path: '/clusters', component: Clusters },
  { path: '/costs', component: Costs }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
