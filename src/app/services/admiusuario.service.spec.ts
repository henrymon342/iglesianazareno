import { TestBed } from '@angular/core/testing';

import { AdmiusuarioService } from './admiusuario.service';

describe('AdmiusuarioService', () => {
  let service: AdmiusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmiusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
