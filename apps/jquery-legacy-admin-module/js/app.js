/**
 * @file app.js
 * @description Main initializer file for the jQuery Legacy Admin Console.
 */

import { initUsersTab, handleUserAddition, showToast } from './users.js';
import { initAuditTab } from './auditLogs.js';
import { initTicketsTab } from './tickets.js';
import { validateAddUserForm } from './validation.js';

$(document).ready(function() {
  // 1. Tab Navigation Routing Setup
  $('.legacy-nav button').on('click', function(e) {
    e.preventDefault();
    
    // Toggle active state in navigation sidebar
    $('.legacy-nav button').removeClass('active');
    $(this).addClass('active');

    // Show/hide relevant tab content sections
    const targetTab = $(this).attr('data-tab');
    $('.tab-section').addClass('d-none');
    $(`#sec-${targetTab}`).removeClass('d-none');

    // Lazy load non-default tabs to optimize rendering performance
    if (targetTab === 'audit') {
      initAuditTab();
    } else if (targetTab === 'tickets') {
      initTicketsTab();
    }
  });

  // 2. Initialize default User Management Tab
  initUsersTab();

  // 3. User Register Trigger Modal
  $('#btn-add-user').on('click', function() {
    // Reset form states
    $('#frm-add-user')[0].reset();
    $('.form-control').removeClass('is-invalid');
    
    // Show modal using Bootstrap native javascript instance
    const myModal = new bootstrap.Modal(document.getElementById('addUserModal'));
    myModal.show();
  });

  // 4. Submit New User Form Handler
  $('#frm-add-user').on('submit', function(e) {
    e.preventDefault();

    if (validateAddUserForm()) {
      const newUser = {
        id: `usr-0${Math.floor(Math.random() * 900) + 100}`,
        name: $('#new-name').val(),
        username: $('#new-username').val(),
        email: $('#new-email').val(),
        role: $('#new-role').val(),
        status: 'ACTIVE',
        lastLogin: new Date().toISOString()
      };

      // Handle user addition locally and update table
      handleUserAddition(newUser);

      // Hide modal
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
      modalInstance.hide();
    }
  });

  // 5. Settings Save Configuration
  $('#frm-settings').on('submit', function(e) {
    e.preventDefault();
    
    const timeout = $('#db-timeout').val();
    const isWritesAllowed = $('#allow-legacy-writes').is(':checked');

    showToast(
      'Config Saved',
      `Legacy timeout updated to ${timeout}ms. Writes: ${isWritesAllowed ? 'ENABLED' : 'DISABLED'}`,
      'bg-success bg-opacity-25'
    );
  });
});
