import express from 'express';
import routes from './router/router';

const app = express();
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Running on port ${port}`));
