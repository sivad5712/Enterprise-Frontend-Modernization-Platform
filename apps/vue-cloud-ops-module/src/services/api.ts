import { cloudOpsApi } from '../../../../shared/mock-api/cloudOpsApi';

export const sreApi = {
  getCloudMetrics: async () => await cloudOpsApi.getCloudMetrics(),
  getServices: async (filters?: { environment?: string; status?: string }) => await cloudOpsApi.getServices(filters),
  getDeployments: async () => await cloudOpsApi.getDeployments(),
  getIncidents: async () => await cloudOpsApi.getIncidents(),
  getClusters: async () => await cloudOpsApi.getClusters(),
  getCloudCosts: async () => await cloudOpsApi.getCloudCosts()
};
