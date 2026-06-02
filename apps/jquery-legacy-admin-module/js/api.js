/**
 * @file api.js
 * @description Bridges the jQuery legacy UI module and the shared mock API layer.
 * Demonstrates how legacy systems call central APIs.
 */

import { legacyAdminApi } from '../../../shared/mock-api/legacyAdminApi.js';

export const legacyApiBridge = {
  getUsers: async function() {
    return await legacyAdminApi.getUsers();
  },
  searchUsers: async function(query) {
    return await legacyAdminApi.searchUsers(query);
  },
  getAuditLogs: async function() {
    return await legacyAdminApi.getAuditLogs();
  },
  getSupportTickets: async function() {
    return await legacyAdminApi.getSupportTickets();
  },
  updateUserStatus: async function(userId, status) {
    return await legacyAdminApi.updateUserStatus(userId, status);
  }
};
