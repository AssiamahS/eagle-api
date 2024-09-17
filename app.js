"use strict";

import express from 'express';
import fs from 'fs';
import swaggerTools from 'swagger-tools';
import YAML from 'yamljs';
import mongoose from 'mongoose';
import passport from 'passport';
import winston from 'winston';
import bodyParser from 'body-parser';
import auth from './api/helpers/auth';
import models from './api/helpers/models';

const app = express();
const uploadDir = process.env.UPLOAD_DIRECTORY || "./uploads/";
const hostname = process.env.API_HOSTNAME || "localhost:3000";
const swaggerConfig = YAML.load("./api/swagger/swagger.yaml");

const dbConnection = `mongodb://${process.env.MONGODB_SERVICE_HOST || process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost'}/${process.env.MONGODB_DATABASE || 'epic'}`;
const db_username = process.env.MONGODB_USERNAME || '';
const db_password = process.env.MONGODB_PASSWORD || '';

// Logging middleware
const defaultLog = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.label({ label: 'default' }),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console({
            handleExceptions: true
        })
    ]
});

// Increase post body sizing
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Enable CORS
app.use((req, res, next) => {
    defaultLog.info(`${req.method} ${req.url}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,responseType');
    res.setHeader('Access-Control-Expose-Headers', 'x-total-count,x-pending-comment-count,x-next-comment-id');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Cache-Control', 'max-age=4');
    next();
});

export default app;
