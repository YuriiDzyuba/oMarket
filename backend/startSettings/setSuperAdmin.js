const express = require('express');
const mongoose = require('mongoose');

const authService = require('../src/auth/auth.service');
const { EMAIL, PASSWORD, NAME, BORN_YEAR, IS_ACTIVATED, IS_BANNED, ROLE } = require('../consts/dbEnum');

const { DB_PATH } = require('../config');

const app = express();
app.use(express.json());

const superAdmin = {
    [EMAIL]: 'admin@uu.net',
    [PASSWORD]: 'dfsdf5yyyg',
    [NAME]: 'Admin',
    [BORN_YEAR]: 1999,
    [IS_ACTIVATED]: true,
    [IS_BANNED]: false,
    [ROLE]: 'superAdmin',
};

const setStartSettings = async () => {
    try {
        const db = await mongoose.connect(DB_PATH);

        const hashedPassword = await authService.hashPassword(superAdmin.password);

        const newUser = await authService.addNewUser({
            ...superAdmin,
            [PASSWORD]: hashedPassword
        });
        console.log(newUser, ' ------------ new super admin --------------');

        await db.disconnect();

    } catch (e) {
        console.log(e);
    }
};

setStartSettings();
