import * as fromGenre from './genre.actions';

describe('genreGenres', () => {
  it('should return an action', () => {
    expect(fromGenre.genreGenres().type).toBe('[Genre] Genre Genres');
  });
});
