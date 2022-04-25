const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    // console.log('Uncaught Exception: :( Shutting down....');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({
    path: './config.env',
});

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;

mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connection successful'));
// .catch((err) => {
//     console.log(`Error ${err.message}`);
// });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`Welcome from Server Lisening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    // console.log('Unhandled Rejection: :( Shutting down....');
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});
