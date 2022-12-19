require("dotenv").config();

const mongoose = require("mongoose");

require("colors");

const dbUrl = "mongodb://localhost:27017/Music";

function runDB() {
    mongoose.set('strictQuery', true);

    mongoose.connect(`${dbUrl}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    });

    mongoose.connection.on("connected", () => {
        console.log(`Mongoose default connection is open to ${dbUrl}`.green);
    });

    mongoose.connection.on("error", (err) => {
        console.log(`Mongoose default connection has occured: ${err} error`.red);
    });

    mongoose.connection.on("disconnected", () => {
        console.log(`Mongoose default connection is disconnected`.yellow);
    });

    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.log(`Mongoose default connection is disconnected due to application termination`.magenta);
            process.exit(0);
        });
    });
}

module.exports = runDB;
