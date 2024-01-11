import { con } from "../model/connectDatabase.js";
import { format } from "date-fns";

export async function addComment(req, res) {
  const formattedDateTime = format(
    new Date(req.body.timestamp),
    "yyyy-MM-dd HH:mm:ss"
  );
  const sql = `insert into comments
   (user,dateTime,movie_id,text) values
    ('${req.body.name}','${formattedDateTime}','${req.params.id}','${req.body.text}')`;
  await con.execute(sql);
  res.status(200).end();
}
