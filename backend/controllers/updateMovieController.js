import { con } from "../model/connectDatabase.js";
export async function updateMovie(req, res) {
  let sql = `
    update movies 
    set title='${req.body.title}',genre='${req.body.genre}',
    description='${req.body.description}',
    releaseYear='${req.body.releaseYear}',
    poster='${req.body.poster}' where id='${req.query.movieId}'
    `;

  await con.execute(sql);

  let foundedDirectors = await Promise.all(
    req.body.directors.map(async (director) => {
      sql = `select name from directors where name="${director}"`;
      const [result] = await con.execute(sql);
      return result;
    })
  );
  foundedDirectors = foundedDirectors.filter(
    (director) => director.length !== 0
  );
  const newDirectors = req.body.directors.filter((director) => {
    const isItOld = foundedDirectors.find(([{ name }]) => {
      return name === director;
    });
    if (!isItOld) return true;
  });

  const [insertedIds] = await Promise.all(
    newDirectors.map(async (newDirector) => {
      sql = `insert into directors (name) values('${newDirector}')`;
      const [result] = await con.execute(sql);
      return result;
    })
  );
  res.end();
}
