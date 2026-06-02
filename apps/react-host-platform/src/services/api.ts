import { bankingApi } from '../../../../shared/mock-api/bankingApi';
import { healthcareApi } from '../../../../shared/mock-api/healthcareApi';
import { cloudOpsApi } from '../../../../shared/mock-api/cloudOpsApi';
import { modernizationApi } from '../../../../shared/mock-api/modernizationApi';
import { legacyAdminApi } from '../../../../shared/mock-api/legacyAdminApi';

export const platformApi = {
  banking: bankingApi,
  healthcare: healthcareApi,
  cloudOps: cloudOpsApi,
  modernization: modernizationApi,
  legacyAdmin: legacyAdminApi
};
