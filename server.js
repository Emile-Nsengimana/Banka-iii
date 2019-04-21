import express from 'express';
import routes from './src/router/router';

const app = express();
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 4000;
app.listen(port);

// eslint-disable-next-line no-console
console.log(`Running on port ${port}`);
export default app;
