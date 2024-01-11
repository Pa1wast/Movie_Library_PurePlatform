import './model/connectDatabase.js';
import express from 'express';
import cors from 'cors';
import addMovieRouter from './Routes/addMovieRoute.js';
import getMoviesRouter from './Routes/getMoviesRoute.js';
import deleteMovieRouter from './Routes/deleteMovieRoute.js';
import addLikeRouter from './Routes/addLikesRoute.js';
import addCommentRouter from './Routes/addCommentRoute.js';
import updateMovieRouter from './Routes/updateMovieRoute.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/addmovie', addMovieRouter);
app.use('/getmovies', getMoviesRouter);
app.use('/deletemovie', deleteMovieRouter);
app.use('/addlike', addLikeRouter);
app.use('/addcomment', addCommentRouter);
app.use('/updatemovie', updateMovieRouter);
const port = process.env.port || 80;
app.listen(port, () => {
	console.log(`a server has started at port  ${80}`);
});
