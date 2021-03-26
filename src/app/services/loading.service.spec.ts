import { LoadingService } from './loading.service';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

describe('LoadingService', () => {
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoadingService', [
      'loadingOn',
      'loadingOff',
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoadingService,
          useValue: spy
        }
      ]
    });

    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;

    // Init
    const subject = new BehaviorSubject(false);
    loadingServiceSpy.$loading = subject.asObservable();


    // Fill
    loadingServiceSpy.loadingOn.and.callFake(() => {
      subject.next(true);
    });
    loadingServiceSpy.loadingOff.and.callFake(() => {
      subject.next(false);
    });


  });

  it('should check default loading', done => {
    loadingServiceSpy.$loading.subscribe(v => {
      expect(v).toBeFalse();
      done();
    });
  });

  it('should test loadingOn', done => {
    loadingServiceSpy.loadingOn();

    loadingServiceSpy.$loading.subscribe(v => {
      expect(v).toBeTruthy();
      done();
    });
  });

  it('should test loadingOff', done => {
    loadingServiceSpy.loadingOff();

    loadingServiceSpy.$loading.subscribe(v => {
      expect(v).toBeFalsy();
      done();
    });
  });
});
