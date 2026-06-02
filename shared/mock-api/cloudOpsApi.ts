import cloudOpsData from '../data/cloud-ops-data.json';
import { CloudMetric, Microservice, Deployment, Incident, KubernetesCluster, CloudCost } from '../types/cloudOps';

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const cloudOpsApi = {
  async getCloudMetrics(): Promise<CloudMetric> {
    await delay(200);
    return cloudOpsData.cloudMetrics as CloudMetric;
  },

  async getServices(filters?: { environment?: string; status?: string }): Promise<Microservice[]> {
    await delay(350);
    let svcs = cloudOpsData.services as Microservice[];
    if (filters) {
      if (filters.environment && filters.environment !== 'ALL') {
        svcs = svcs.filter((s) => s.environment === filters.environment);
      }
      if (filters.status && filters.status !== 'ALL') {
        svcs = svcs.filter((s) => s.status === filters.status);
      }
    }
    return svcs;
  },

  async getDeployments(): Promise<Deployment[]> {
    await delay(400);
    return cloudOpsData.deployments as Deployment[];
  },

  async getIncidents(): Promise<Incident[]> {
    await delay(300);
    return cloudOpsData.incidents as Incident[];
  },

  async getClusters(): Promise<KubernetesCluster[]> {
    await delay(300);
    return cloudOpsData.clusters as KubernetesCluster[];
  },

  async getCloudCosts(): Promise<CloudCost[]> {
    await delay(250);
    return cloudOpsData.cloudCosts as CloudCost[];
  }
};
