import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, takeUntil, tap } from 'rxjs/operators';
import { MemberService } from '../../core/services/member.service';
import { Member, Observation } from '../../models/healthcare.models';

@Component({
  selector: 'app-members-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page-container p-0">
      <div class="page-header">
        <div class="breadcrumbs">CLINICAL REGISTRIES / PATIENT DIRECTORY</div>
        <div class="title-row">
          <div>
            <h1>Member Care Manager</h1>
            <p>Verify monitored clinical cohorts registry records. Integrates RxJS debounced search and active patient observations.</p>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- Search List Left -->
        <div class="col-lg-5">
          <div class="card bg-dark text-light border-secondary">
            <div class="card-header border-secondary bg-secondary bg-opacity-25">
              <h6 class="mb-0 text-white"><i class="fa-solid fa-users me-2 text-danger"></i>Member Cohorts List</h6>
            </div>
            <div class="card-body">
              <!-- Search bar form control -->
              <div class="search-input-wrapper mb-3 w-100" style="max-width: 100%;">
                <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                <input 
                  type="text" 
                  [formControl]="searchControl" 
                  class="form-control" 
                  placeholder="Debounced search by patient name, MRN..."
                >
              </div>

              <!-- Loading spinner -->
              <div class="text-center py-3" *ngIf="searching">
                <i class="fa-solid fa-spinner fa-spin text-danger me-2"></i>
                <span class="text-secondary small">Debouncing search registers...</span>
              </div>

              <!-- Member listing -->
              <div class="list-group" *ngIf="!searching">
                <button 
                  *ngFor="let m of members" 
                  (click)="selectMember(m)"
                  [class.active]="selectedMember?.id === m.id"
                  class="list-group-item list-group-item-action bg-dark bg-opacity-25 border-secondary text-white py-3"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{{ m.lastName }}, {{ m.firstName }}</strong>
                      <div class="text-secondary small">MRN: {{ m.mrn }}</div>
                    </div>
                    <span class="severity-indicator" [class.critical]="m.riskScore >= 7" [class.high]="m.riskScore >= 4 && m.riskScore < 7" [class.medium]="m.riskScore < 4">
                      {{ m.riskScore }}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Detail telemetries view Right -->
        <div class="col-lg-7">
          <div class="card bg-dark text-light border-secondary h-100" *ngIf="selectedMember">
            <div class="card-header border-secondary bg-secondary bg-opacity-25 d-flex justify-content-between align-items-center">
              <h6 class="mb-0 text-white"><i class="fa-solid fa-circle-user me-2 text-danger"></i>Clinical Care Card</h6>
              <span class="badge bg-danger">{{ selectedMember.mrn }}</span>
            </div>
            <div class="card-body">
              <div class="mb-4">
                <h4 class="text-white mb-1">{{ selectedMember.lastName }}, {{ selectedMember.firstName }}</h4>
                <p class="text-secondary small mb-3">DOB: {{ selectedMember.dob }} ({{ selectedMember.gender }}) | Payer: {{ selectedMember.primaryPayer }}</p>
                <div class="p-3 bg-secondary bg-opacity-25 rounded border border-secondary border-opacity-50">
                  <div class="small text-secondary">CORPORATE MAILING ADDRESS</div>
                  <div class="text-white mt-1">{{ selectedMember.address }}</div>
                </div>
              </div>

              <!-- Clinical Observations telemetry -->
              <div>
                <h6 class="text-white border-bottom border-secondary pb-2 mb-3">Monitored Vital Observations</h6>
                <div class="text-center py-3" *ngIf="loadingObservations">
                  <i class="fa-solid fa-spinner fa-spin text-danger me-2"></i>
                  <span class="text-secondary small">Querying clinical records...</span>
                </div>

                <div class="row g-3" *ngIf="!loadingObservations">
                  <div class="col-sm-6" *ngFor="let obs of observations">
                    <div class="p-3 bg-secondary bg-opacity-25 rounded border-start border-4" [class.border-danger]="obs.status === 'CRITICAL'" [class.border-warning]="obs.status === 'ELEVATED'" [class.border-success]="obs.status === 'NORMAL'">
                      <div class="text-secondary small font-monospace">{{ obs.type.replace('_', ' ') }}</div>
                      <div class="d-flex justify-content-between align-items-baseline mt-1">
                        <h4 class="text-white mb-0">{{ obs.value }} <small class="text-secondary small font-normal" style="font-size: 0.8rem;">{{ obs.unit }}</small></h4>
                        <span class="status-badge" [class.danger]="obs.status === 'CRITICAL'" [class.warning]="obs.status === 'ELEVATED'" [class.success]="obs.status === 'NORMAL'">
                          {{ obs.status }}
                        </span>
                      </div>
                      <div class="text-tertiary small mt-1 font-monospace" style="font-size: 0.7rem;">Verified: {{ obs.timestamp | date:'short' }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card bg-dark text-light border-secondary border-dashed h-100 d-flex align-items-center justify-content-center py-5 text-center text-secondary" *ngIf="!selectedMember">
            <div>
              <i class="fa-solid fa-hospital-user fa-3x mb-3 text-secondary text-opacity-50"></i>
              <h5>Select a Monitored Patient</h5>
              <p class="small text-secondary px-4">Highlight a member from the left panel registry to view clinical details, medical record files, and vital signs indicators.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MembersComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  members: Member[] = [];
  selectedMember: Member | null = null;
  observations: Observation[] = [];
  searching = false;
  loadingObservations = false;

  private destroy$ = new Subject<void>();

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    // 1. Fetch initial monitored cohorts
    this.memberService.getMembers().subscribe(m => this.members = m);

    // 2. Setup standard debounced search pipeline using RxJS
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(query => 
        this.memberService.searchMembers(query || '').pipe(
          catchError(() => {
            this.searching = false;
            return of([]);
          })
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe(results => {
      this.members = results;
      this.searching = false;
    });
  }

  selectMember(m: Member) {
    this.selectedMember = m;
    this.loadingObservations = true;
    this.memberService.getObservations(m.id).subscribe(obs => {
      this.observations = obs;
      this.loadingObservations = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
