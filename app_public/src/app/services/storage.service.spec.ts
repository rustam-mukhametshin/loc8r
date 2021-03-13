import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let serviceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StorageService', [
      'getItem',
    ]);


    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: spy,
        }
      ]
    });

    serviceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;

    serviceSpy.getItem.and.returnValue('loc8r-value');

  });

  it('should be created', () => {
    expect(serviceSpy).toBeTruthy();
  });

  it('should getKey', () => {
    const key = 'loc8r-token';
    const value = 'loc8r-value';
    expect(serviceSpy.getItem(key)).toBe(value);
  });
});
