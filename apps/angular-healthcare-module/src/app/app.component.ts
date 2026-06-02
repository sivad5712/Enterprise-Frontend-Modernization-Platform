import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NotificationService, AlertNotification } from './core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-primary min-vh-100 flex-column d-flex text-light">
      <!-- MFE header sub-navigation -->
      <header class="bg-secondary bg-opacity-75 border-bottom border-secondary py-2 px-4 d-flex justify-content-between align-items-center" *ngIf="isLoggedIn()">
        <span class="d-flex align-items-center gap-2">
          <i class="fa-solid fa-square-heart text-danger"></i>
          <strong class="text-white small font-monospace">MFE: Healthcare Portal (Angular 17)</strong>
        </span>
        <nav class="d-flex gap-2">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="angular-nav-link small"><i class="fa-solid fa-gauge me-1"></i> Dashboard</a>
          <a routerLink="/members" routerLinkActive="active" class="angular-nav-link small"><i class="fa-solid fa-users me-1"></i> Patient Directory</a>
          <button (click)="logout()" class="btn btn-sm btn-outline-secondary py-1 text-white border-secondary small ms-3"><i class="fa-solid fa-power-off me-1"></i> Log Out</button>
        </nav>
      </header>

      <main class="flex-grow-1 p-3">
        <router-outlet></router-outlet>
      </main>

      <!-- Dynamic alerts wrapper -->
      <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1200">
        <div 
          *ngFor="let alert of alerts$ | async" 
          [class]="'alert bg-dark text-light border border-secondary mb-2 alert-dismissible fade show'"
          style="min-width: 280px;"
          role="alert"
        >
          <div class="d-flex align-items-center gap-2">
            <span class="badge" [class.bg-success]="alert.type === 'success'" [class.bg-danger]="alert.type === 'danger'" [class.bg-warning]="alert.type === 'warning'">
              {{ alert.type }}
            </span>
            <span class="small">{{ alert.message }}</span>
          </div>
          <button type="button" class="btn-close btn-close-white" (click)="dismissAlert(alert.id)" aria-label="Close"></button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .angular-nav-link {
      color: #9ca3af;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
    .angular-nav-link:hover {
      color: #f3f4f6;
      background: rgba(255, 255, 255, 0.03);
    }
    .angular-nav-link.active {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }
  `]
})
export class AppComponent implements OnInit {
  alerts$: Observable<AlertNotification[]>;

  constructor(
    private notifyService: NotificationService,
    private router: Router
  ) {
    this.alerts$ = this.notifyService.alerts$;
  }

  ngOnInit() {}

  isLoggedIn(): boolean {
    return localStorage.getItem('user_session') !== null;
  }

  dismissAlert(id: string) {
    this.notifyService.dismiss(id);
  }

  logout() {
    localStorage.removeItem('user_session');
    this.router.navigate(['/login']);
  }
}
