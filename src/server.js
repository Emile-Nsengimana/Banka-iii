import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './router/router';

const app = express();
app
  .use(cors())
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use(routes);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running on port ${port} ...`);
});
export default app;
