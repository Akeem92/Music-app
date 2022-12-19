const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const runDB = require("./config/database");

const createServer = () => {
    runDB();

    const app = express();

    const store = new MongoDBStore({
        uri: "mongodb://localhost:27017/Music",
        collection: "sessions",
    });

    // Middelware configuration
    app.use(
        bodyParser.json({
            limit: "50mb",
        })
    );

    app.use(
        bodyParser.urlencoded({
            limit: "50mb",
            extended: true,
            parameterLimit: 500000,
        })
    );

    // Configuration de la session
    app.use(
        session({
            secret: "jsdfjlskfd__sdfsdfkbure_zejk",
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
            resave: false,
            saveUninitialized: false,
            store: store,
        })
    );

    // View set configuration
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "src", "views"));

    // App configuration
    app.use("/static", express.static(path.join(__dirname, "src", "public")));

    app.use(expressLayouts);

    // Flash middlewares messages
    app.use((req, res, next) => {
        res.locals.message = req.session.message;
        delete req.session.message;
        next();
    });

    return app;
};

module.exports = { createServer };
