/**
 * @file tickets.js
 * @description Renders legacy support tickets database and manages status switches.
 */

import { legacyApiBridge } from './api.js';
import { showToast } from './users.js';

let ticketsList = [];

export async function initTicketsTab() {
  await loadTicketsTable();

  // Action event delegate to resolve support ticket
  $('#tickets-tbody').on('click', '.btn-resolve-ticket', function(e) {
    e.preventDefault();
    const tktId = $(this).attr('data-id');
    
    // Simulating updates on legacy DOM
    $(this).html('<i class="fa-solid fa-spinner fa-spin"></i>').prop('disabled', true);
    
    setTimeout(() => {
      const ticket = ticketsList.find(t => t.id === tktId);
      if (ticket) {
        ticket.status = 'RESOLVED';
        showToast('Ticket Resolved', `Ticket ${tktId} has been successfully closed.`, 'bg-success bg-opacity-25');
        renderTicketsTable(ticketsList);
      }
    }, 400);
  });
}

async function loadTicketsTable() {
  $('#tickets-tbody').html('<tr><td colspan="6" class="text-center loading-row"><i class="fa-solid fa-spinner fa-spin me-2"></i>Accessing support ledger...</td></tr>');
  
  try {
    ticketsList = await legacyApiBridge.getSupportTickets();
    renderTicketsTable(ticketsList);
  } catch (err) {
    $('#tickets-tbody').html('<tr><td colspan="6" class="text-center text-danger"><i class="fa-solid fa-exclamation-triangle me-2"></i>Failed to fetch support records.</td></tr>');
  }
}

function renderTicketsTable(tickets) {
  let html = '';
  let openTicketsCount = 0;

  $.each(tickets, function(i, t) {
    const isResolved = t.status === 'RESOLVED';
    const statusBadge = isResolved ? 'bg-success' : 'bg-warning text-dark';
    const actionBtn = isResolved 
      ? `<button class="btn btn-sm btn-outline-secondary" disabled><i class="fa-solid fa-check"></i> Closed</button>`
      : `<button class="btn btn-sm btn-outline-warning btn-resolve-ticket" data-id="${t.id}"><i class="fa-solid fa-circle-check"></i> Resolve</button>`;

    if (!isResolved) openTicketsCount++;

    html += `<tr class="border-secondary align-middle">
      <td><code>${t.id}</code></td>
      <td><strong>${t.title}</strong><br><small class="text-secondary">Opened: ${new Date(t.createdAt).toLocaleString()}</small></td>
      <td><span class="badge ${t.priority === 'HIGH' ? 'bg-danger' : t.priority === 'MEDIUM' ? 'bg-info' : 'bg-secondary'}">${t.priority}</span></td>
      <td><span class="badge ${statusBadge}">${t.status}</span></td>
      <td>${t.reportedBy} <br><small class="text-secondary">Assignee: ${t.assignedTo}</small></td>
      <td>${actionBtn}</td>
    </tr>`;
  });

  $('#tickets-tbody').html(html);
  
  // Set count in analytics widget
  $('#open-ticket-count').text(openTicketsCount);
}
