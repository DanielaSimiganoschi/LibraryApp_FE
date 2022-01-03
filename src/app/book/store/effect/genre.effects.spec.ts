import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GenreEffects } from './genre.effects';

describe('GenreEffects', () => {
  let actions$: Observable<any>;
  let effects: GenreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GenreEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GenreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
