/**
 * @file users.js
 * @description Manages users tab using traditional jQuery DOM mutations.
 * 
 * Modernization Notes:
 * 1. Direct DOM manipulation is hard to scale and debug. React or Vue can replace this with state-driven components.
 * 2. Manual search filtering triggers complete table rewrites, which can cause frame stuttering for large datasets.
 */

import { legacyApiBridge } from './api.js';

let usersList = [];

export function initUsersTab() {
  loadUsersTable();

  // Search filter keyup listener (jQuery debounced or direct event listener)
  $('#usr-search').on('keyup', function() {
    applyFilters();
  });

  // Status select change listener
  $('#filter-status').on('change', function() {
    applyFilters();
  });

  // Reset button click
  $('#btn-reset-users').on('click', function() {
    $('#usr-search').val('');
    $('#filter-status').val('ALL');
    renderUsersTable(usersList);
  });

  // Status Change Event Delegation (Legacy jQuery pattern: delegating to table body)
  $('#users-tbody').on('click', '.btn-toggle-status', async function(e) {
    e.preventDefault();
    const userId = $(this).attr('data-id');
    const currentStatus = $(this).attr('data-status');
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

    $(this).html('<i class="fa-solid fa-spinner fa-spin"></i>').prop('disabled', true);

    const result = await legacyApiBridge.updateUserStatus(userId, newStatus);
    if (result.success) {
      // Find user in local array and update status
      const u = usersList.find((usr) => usr.id === userId);
      if (u) u.status = newStatus;
      
      showToast('Status Updated', `User ${result.user.name} status updated to ${newStatus}.`);
      applyFilters();
    } else {
      showToast('Error', 'Failed to update user status.', 'bg-danger');
      $(this).html('<i class="fa-solid fa-ban"></i>').prop('disabled', false);
    }
  });
}

async function loadUsersTable() {
  $('#users-tbody').html('<tr><td colspan="7" class="text-center loading-row"><i class="fa-solid fa-spinner fa-spin me-2"></i>Loading identities from DB...</td></tr>');
  
  try {
    usersList = await legacyApiBridge.getUsers();
    renderUsersTable(usersList);
    // Update local counter widget
    $('#legacy-user-count').text(usersList.length);
  } catch (err) {
    $('#users-tbody').html('<tr><td colspan="7" class="text-center text-danger"><i class="fa-solid fa-exclamation-triangle me-2"></i>Failed to load database.</td></tr>');
  }
}

function applyFilters() {
  const searchQuery = $('#usr-search').val().toLowerCase();
  const statusFilter = $('#filter-status').val();

  let filtered = usersList;

  if (statusFilter !== 'ALL') {
    filtered = filtered.filter((u) => u.status === statusFilter);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery) ||
        u.username.toLowerCase().includes(searchQuery) ||
        u.email.toLowerCase().includes(searchQuery) ||
        u.role.toLowerCase().includes(searchQuery)
    );
  }

  renderUsersTable(filtered);
}

function renderUsersTable(users) {
  let html = '';
  
  if (users.length === 0) {
    html = '<tr><td colspan="7" class="text-center text-secondary">No records found.</td></tr>';
  } else {
    $.each(users, function(i, u) {
      const statusClass = u.status === 'ACTIVE' ? 'bg-success' : 'bg-danger';
      const actionIcon = u.status === 'ACTIVE' ? 'fa-user-slash text-danger' : 'fa-user-check text-success';
      const actionTitle = u.status === 'ACTIVE' ? 'Suspend User' : 'Activate User';

      html += `<tr class="border-secondary align-middle">
        <td><code>${u.id}</code></td>
        <td><strong>${u.name}</strong></td>
        <td>@${u.username}</td>
        <td>${u.email}</td>
        <td><span class="badge bg-secondary">${u.role}</span></td>
        <td><span class="badge ${statusClass}">${u.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline-secondary btn-toggle-status me-1" data-id="${u.id}" data-status="${u.status}" title="${actionTitle}">
            <i class="fa-solid ${actionIcon}"></i>
          </button>
          <button class="btn btn-sm btn-outline-info btn-details" data-id="${u.id}" title="View Details">
            <i class="fa-solid fa-circle-info"></i>
          </button>
        </td>
      </tr>`;
    });
  }

  $('#users-tbody').html(html);
}

export function handleUserAddition(newUser) {
  usersList.push(newUser);
  renderUsersTable(usersList);
  $('#legacy-user-count').text(usersList.length);
  showToast('Registration Successful', `Successfully created user: ${newUser.name}`);
}

export function showToast(title, body, headerClass = 'bg-secondary bg-opacity-25') {
  $('#toast-title').text(title);
  $('#toast-body').text(body);
  
  const toastEl = $('#toast-notify');
  toastEl.find('.toast-header').removeClass('bg-danger').addClass(headerClass);
  
  const toast = new bootstrap.Toast(toastEl[0]);
  toast.show();
}
