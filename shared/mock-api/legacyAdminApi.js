import usersData from '../data/users-data.json';
import auditLogsData from '../data/audit-logs.json';

// Simulated delay helper
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const legacyAdminApi = {
  async getUsers() {
    await delay(500);
    // Deep clone to prevent direct mutations of imported static JSON data
    return JSON.parse(JSON.stringify(usersData.users));
  },

  async searchUsers(query) {
    await delay(400);
    const users = JSON.parse(JSON.stringify(usersData.users));
    if (!query) return users;
    const term = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.username.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term)
    );
  },

  async getAuditLogs() {
    await delay(600);
    return JSON.parse(JSON.stringify(auditLogsData));
  },

  async getSupportTickets() {
    await delay(450);
    // Return a mocked set of traditional operations tickets
    return [
      {
        id: "tkt-101",
        title: "Database connection pools exhausted on legacy ledger server",
        reportedBy: "Diana Prince",
        assignedTo: "Reed Richards",
        status: "OPEN",
        priority: "HIGH",
        createdAt: "2026-06-02T10:12:00Z"
      },
      {
        id: "tkt-102",
        title: "Active Directory synchronizer timeout",
        reportedBy: "Stephen Strange",
        assignedTo: "Alex Mercer",
        status: "RESOLVED",
        priority: "MEDIUM",
        createdAt: "2026-06-01T15:30:00Z"
      },
      {
        id: "tkt-103",
        title: "Firewall rule request for staging HIPAA gateway",
        reportedBy: "Stephen Strange",
        assignedTo: "Reed Richards",
        status: "OPEN",
        priority: "LOW",
        createdAt: "2026-06-02T08:45:00Z"
      }
    ];
  },

  async updateUserStatus(userId, newStatus) {
    await delay(350);
    const users = usersData.users;
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].status = newStatus;
      return { success: true, user: users[userIndex] };
    }
    return { success: false, error: "User not found" };
  }
};
