import express from 'express';
import swaggerUI from 'swagger-ui-express';
import routes from './router/router';
import swaggerDoc from './swagger.json';

const app = express();
app.use(express.json());
app.use(routes);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
const port = process.env.PORT || 4000;
app.listen(port);

// eslint-disable-next-line no-console
console.log(`Running on port ${port}`);
export default app;
