# API Contracts Specification

Verify mock operational schemas and contracts inside `shared/mock-api/`.

### 1. Core Banking API
`getTransactions(filters?: { type?: string; status?: string; search?: string }): Promise<Transaction[]>`

#### Request Parameters Example:
```json
{
  "type": "PAYMENT",
  "status": "COMPLETED",
  "search": "Cyberdyne"
}
```

#### Response Payload Schema:
```json
[
  {
    "id": "tx-201",
    "accountId": "acc-101",
    "customerName": "Sarah Connor",
    "amount": 2500.0,
    "type": "PAYMENT",
    "status": "COMPLETED",
    "timestamp": "2026-06-02T10:15:00Z",
    "merchant": "Cyberdyne Systems Corp",
    "category": "RETAIL",
    "isSuspicious": false
  }
]
```

### 2. Clinical Care API
`searchMembers(query: string): Promise<Member[]>`

#### Response Payload Schema:
```json
[
  {
    "id": "member-002",
    "mrn": "MRN-301982",
    "firstName": "Bruce",
    "lastName": "Banner",
    "dob": "1969-12-18",
    "riskScore": 9.15,
    "status": "ACTIVE"
  }
]
```

### 3. SRE Telemetry API
`getServices(filters?: { environment?: string }): Promise<Microservice[]>`

#### Response Payload Schema:
```json
[
  {
    "id": "svc-001",
    "name": "banking-ledger-api",
    "environment": "PRODUCTION",
    "status": "HEALTHY",
    "uptime": 99.99,
    "latencyMs": 42
  }
]
```
