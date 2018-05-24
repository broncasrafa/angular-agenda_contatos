/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContatosService } from './contatos.service';

describe('ContatosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContatosService]
    });
  });

  it('should ...', inject([ContatosService], (service: ContatosService) => {
    expect(service).toBeTruthy();
  }));
});
