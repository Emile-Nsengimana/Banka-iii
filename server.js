import express from 'express';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port);

// eslint-disable-next-line no-console
console.log(`Running on port ${port}`);
export default app;
