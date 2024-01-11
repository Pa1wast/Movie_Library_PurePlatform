import formatGetAll from "../helper/resultFormatter.js";
import { con } from "../model/connectDatabase.js";

function getMovieQuery() {
  return `
    select movies.id as id,actors.id as actorId ,directors.id as directorId,title,poster,description,
    releaseYear,genre,actors.name as actorName,
    age,country,directors.name as directorName
    from movies join movie_actors on movies.id=movie_actors.movie_id 
    join actors on actors.id=movie_actors.actor_id join movie_directors 
    on movies.id=movie_directors.movie_id join directors
    on directors.id= movie_directors.director_id 
    `;
}

export async function getAllMovies(req, res) {
  const sql = getMovieQuery();
  const [result] = await con.execute(sql);
  res.status(200).json(formatGetAll(result));
}

export async function getOneMovie(req, res) {
  let sql = getMovieQuery().concat(` where movies.id=${req.params.id} `);
  const [result] = await con.execute(sql);
  let formattedResult = formatGetAll(result);
  sql = `select count(*) as numberOfLikes from likes where movie_id=${req.params.id} `;
  const [[{ numberOfLikes }]] = await con.execute(sql);
  formattedResult.at(0).numberOfLikes = numberOfLikes;
  sql = `select text ,user as name,dateTime as timestamp from comments where movie_id=${req.params.id}`;
  const [comments] = await con.execute(sql);
  formattedResult.at(0).comments = comments;
  res.status(200).json(formattedResult);
}

export async function getMovieBySearch(req, res) {
  const sql = getMovieQuery().concat(
    `where movies.title='${req.query.movieName}'`
  );
  const [result] = await con.execute(sql);
  res.status(200).json(formatGetAll(result));
}
