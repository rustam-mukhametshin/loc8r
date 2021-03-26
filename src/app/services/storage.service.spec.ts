import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let serviceSpy: jasmine.SpyObj<StorageService>;

  // custom
  let key: string;
  let value: string;

  beforeEach(() => {
    serviceSpy = jasmine.createSpyObj('StorageService', [
      'getItem',
      'setItem',
      'removeItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: serviceSpy,
        }
      ]
    });

    // custom
    key = 'test-loc8r-token';
    value = 'test-loc8r-value';
  });

  beforeEach(() => {
    serviceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;

    serviceSpy.getItem.and.callFake((k) => {
      return localStorage.getItem(k);
    });
    serviceSpy.setItem.and.callFake((k, v) => {
      localStorage.setItem(k, v);
    });
    serviceSpy.removeItem.and.callFake((k) => {
      localStorage.removeItem(k);
    });

    localStorage.clear();
  });

  it('should be created', () => {
    expect(serviceSpy).toBeTruthy();
  });

  it('should getKey', () => {
    expect(serviceSpy.getItem(key)).toBeNull();

    serviceSpy.setItem(key, value);
    expect(serviceSpy.getItem(key)).toEqual(value);
  });

  it('should setItem', () => {
    expect(serviceSpy.getItem(key)).toBeNull();

    serviceSpy.setItem(key, value);
    expect(serviceSpy.getItem(key)).toEqual(value);
  });

  it('should removeItem', () => {
    serviceSpy.setItem(key, value);
    expect(serviceSpy.getItem(key)).toEqual(value);

    serviceSpy.removeItem(key);

    expect(serviceSpy.getItem(key)).toBeNull();
  });
});
