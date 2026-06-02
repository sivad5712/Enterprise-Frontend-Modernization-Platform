import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Member, Observation } from '../../models/healthcare.models';
import { healthcareApi } from '../../../../../../shared/mock-api/healthcareApi';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor() {}

  getMembers(): Observable<Member[]> {
    return from(healthcareApi.getMembers() as Promise<Member[]>);
  }

  searchMembers(query: string): Observable<Member[]> {
    return from(healthcareApi.searchMembers(query) as Promise<Member[]>);
  }

  getObservations(memberId: string): Observable<Observation[]> {
    return from(healthcareApi.getObservations(memberId) as Promise<Observation[]>);
  }

  getHealthcareMetrics(): Observable<any> {
    return from(healthcareApi.getHealthcareMetrics());
  }
}
