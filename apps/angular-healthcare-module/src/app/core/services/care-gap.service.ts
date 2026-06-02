import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { CareGap } from '../../models/healthcare.models';
import { healthcareApi } from '../../../../../../shared/mock-api/healthcareApi';

@Injectable({
  providedIn: 'root'
})
export class CareGapService {
  constructor() {}

  getCareGaps(filters?: { status?: string; severity?: string }): Observable<CareGap[]> {
    return from(healthcareApi.getCareGaps(filters) as Promise<CareGap[]>);
  }
}
