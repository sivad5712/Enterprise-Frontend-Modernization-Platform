import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Claim } from '../../models/healthcare.models';
import { healthcareApi } from '../../../../../../shared/mock-api/healthcareApi';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  constructor() {}

  getClaims(filters?: { status?: string; memberId?: string }): Observable<Claim[]> {
    return from(healthcareApi.getClaims(filters) as Promise<Claim[]>);
  }
}
