import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemberService } from '../../core/services/member.service';
import { CareGapService } from '../../core/services/care-gap.service';
import { Member, CareGap } from '../../models/healthcare.models';

@Component({
  selector: 'app-healthcare-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container p-0">
      <div class="page-header">
        <div class="breadcrumbs">CLINICAL REGISTRIES / ANGULAR DEPLOYMENT</div>
        <div class="title-row">
          <div>
            <h1>Clinical Command Center</h1>
            <p>Monitor patient cohorts risk trends, closed care gaps HEDIS scores, and pending eligibility claims.</p>
          </div>
        </div>
      </div>

      <!-- KPI Indicators Row -->
      <div class="dashboard-kpi-row" *ngIf="metrics">
        <div class="kpi-card rose">
          <div class="kpi-header">
            <span>MEMBERS MONITORED</span>
            <i class="fa-solid fa-users kpi-icon text-danger"></i>
          </div>
          <div class="kpi-value">{{ metrics.totalMembersTracked | number }}</div>
          <div class="kpi-footer">
            <span class="trend-indicator up text-success">
              <i class="fa-solid fa-arrow-trend-up"></i> +1.2%
            </span>
            <span>vs last month</span>
          </div>
        </div>

        <div class="kpi-card amber">
          <div class="kpi-header">
            <span>OPEN CARE GAPS</span>
            <i class="fa-solid fa-circle-question kpi-icon text-warning"></i>
          </div>
          <div class="kpi-value text-warning">{{ metrics.openCareGaps }}</div>
          <div class="kpi-footer">
            <span class="trend-indicator down text-danger">
              <i class="fa-solid fa-arrow-trend-up"></i> +8 new
            </span>
            <span>unresolved gaps</span>
          </div>
        </div>

        <div class="kpi-card indigo">
          <div class="kpi-header">
            <span>ACTIVE ELIGIBILITY CLAIMS</span>
            <i class="fa-solid fa-file-invoice-dollar kpi-icon text-danger"></i>
          </div>
          <div class="kpi-value">{{ metrics.pendingClaims }}</div>
          <div class="kpi-footer">
            <span>42 in adjudication queue</span>
          </div>
        </div>

        <div class="kpi-card emerald">
          <div class="kpi-header">
            <span>AVERAGE HCC RISK SCORE</span>
            <i class="fa-solid fa-heart-pulse kpi-icon text-success"></i>
          </div>
          <div class="kpi-value text-success">{{ metrics.averageHccRiskScore }}</div>
          <div class="kpi-footer">
            <span class="trend-indicator down text-success">
              <i class="fa-solid fa-arrow-trend-down"></i> -0.05
            </span>
            <span>overall improvements</span>
          </div>
        </div>
      </div>

      <!-- Middle sections split -->
      <div class="row g-4 mb-4">
        <!-- Monitored High Risk Patients list -->
        <div class="col-lg-8">
          <div class="card bg-dark text-light border-secondary">
            <div class="card-header border-secondary bg-secondary bg-opacity-25 d-flex justify-content-between align-items-center">
              <h6 class="mb-0 text-white"><i class="fa-solid fa-hospital-user me-2 text-danger"></i>High-Risk Patient Registry</h6>
              <a router-link="/members" class="btn btn-sm btn-outline-danger font-monospace">View Member Search</a>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="enterprise-table">
                  <thead>
                    <tr>
                      <th>Patient MRN</th>
                      <th>Name / DOB</th>
                      <th>Primary Payer</th>
                      <th>HCC Risk</th>
                      <th>Cohort Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let m of highRiskMembers">
                      <td><code class="text-danger">{{ m.mrn }}</code></td>
                      <td>
                        <strong>{{ m.lastName }}, {{ m.firstName }}</strong>
                        <div class="secondary-text">DOB: {{ m.dob }} ({{ m.gender }})</div>
                      </td>
                      <td>{{ m.primaryPayer }}</td>
                      <td>
                        <span class="severity-indicator critical" *ngIf="m.riskScore >= 7">COMPLEX ({{ m.riskScore }})</span>
                        <span class="severity-indicator high" *ngIf="m.riskScore >= 4 && m.riskScore < 7">HIGH ({{ m.riskScore }})</span>
                        <span class="severity-indicator medium" *ngIf="m.riskScore < 4">MEDIUM ({{ m.riskScore }})</span>
                      </td>
                      <td>
                        <span class="status-badge success">
                          <span class="badge-dot"></span> {{ m.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Care Gaps list -->
        <div class="col-lg-4">
          <div class="card bg-dark text-light border-secondary mb-4">
            <div class="card-header border-secondary bg-secondary bg-opacity-25">
              <h6 class="mb-0 text-white"><i class="fa-solid fa-clipboard-list-check me-2 text-warning"></i>Urgent Quality Gaps</h6>
            </div>
            <div class="card-body">
              <div class="d-flex flex-column gap-3">
                <div class="alert-panel-card" [class.danger]="g.severity === 'CRITICAL'" [class.warning]="g.severity === 'HIGH'" *ngFor="let g of urgentGaps">
                  <div class="alert-header">
                    <span class="text-white d-flex align-items-center gap-2">
                      <span class="severity-indicator" [class.critical]="g.severity === 'CRITICAL'" [class.high]="g.severity === 'HIGH'">{{ g.severity }}</span>
                      <strong>{{ g.measureCode }}</strong>
                    </span>
                    <span class="text-secondary small font-monospace">Due: {{ g.dueDate }}</span>
                  </div>
                  <div class="alert-body my-2">
                    <h6 class="text-white mb-1">{{ g.gapName }}</h6>
                    <p class="mb-1 text-secondary small">Member: <strong>{{ g.memberName }}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  metrics: any = null;
  highRiskMembers: Member[] = [];
  urgentGaps: CareGap[] = [];

  constructor(
    private memberService: MemberService,
    private gapService: CareGapService
  ) {}

  ngOnInit() {
    this.memberService.getHealthcareMetrics().subscribe(m => this.metrics = m);
    
    this.memberService.getMembers().subscribe(m => {
      // Sort members by risk score to extract highest risks
      this.highRiskMembers = m.sort((a, b) => b.riskScore - a.riskScore).slice(0, 3);
    });

    this.gapService.getCareGaps({ status: 'OPEN' }).subscribe(g => {
      this.urgentGaps = g.slice(0, 2);
    });
  }
}
