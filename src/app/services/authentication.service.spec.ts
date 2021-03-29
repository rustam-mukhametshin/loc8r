import { AuthenticationService } from './authentication.service';
import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { User } from '../models/User';
import { tokenNameFixture, tokenValueFixture, userFixture } from '../test/Fixture';

describe('AuthenticationService', () => {
  let authenticationService: jasmine.SpyObj<AuthenticationService>;

  // Custom
  let tokenName: string;
  let tokenValue: string;
  let user: User;

  beforeEach(() => {
    authenticationService = jasmine.createSpyObj('AuthenticationService', [
      'getToken',
      'saveToken',
      'login',
      'register',
      'logout',
      'isLoggedIn',
      'getCurrentUser',
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationService
        },
        StorageService,
      ]
    });

    localStorage.clear();
  });

  beforeEach(() => {

    tokenName = tokenNameFixture;
    tokenValue = tokenValueFixture;

    user = userFixture;

    authenticationService.getToken.and.callFake(() => localStorage.getItem(tokenName));
    authenticationService.saveToken.and.callFake((t) => localStorage.setItem(tokenName, t));
    authenticationService.login.and.callFake(() => {});
    authenticationService.register.and.callFake(() => {});
    authenticationService.logout.and.callFake(() => {});
    authenticationService.isLoggedIn.and.callFake(() => {});
    authenticationService.getCurrentUser.and.callFake(() => {});
  });

  it('should getToken', () => {
    // Same as save
    expect(authenticationService.getToken()).toBeNull('Error with null');
    authenticationService.saveToken(tokenValue);
    expect(authenticationService.getToken()).toEqual(tokenValue, 'Get token');
  });

  it('should saveToken', () => {
    expect(authenticationService.getToken()).toBeNull('Error with null');

    // Saving
    authenticationService.saveToken(tokenValue);
    expect(authenticationService.getToken()).toEqual(tokenValue, 'Get token');

  });
});
