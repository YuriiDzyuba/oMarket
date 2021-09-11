const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const envMode = process.argv[2];
dotenv.config(path.resolve(process.cwd(), envMode));

const errHandler = require('../utils/errorHandler');
const appRouter = require('./app.router');

const { PORT, DB_PATH } = require('../config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

appRouter(app);

app.use(errHandler);

const startApp = async () => {
    try {
        await mongoose.connect(DB_PATH);
        app.listen(PORT, () => {
            console.log(`Server started on PORT: ${PORT}`);
        });

    } catch (e) {
        console.log(e);
    }
};

startApp();
