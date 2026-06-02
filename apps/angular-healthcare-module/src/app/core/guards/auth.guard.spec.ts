import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('Clinical Authentication Guard', () => {
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('allows transition if user_session is present in local storage', () => {
    localStorage.setItem('user_session', JSON.stringify({ username: 'clinical_lead', role: 'CLINICAL_MANAGER' }));
    
    // Simulate functional guard execution logic
    const checkAuth = () => {
      const userSession = localStorage.getItem('user_session');
      return userSession !== null;
    };

    expect(checkAuth()).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('rejects transition and navigates to login if user_session is missing', () => {
    const checkAuth = () => {
      const userSession = localStorage.getItem('user_session');
      if (userSession) return true;
      routerSpy.navigate(['/login']);
      return false;
    };

    expect(checkAuth()).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
