const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const envMode = process.argv[2];
dotenv.config(path.resolve(process.cwd(), envMode));

const appRouter = require('./app.router');
const configureCors = require('../utils/configureCors');
const cronJobs = require('../cron');
const errHandler = require('../utils/errorHandler');
const { PORT, DB_PATH, REQ_PERIOD, REQ_INTERVAL } = require('../config');

const app = express();

app.use(cors({ origin: configureCors }));
app.use(rateLimit({
    windowMs: REQ_PERIOD,
    max: REQ_INTERVAL
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.ENV === 'prod') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

appRouter(app);

app.use(errHandler);

const startApp = async () => {
    try {
        await mongoose.connect(DB_PATH);
        cronJobs();
        app.listen(PORT, () => {
            console.log(`Server started on PORT: ${PORT}`);
        });

    } catch (e) {
        console.log(e);
    }
};

startApp();
