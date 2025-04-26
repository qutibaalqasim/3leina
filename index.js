import express from 'express';
import 'dotenv/config'
import initApp from './src/index.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

initApp(app , express);



app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}...`);
});