import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-primary">
      <div class="card bg-dark text-light border-secondary p-4" style="max-width: 420px; width: 100%;">
        <div class="text-center mb-4">
          <span class="badge bg-danger mb-2">CLINICAL SUITE ACCESS</span>
          <h4 class="text-white">Healthcare Care Portal</h4>
          <p class="text-secondary small">Enter clinical credentials to manage member health registries.</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
          <div class="form-group">
            <label>CORPORATE USERNAME</label>
            <input 
              type="text" 
              formControlName="username" 
              class="form-control" 
              [class.is-invalid]="submitted && f['username'].errors"
              placeholder="e.g. clinical_lead"
            >
            <div class="invalid-feedback" *ngIf="submitted && f['username'].errors">
              Username is required (min 4 characters).
            </div>
          </div>

          <div class="form-group">
            <label>PASSWORD</label>
            <input 
              type="password" 
              formControlName="password" 
              class="form-control" 
              [class.is-invalid]="submitted && f['password'].errors"
              placeholder="••••••••"
            >
            <div class="invalid-feedback" *ngIf="submitted && f['password'].errors">
              Password is required (min 6 characters).
            </div>
          </div>

          <button type="submit" class="btn btn-danger w-100 clinical-btn mt-3">
            <i class="fa-solid fa-right-to-bracket me-1"></i> Sign In to Clinical Vault
          </button>
        </form>

        <div class="mt-4 p-2 bg-secondary bg-opacity-25 rounded text-center small text-secondary">
          <i class="fa-solid fa-circle-info text-info me-1"></i>
          Role: <code>CLINICAL_MANAGER</code>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifyService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['clinical_lead', [Validators.required, Validators.minLength(4)]],
      password: ['clinical123', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const { username } = this.loginForm.value;

    if (username === 'clinical_lead') {
      const mockSession = {
        username: 'clinical_lead',
        role: 'CLINICAL_MANAGER',
        name: 'Stephen Strange',
        token: 'mock-jwt-clinical-98765'
      };
      
      localStorage.setItem('user_session', JSON.stringify(mockSession));
      this.notifyService.show('Welcome to Clinical Registries', 'success');
      this.router.navigate(['/']);
    } else {
      this.notifyService.show('Unauthorized corporate role.', 'danger');
    }
  }
}
