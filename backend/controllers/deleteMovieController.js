import { con } from "../model/connectDatabase.js";
export async function deleteMovie(req, res) {
  const sql = `
    delete from movies where id=${req.body.id}
    `;

  await con.execute(sql);
}
