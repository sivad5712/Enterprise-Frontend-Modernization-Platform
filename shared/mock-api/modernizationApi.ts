import modernizationData from '../data/modernization-data.json';
import { LegacyApplication, ModernizationStage, MigrationRisk, SuccessMetric, RoadmapItem } from '../types/modernization';

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const modernizationApi = {
  async getLegacyApplications(): Promise<LegacyApplication[]> {
    await delay(300);
    return modernizationData.legacyApplications as LegacyApplication[];
  },

  async getModernizationStages(): Promise<ModernizationStage[]> {
    await delay(400);
    return modernizationData.modernizationStages as ModernizationStage[];
  },

  async getMigrationRisks(): Promise<MigrationRisk[]> {
    await delay(350);
    return modernizationData.migrationRisks as MigrationRisk[];
  },

  async getSuccessMetrics(): Promise<SuccessMetric[]> {
    await delay(300);
    return modernizationData.successMetrics as SuccessMetric[];
  },

  async getRoadmapTimeline(): Promise<RoadmapItem[]> {
    await delay(350);
    return modernizationData.roadmapTimeline as RoadmapItem[];
  }
};
