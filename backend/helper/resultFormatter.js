export default function formatGetAll(movies) {
  const uniqueMovies = movies.reduce((acc, movie) => {
    const existingMovie = acc.find((m) => m.id === movie.id);

    if (!existingMovie) {
      // Initialize actor and director arrays
      movie.actors = [
        {
          id: movie.actorId,
          name: movie.actorName,
          age: movie.age,
          country: movie.country,
        },
      ];
      movie.directors = [{ id: movie.directorId, name: movie.directorName }];
      delete movie.actorId;
      delete movie.actorName;
      delete movie.age;
      delete movie.country;
      delete movie.directorId;
      delete movie.directorName;

      acc.push(movie);
    } else {
      // Combine repeated attributes into arrays
      for (const key in movie) {
        if (Array.isArray(existingMovie[key])) {
          existingMovie[key].push(movie[key]);
        } else if (existingMovie[key] !== movie[key]) {
          existingMovie[key] = [existingMovie[key], movie[key]];
        }
      }

      // Add actor info to array if it doesn't exist
      const actorExists = existingMovie.actors.some(
        (a) => a.id === movie.actorId
      );
      if (!actorExists) {
        existingMovie.actors.push({
          id: movie.actorId,
          name: movie.actorName,
          age: movie.age,
          country: movie.country,
        });
      }

      // Add director info to array if it doesn't exist
      const directorExists = existingMovie.directors.some(
        (d) => d.id === movie.directorId
      );
      if (!directorExists) {
        existingMovie.directors.push({
          id: movie.directorId,
          name: movie.directorName,
        });
      }

      delete existingMovie.actorId;
      delete existingMovie.actorName;
      delete existingMovie.age;
      delete existingMovie.country;
      delete existingMovie.directorId;
      delete existingMovie.directorName;
    }

    return acc;
  }, []);

  return uniqueMovies;
}
