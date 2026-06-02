/**
 * @file auditLogs.js
 * @description Manages rendering and paging of audit logs using jQuery DOM manipulation.
 * 
 * Modernization Notes:
 * 1. Paging via manual counters and DOM appending is error-prone compared to component-based pagination.
 * 2. Directly constructing dynamic HTML tables as strings leaves files susceptible to XSS if data is unsanitized.
 */

import { legacyApiBridge } from './api.js';

let auditLogs = [];
let currentPage = 1;
const logsPerPage = 3;

export async function initAuditTab() {
  await loadAuditLogs();

  // Load more logs click listener
  $('#btn-load-more-audit').on('click', function() {
    currentPage++;
    renderAuditLogs();
  });
}

async function loadAuditLogs() {
  $('#audit-tbody').html('<tr><td colspan="6" class="text-center loading-row"><i class="fa-solid fa-spinner fa-spin me-2"></i>Querying audit registers...</td></tr>');
  
  try {
    auditLogs = await legacyApiBridge.getAuditLogs();
    
    // Set critical log counter in widgets
    const criticalLogs = auditLogs.filter(log => log.severity === 'CRITICAL' || log.severity === 'HIGH').length;
    $('#critical-log-count').text(criticalLogs);
    
    renderAuditLogs(true);
  } catch (err) {
    $('#audit-tbody').html('<tr><td colspan="6" class="text-center text-danger"><i class="fa-solid fa-triangle-exclamation me-2"></i>Failed to fetch logs.</td></tr>');
  }
}

function renderAuditLogs(isFirstLoad = false) {
  if (isFirstLoad) {
    $('#audit-tbody').empty();
  }

  const start = (currentPage - 1) * logsPerPage;
  const end = start + logsPerPage;
  const slicedLogs = auditLogs.slice(start, end);

  let html = '';
  
  $.each(slicedLogs, function(i, log) {
    let severityClass = 'bg-secondary';
    if (log.severity === 'CRITICAL') severityClass = 'bg-danger';
    else if (log.severity === 'HIGH') severityClass = 'bg-warning text-dark';
    else if (log.severity === 'MEDIUM') severityClass = 'bg-info text-dark';

    html += `<tr class="border-secondary align-middle">
      <td class="small text-secondary">${new Date(log.timestamp).toLocaleString()}</td>
      <td><strong>${log.username}</strong> <br><small class="text-secondary">${log.role}</small></td>
      <td><span class="badge bg-secondary">${log.category}</span></td>
      <td><code>${log.action}</code><div class="small text-secondary text-wrap" style="max-width: 300px;">${log.details}</div></td>
      <td><code>${log.ipAddress}</code></td>
      <td><span class="badge ${severityClass}">${log.severity}</span></td>
    </tr>`;
  });

  $('#audit-tbody').append(html);

  // If we have rendered all logs, hide the Load More button
  if (end >= auditLogs.length) {
    $('#btn-load-more-audit').parent().addClass('d-none');
  } else {
    $('#btn-load-more-audit').parent().removeClass('d-none');
  }
}
