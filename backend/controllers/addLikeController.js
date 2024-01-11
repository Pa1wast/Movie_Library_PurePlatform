import { con } from "../model/connectDatabase.js";

export async function addLike(req, res) {
  const sql = `insert into likes (movie_id) values('${req.params.id}')`;
  await con.execute(sql);
  res.status(200).end();
}
