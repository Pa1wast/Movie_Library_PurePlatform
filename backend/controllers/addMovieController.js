import { con } from "../model/connectDatabase.js";
export async function addNewMovie(req, res) {
  let sql = `
     insert into movies (title,description,releaseYear,genre,poster)
     values (
        '${req.body.title}',
        '${req.body.description}',
        '${req.body.releaseYear}',
        '${req.body.genre}',
        '${req.body.poster}'
     )
    `;

  const [{ insertId: movieId }] = await con.execute(sql);

  const insertDirectors = req.body.directors.map(async (director) => {
    sql = `
     insert into directors (name) values('${director}') 
     `;

    const result = await con.execute(sql);
    return result;
  });
  const insertDirectorsResult = await Promise.all(insertDirectors);

  const insertedDirectorsId = insertDirectorsResult.map((insertDirector) => {
    return insertDirector.at(0).insertId;
  });

  const moviesDirectorRelation = insertedDirectorsId.map(async (directorId) => {
    sql = `
  insert into movie_directors (movie_id,director_id) values (
    '${movieId}',
    '${directorId}'
  )
  `;
    const result = await con.execute(sql);
    return result;
  });

  await Promise.all(moviesDirectorRelation);
  const insertCast = req.body.castMembers.map(async (member) => {
    sql = `
     insert into actors (name,age,country) values('${member.name}','${member.age}','${member.country}') 
     `;

    const result = await con.execute(sql);
    return result;
  });
  const insertCastResult = await Promise.all(insertCast);

  const insertedCastId = insertCastResult.map((insertedCast) => {
    return insertedCast.at(0).insertId;
  });

  const moviesCastRelation = insertedCastId.map(async (castMemberId) => {
    sql = `
  insert into movie_actors (movie_id,actor_id) values (
    '${movieId}',
    '${castMemberId}'
  )
  `;
    const result = con.execute(sql);
    return result;
  });

  await Promise.all(moviesCastRelation);

  res.status(200).end();
}
